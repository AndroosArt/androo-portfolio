import Navbar from '@/components/Navbar';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Texture/Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    // Using a placeholder image that fits the "Visual Chaos" theme
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2500')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/80" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="font-anton text-7xl md:text-9xl uppercase leading-none mb-8 tracking-tight">
                        The <br /> Artist
                    </h1>
                    <p className="font-inter text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                        Obsessed with the collision of pop culture and dystopia. Androo creates visual chaos that demands attention in an era of infinite scroll.
                    </p>
                </div>
            </div>

            {/* Bio / Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="prose prose-invert prose-lg mx-auto">
                    <h2 className="font-anton text-4xl uppercase text-white mb-8 border-b border-white/10 pb-4">
                        Manifesto
                    </h2>
                    <p className="text-white/70 mb-6">
                        Everything is content. Everything is noise. My work explores the space between the signal and the static. Using aggressive color palettes and rapid-fire imagery, I attempt to capture the feeling of modern digital overload.
                    </p>
                    <p className="text-white/70">
                        Based in the digital ether, my prints are physical artifacts of a virtual world. Each piece is designed to stop the scroll and force a moment of pure, unadulterated visual impact.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 text-center text-white/40 text-sm border-t border-white/5 uppercase tracking-widest">
                &copy; 2026 Androo. All Rights Reserved.
            </footer>
        </div>
    );
}
