'use client';
import ArtCard from './ArtCard';

// Define the shape of the data we expect
interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    orientation: string;
    height: string;
}

// Now accepts 'products' as a prop
export default function MasonryGrid({ products }: { products: Product[] }) {
    if (!products || products.length === 0) {
        return (
            <section className="px-4 py-20 bg-neutral-950 text-center text-white/50">
                <h2 className="font-anton text-2xl">No Works Found</h2>
                <p>Check your Shopify Inventory.</p>
            </section>
        );
    }

    return (
        <section className="px-4 py-20 bg-neutral-950">
            <div className="mb-12 text-center">
                <h2 className="font-anton text-4xl uppercase text-white">Selected Works</h2>
            </div>

            {/* Render the passed products */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-7xl mx-auto space-y-8">
                {products.map((art) => (
                    <ArtCard key={art.id} art={art as any} />
                ))}
            </div>
        </section>
    );
}