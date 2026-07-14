import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden selection:bg-orange-600 selection:text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
          alt="404 Background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Main 404 Heading */}
          <div className="text-center relative">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[clamp(6rem,20vw,20rem)] leading-[0.8] font-normal uppercase tracking-tighter" 
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              404
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[clamp(1.5rem,5vw,4rem)] leading-[1] font-normal uppercase tracking-tight mt-4" 
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              <span>PAGE</span>
              {/* Removed Decorative Image */}

              <span>NOT FOUND</span>
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl mx-auto text-lg text-white/50 leading-relaxed font-medium mt-12 mb-12"
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-xs tracking-widest uppercase hover:bg-orange-600 hover:text-white transition-all shadow-2xl"
            >
              <ArrowLeft size={16} strokeWidth={3} /> Return to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-500/10 blur-[150px] -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 blur-[150px] -z-0 pointer-events-none" />
    </main>
  );
};

export default NotFound;
