import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Cpu, Globe, Rocket, Zap, ArrowRight } from "lucide-react";

interface ServicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    name: string;
    description: string;
    image: string;
    color: string;
  } | null;
}

export const ServicePopup = ({ isOpen, onClose, service }: ServicePopupProps) => {
  if (!service) return null;

  const features = [
    { icon: <Zap size={20} />, title: "Turbo Speed", desc: "Optimized for maximum performance and lightning-fast delivery." },
    { icon: <Cpu size={20} />, title: "Smart Integration", desc: "Seamlessly connects with your existing tech stack and workflows." },
    { icon: <Globe size={20} />, title: "Global Reach", desc: "Built with scalability in mind to support your growth worldwide." },
    { icon: <Rocket size={20} />, title: "Future Ready", desc: "Uses cutting-edge technologies to stay ahead of the curve." },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop with High Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xl cursor-pointer"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[92vh] sm:h-auto max-h-[92vh] sm:max-h-[85vh] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] bg-[#0C1015] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 z-50 bg-black/40 backdrop-blur-md"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Left Side: Visual/Cover */}
            <div className="relative w-full lg:w-[38%] h-36 sm:h-48 lg:h-auto overflow-hidden group shrink-0">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-out"
              />
              <div 
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{ backgroundColor: service.color }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1015] via-transparent to-transparent lg:bg-gradient-to-r" />
              
              {/* Service Label */}
              <div className="absolute top-10 left-10 hidden sm:block">
                <div 
                  className="px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-2xl"
                  style={{ backgroundColor: service.color }}
                >
                  PREMIUM EXPERIENCE
                </div>
              </div>

              {/* Title on image for mobile */}
              <div className="absolute bottom-6 left-6 lg:hidden">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
                  {service.name}
                </h2>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 md:p-10 lg:p-14 relative">
              <div className="max-w-3xl">
                {/* Header for Desktop */}
                <div className="hidden lg:block mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-4xl xl:text-6xl font-black uppercase tracking-tighter text-white leading-[0.85] mb-6">
                      {service.name}
                    </h2>
                    <div 
                      className="w-32 h-2.5 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg md:text-xl text-white/70 font-medium leading-relaxed mb-10"
                >
                  {service.description}. We provide high-end solutions designed to elevate your brand presence and drive results through innovation.
                </motion.p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10">
                  {features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        style={{ backgroundColor: `${service.color}15`, color: service.color, border: `1px solid ${service.color}30` }}
                      >
                        {feature.icon}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1.5">{feature.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Benefits List */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/[0.03] rounded-[1.5rem] p-5 sm:p-8 md:p-10 border border-white/5 mb-10"
                >
                  <h4 className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px] mb-8">THE DELIVERABLES</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                      "Strategic Brand Analysis",
                      "Priority Support Access",
                      "Weekly Performance Sync",
                      "Custom Workflow Design",
                      "Full Creative Ownership",
                      "Ongoing Optimization"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-white/90 group/item">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-orange-500 transition-colors duration-300">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <span className="text-sm sm:text-base font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Group */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                >
                  <button className="flex-1 px-8 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group">
                    Start Project <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="px-8 py-5 border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all duration-300">
                    Get Pricing
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
