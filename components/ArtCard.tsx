'use client';
import { motion } from 'framer-motion';
import { Artwork } from '@/lib/data';

export default function ArtCard({ art }: { art: Artwork }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative mb-8 break-inside-avoid cursor-pointer"
        >
            <div className="relative overflow-hidden bg-neutral-900">
                <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-80"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="text-neon-yellow text-xs tracking-widest uppercase mb-1">{art.category}</span>
                    <h3 className="font-anton text-2xl text-white uppercase tracking-wide">{art.title}</h3>
                    <p className="font-inter text-white/80 mt-2">${art.price}</p>
                </div>
            </div>
        </motion.div>
    );
}
