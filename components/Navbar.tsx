'use client';
import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 border-b border-white/5 bg-black/5 backdrop-blur-md">
            {/* Logo */}
            <Link href="/" className="font-anton text-3xl tracking-wide text-white uppercase hover:text-neon-yellow transition-colors">
                ANDROO
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-white/80">
                <Link href="/gallery" className="hover:text-neon-yellow transition-colors">Gallery</Link>
                <Link href="/about" className="hover:text-neon-yellow transition-colors">The Artist</Link>
                <Link href="/contact" className="hover:text-neon-yellow transition-colors">Contact</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <button className="relative group text-white hover:text-neon-yellow transition-colors">
                    <ShoppingBag className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-neon-pink text-[8px] font-bold text-white">2</span>
                </button>
                <button className="md:hidden text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
