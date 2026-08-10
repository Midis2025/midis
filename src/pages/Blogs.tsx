"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { ArrowUpRight } from "@phosphor-icons/react";

/* ───────────────────────── MOCK DATA ───────────────────────── */

const BLOG_POSTS = [
  {
    id: 1,
    title: "AI-GENERATED ART IS MORE THAN JUST A TREND",
    excerpt: "AI art is often dismissed as \"soulless\" or \"effortless,\" but is that really true?",
    category: "AI & TECH",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "HOW TO PREPARE AI ART FOR PRINTING",
    excerpt: "Essential steps covering resolution, upscaling techniques, color correction, and the best file formats.",
    category: "DESIGN",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "HOW AI AND HUMANS WORK TOGETHER",
    excerpt: "How artists guide AI tools to bring unique visions to life, refine outputs, and add the final human touch.",
    category: "AI & TECH",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252728f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "THE FUTURE OF CREATIVE AUTOMATION",
    excerpt: "Exploring how automation is changing the workflow of modern creative agencies.",
    category: "STRATEGY",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "BEYOND THE PIXEL: THE NEW DESIGN FRONTIER",
    excerpt: "Moving past traditional UI limits into immersive, spatial computing experiences.",
    category: "DESIGN",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "SCALING STARTUPS WITH AI SYSTEMS",
    excerpt: "How lean teams are using AI to compete with industry giants and win.",
    category: "BRANDING",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
  }
];

const CATEGORIES = ["ALL", "AI & TECH", "DESIGN", "STRATEGY", "BRANDING"];

/* ───────────────────────── COMPONENTS ───────────────────────── */

const BlogCard = ({ post, isFeatured = false }: { post: any; isFeatured?: boolean }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col group cursor-pointer ${isFeatured ? 'lg:col-span-3 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center bg-white/[0.02] p-4 sm:p-6 rounded-2xl border border-white/5 mb-4' : ''}`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden rounded-xl mb-4 sm:mb-6 ${isFeatured ? 'aspect-[16/9] lg:col-span-7 lg:mb-0' : 'aspect-[1.4/1]'}`}>
        <img 
          src={post.image} 
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          alt={post.title}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100">
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase">READ THIS POST</span>
          <div className="self-end">
            <ArrowUpRight className="text-white" size={24} />
          </div>
        </div>

        {isFeatured && (
          <div className="absolute top-4 left-4 bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">
            Featured Article
          </div>
        )}
      </div>

      {/* Content */}
      <div className={isFeatured ? 'lg:col-span-5 flex flex-col justify-center' : ''}>
        <h3 className={`font-bold leading-[1.1] text-white uppercase mb-3 tracking-tight group-hover:text-orange-500 transition-colors ${isFeatured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'}`} style={{ fontFamily: 'Anton, sans-serif' }}>
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50 font-medium line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
};

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [blogs, setBlogs] = useState<any[]>([]);
    const [blogsLoading, setBlogsLoading] = useState(false);
    const [blogsError, setBlogsError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("ALL");

    useEffect(() => {
      const fetchBlogs = async () => {
        setBlogsLoading(true);
        setBlogsError(null);
        try {
          const res = await fetch('https://jubilant-sparkle-2f7bfe100e.strapiapp.com/api/blogs?populate=*');
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();

          const items = Array.isArray(json?.data) ? json.data.map((b: any) => {
            const attrs = b.attributes ?? {};
            let image = '';
            const i1 = attrs?.image;
            const i2 = (b as any)?.image;

            const pickUrlFromImageObj = (imgObj: any) => {
              if (!imgObj) return null;
              if (imgObj?.formats?.large?.url) return imgObj.formats.large.url;
              if (imgObj?.formats?.medium?.url) return imgObj.formats.medium.url;
              if (imgObj?.formats?.thumbnail?.url) return imgObj.formats.thumbnail.url;
              if (imgObj?.url) return imgObj.url;
              if (imgObj?.data?.attributes?.url) return imgObj.data.attributes.url;
              if (imgObj?.data?.attributes?.formats) {
                const f = imgObj.data.attributes.formats;
                return f.large?.url || f.medium?.url || f.thumbnail?.url || imgObj.data.attributes.url;
              }
              return null;
            };

            image = pickUrlFromImageObj(i1) || pickUrlFromImageObj(i2) || '';
            if (!image && typeof attrs?.image === 'string') image = attrs.image;
            if (!image && typeof (b as any)?.image === 'string') image = (b as any).image;
            if (image && image.startsWith('/')) image = 'https://jubilant-sparkle-2f7bfe100e.strapiapp.com' + image;

            return {
              id: b.id,
              title: attrs.title ?? attrs?.Title ?? b.title,
              excerpt: attrs.shortDescription ?? attrs?.shortDescription ?? '',
              image,
              createdAt: attrs.createdAt ?? b.createdAt,
              longDescription: attrs.longDescription ?? attrs?.longDescription ?? null,
              slug: attrs.Slug ?? attrs?.Slug ?? attrs.slug ?? null,
            };
          }) : [];

          setBlogs(items);
        } catch (err: any) {
          setBlogsError(err?.message ?? 'Failed to load blogs');
        } finally {
          setBlogsLoading(false);
        }
      };

      fetchBlogs();
    }, []);

    const allPosts = blogs.length ? blogs : BLOG_POSTS;
    const filteredPosts = activeCategory === "ALL" 
      ? allPosts 
      : allPosts.filter((post: any) => post.category === activeCategory || post.title.toUpperCase().includes(activeCategory));

    return (
        <main className="bg-black min-h-screen text-white selection:bg-orange-600 selection:text-white pb-12 sm:pb-20">
            <Navigation />

            {/* Optimized Header Section */}
            <header className="relative min-h-[45vh] sm:min-h-[55vh] flex items-center pt-28 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 px-6 lg:px-24 overflow-hidden">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2000&auto=format&fit=crop" 
                        alt="Blog Hero" 
                        className="w-full h-full object-cover grayscale opacity-35 animate-pulse-slow scale-105"
                    />
                    {/* Gradient Overlays for smooth transition */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10 w-full">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl min-[360px]:text-5xl min-[390px]:text-6xl min-[430px]:text-7xl sm:text-8xl md:text-[10vw] lg:text-[11rem] font-black leading-none tracking-normal uppercase mb-3 text-white select-none"
                        style={{ fontFamily: 'Anton, sans-serif' }}
                    >
                        BLOGS
                    </motion.h1>
                    <p className="text-[10px] sm:text-[12px] md:text-[14px] font-black tracking-[0.3em] sm:tracking-[0.6em] text-orange-500 uppercase">
                        INSIGHTS • STRATEGY • INNOVATION
                    </p>
                </div>
            </header>

            {/* Grid & Content Section with Balanced Spacing */}
            <section className="py-6 sm:py-10 lg:py-16 px-6 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                    
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-12 pb-4 border-b border-white/10">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all ${
                              activeCategory === cat 
                                ? 'bg-orange-600 text-white shadow-lg' 
                                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                      {blogsLoading ? (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-12">Loading blogs...</div>
                      ) : blogsError ? (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-red-500 py-12">Error: {blogsError}</div>
                      ) : filteredPosts.length === 0 ? (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-white/40 py-12 uppercase tracking-widest text-xs font-bold">No articles found in this category</div>
                      ) : (
                        filteredPosts.map((post, index) => (
                          <Link 
                            key={post.id} 
                            to={`/blogs/${post.id}`} 
                            className={`group ${index === 0 && activeCategory === "ALL" ? 'lg:col-span-3' : ''}`}
                          >
                            <BlogCard post={post} isFeatured={index === 0 && activeCategory === "ALL"} />
                          </Link>
                        ))
                      )}
                    </div>
                </div>
            </section>

            {/* Pagination / Load More Button */}
            <div className="flex justify-center mt-10 sm:mt-14 lg:mt-16 mb-12 sm:mb-16">
                <button className="px-10 py-3.5 sm:px-12 sm:py-4 border border-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-md">
                    Load More Entries
                </button>
            </div>

            <Footer />

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />
        </main>
    );
};

export default BlogPage;
