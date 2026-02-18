# Image compression helper

This script compresses JPEG, PNG and WEBP images in a folder.

Usage (from project root):

```bash
python tools/compress_images.py --path new --quality 75 --backup
```

- `--dry-run` lists files without modifying.
- `--limit N` processes only N files (useful for testing).
- Originals are backed up to `.image_backups` next to the folder when `--backup` is used.
