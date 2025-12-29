'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ArtCardProps {
    art: {
        id: string;
        title: string;
        handle: string;
        category: string;
        price: number;
        image: string;
        height: string;
    };
}

export default function ArtCard({ art }: ArtCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative mb-6 break-inside-avoid"
        >
            <Link href={`/product/${art.handle}`}>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer">
                    <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-80"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block">
                            {art.category}
                        </span>
                        <h3 className="font-anton text-2xl text-white uppercase tracking-wide leading-none mb-2">
                            {art.title}
                        </h3>
                        <div className="flex items-center justify-between border-t border-white/20 pt-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="font-inter text-white font-medium">${art.price}</p>
                            <span className="text-xs font-bold uppercase tracking-widest text-white hover:text-yellow-400">
                                View Piece
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
