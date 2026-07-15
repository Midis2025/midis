"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// dynamically build a list of projects based on the images stored in public
// folder "New folder (8)". We encode the folder name to handle spaces and
// parentheses; the files are numbered sequentially starting at 1. Adjust
// IMAGE_COUNT if more images are added later.
const FOLDER_NAME = "New folder (8)";
const IMAGE_COUNT = 52; // update if images are added/removed
const encodedFolder = encodeURI(FOLDER_NAME);
const projects = Array.from({ length: IMAGE_COUNT }, (_, idx) => ({
    title: `Project ${idx + 1}`,
    image: `/${encodedFolder}/${idx + 1}.webp`,
}));

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    return (
        <div className="w-full max-w-[1400px] mx-auto mb-8 sm:mb-12 md:mb-20 px-4 sm:px-0 group">
            <div className="relative overflow-hidden cursor-pointer bg-[#0A0A0A]">
                {/* Natural image sizing so absolutely nothing is ever cut off */}
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto transform transition-transform duration-1000 ease-out group-hover:scale-105"
                />



                {/* Elegant bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white transform origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" />
            </div>
        </div>
    );
};

const WorkPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-orange-600 selection:text-white">
            <Navigation />

            {/* NEW PREMIUM HERO SECTION */}
            <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-black text-white">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop"
                        alt="Work Background"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10 w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[clamp(2.5rem,8vw,10rem)] leading-[1.1] md:leading-[0.9] font-normal uppercase tracking-tight"
                            style={{ fontFamily: 'Anton, sans-serif' }}
                        >
                            SHOWCASING OUR BEST
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[clamp(2.5rem,8vw,10rem)] leading-[1.1] md:leading-[0.9] font-normal uppercase tracking-tight mt-2"
                            style={{ fontFamily: 'Anton, sans-serif' }}
                        >
                            <span>WORKS</span>

                            <span>& IMPACT</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed font-medium mt-12 mb-8 px-4"
                        >
                            A curated selection of our most impactful projects, where strategy meets creativity to drive measurable results.
                        </motion.p>
                    </motion.div>

                    {/* scroll hint */}

                </div>
            </section>

            {/* Projects */}
            <section className="px-0 sm:px-6 pb-20">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </section>







            <Footer />
        </main>
    );
};

export default WorkPage;
