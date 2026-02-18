#!/usr/bin/env python3
import argparse
import os
import shutil
from PIL import Image


def human(n):
    for unit in ['B','KB','MB','GB']:
        if n < 1024.0:
            return f"{n:.1f}{unit}"
        n /= 1024.0
    return f"{n:.1f}TB"


def compress_image(path, quality=75, backup_dir=None):
    orig_size = os.path.getsize(path)
    try:
        img = Image.open(path)
    except Exception as e:
        print(f"SKIP {path}: cannot open ({e})")
        return 0

    fmt = img.format or os.path.splitext(path)[1].lstrip('.').upper()
    lower = fmt.lower()

    if backup_dir:
        os.makedirs(backup_dir, exist_ok=True)
        rel = os.path.relpath(path)
        dest = os.path.join(backup_dir, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if not os.path.exists(dest):
            shutil.copy2(path, dest)

    try:
        if lower in ('jpg','jpeg'):
            img = img.convert('RGB')
            img.save(path, 'JPEG', quality=quality, optimize=True, progressive=True)
        elif lower == 'png':
            # quantize to palette to reduce size while keeping transparency where possible
            if img.mode in ('RGBA','LA'):
                # keep alpha by splitting
                alpha = img.getchannel('A')
                rgb = img.convert('RGB').quantize(method=Image.MEDIANCUT)
                rgb = rgb.convert('RGBA')
                rgb.putalpha(alpha)
                rgb.save(path, 'PNG', optimize=True)
            else:
                img = img.convert('RGB').quantize(method=Image.MEDIANCUT)
                img.save(path, 'PNG', optimize=True)
        elif lower in ('webp',):
            img.save(path, 'WEBP', quality=quality, method=6)
        else:
            print(f"SKIP {path}: unsupported format '{fmt}'")
            return 0
    except Exception as e:
        print(f"ERROR saving {path}: {e}")
        return 0

    new_size = os.path.getsize(path)
    saved = orig_size - new_size
    print(f"OK   {path}: {human(orig_size)} -> {human(new_size)} (saved {human(saved)})")
    return saved


def walk_and_compress(root, exts, quality, backup, dry_run, limit):
    total_saved = 0
    processed = 0
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        for f in filenames:
            if os.path.splitext(f)[1].lower() in exts:
                files.append(os.path.join(dirpath, f))
    files.sort()

    backup_dir = None
    if backup and not dry_run:
        backup_dir = os.path.join(root, '..', '.image_backups')

    for p in files:
        if limit and processed >= limit:
            break
        if dry_run:
            print(f"DRY  {p}")
            processed += 1
            continue
        saved = compress_image(p, quality=quality, backup_dir=backup_dir)
        total_saved += saved
        processed += 1

    print(f"Processed {processed} files. Total saved: {human(total_saved)}")


def main():
    parser = argparse.ArgumentParser(description='Batch compress images in a folder')
    parser.add_argument('--path', default='.', help='Root folder to scan')
    parser.add_argument('--quality', type=int, default=75, help='JPEG/WEBP quality (1-95)')
    parser.add_argument('--backup', action='store_true', help='Backup originals to .image_backups')
    parser.add_argument('--dry-run', action='store_true', help='List files without modifying')
    parser.add_argument('--limit', type=int, default=0, help='Process only N files (0 = all)')
    args = parser.parse_args()

    exts = {'.jpg', '.jpeg', '.png', '.webp'}
    walk_and_compress(args.path, exts, args.quality, args.backup, args.dry_run, args.limit)


if __name__ == '__main__':
    main()
