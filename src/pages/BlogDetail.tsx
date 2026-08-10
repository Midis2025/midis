"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from '@phosphor-icons/react';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try fetching by numeric ID directly
        const res = await fetch(
          `https://jubilant-sparkle-2f7bfe100e.strapiapp.com/api/blogs/${id}?populate=*`
        );

        let b: any = null;

        if (res.ok) {
          const json = await res.json();
          // Strapi v5: data is flat (no .attributes wrapper)
          b = json?.data;
        } else {
          // Fallback: fetch the full list and match by id, documentId, or slug
          const listRes = await fetch(
            'https://jubilant-sparkle-2f7bfe100e.strapiapp.com/api/blogs?populate=*'
          );
          if (!listRes.ok) throw new Error(`HTTP ${listRes.status}`);
          const listJson = await listRes.json();
          const candidates: any[] = Array.isArray(listJson?.data) ? listJson.data : [];

          b = candidates.find((item: any) => {
            if (!item) return false;
            if (String(item.id) === String(id)) return true;
            if (item.documentId && String(item.documentId) === String(id)) return true;
            if (item.Slug && String(item.Slug) === String(id)) return true;
            if (item.slug && String(item.slug) === String(id)) return true;
            return false;
          });
        }

        if (!b) throw new Error('Post not found');

        // ── Strapi v5: all fields are directly on `b` (no b.attributes) ──
        const extractImage = (imgObj: any): string => {
          if (!imgObj) return '';

          // Flat Strapi v5 format: { formats: {...}, url: "..." }
          if (imgObj.formats) {
            return (
              imgObj.formats?.large?.url ||
              imgObj.formats?.medium?.url ||
              imgObj.formats?.small?.url ||
              imgObj.formats?.thumbnail?.url ||
              imgObj.url ||
              ''
            );
          }

          // Legacy Strapi v4 format: { data: { attributes: { formats, url } } }
          if (imgObj?.data?.attributes?.formats) {
            const f = imgObj.data.attributes.formats;
            return (
              f.large?.url ||
              f.medium?.url ||
              f.thumbnail?.url ||
              imgObj.data.attributes.url ||
              ''
            );
          }
          if (imgObj?.data?.attributes?.url) return imgObj.data.attributes.url;

          // Plain string
          if (typeof imgObj === 'string') return imgObj;

          return '';
        };

        let image = extractImage(b.image);
        // Prefix relative URLs with the Strapi base URL
        if (image && image.startsWith('/')) {
          image = 'https://jubilant-sparkle-2f7bfe100e.strapiapp.com' + image;
        }

        setPost({
          id: b.id,
          title: b.title ?? '',
          shortDescription: b.shortDescription ?? '',
          longDescription: b.longDescription ?? '',
          image,
          createdAt: b.createdAt ?? b.publishedAt ?? '',
        });
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-orange-600 selection:text-white pb-20">
      <Navigation />

      <div className="max-w-[1100px] mx-auto px-6 lg:px-24 py-24">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} /> Back to blogs
        </Link>

        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-400">Error: {error}</div>
        ) : post ? (
          <article>
            {post.image ? (
              <div className="mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ) : null}

            <h1 className="text-4xl font-black mb-4">{post.title}</h1>

            {post.createdAt && (
              <p className="text-gray-400 mb-4">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            )}

            {/* Short description shown as a lead paragraph */}
            {post.shortDescription && (
              <p className="text-lg text-gray-300 mb-8 leading-relaxed border-l-4 border-orange-600 pl-4">
                {post.shortDescription}
              </p>
            )}

            {/* Long description rendered as HTML */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: post.longDescription || post.shortDescription || '',
              }}
            />
          </article>
        ) : (
          <div className="text-gray-400">No post to show.</div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default BlogDetail;