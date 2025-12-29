'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
            {/* Parallax Background */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2500')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-neon-yellow font-inter tracking-[0.4em] text-xs md:text-sm uppercase mb-4"
                >
                    Limited Edition Prints
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="font-anton text-7xl md:text-9xl uppercase text-white leading-none tracking-tight mix-blend-overlay"
                >
                    Visual <br /> Chaos
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                >
                    <button className="px-8 py-4 border border-white/20 hover:border-neon-yellow hover:text-neon-yellow text-white uppercase tracking-widest text-sm transition-all duration-300">
                        Enter Gallery
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
