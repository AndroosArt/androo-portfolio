import { getProduct } from '@/lib/shopify';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-neutral-950 font-anton text-3xl">Product not found</div>;
    }

    const variantId = product.variants.edges[0]?.node.id;
    // Clean the ID: "gid://shopify/ProductVariant/12345" -> "12345"
    const numericId = variantId?.split('/').pop();
    const checkoutUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${numericId}:1`;

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Left: Image */}
                <div className="relative">
                    <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-900 border border-white/10">
                        <img
                            src={product.images.edges[0]?.node.url}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-center">
                    <h1 className="font-anton text-5xl md:text-7xl uppercase leading-none mb-6">
                        {product.title}
                    </h1>

                    <div className="text-2xl font-inter text-yellow-400 mb-8">
                        ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                    </div>

                    <div
                        className="prose prose-invert prose-lg text-neutral-400 font-inter mb-12 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />

                    <div className="flex gap-4">
                        <a
                            href={checkoutUrl}
                            className="flex-1 bg-white text-black font-bold uppercase tracking-widest py-5 text-center hover:bg-yellow-400 transition-colors"
                        >
                            Buy Now
                        </a>
                        <Link
                            href="/#gallery"
                            className="px-8 py-5 border border-white/20 uppercase tracking-widest font-bold hover:bg-white/5 transition-colors"
                        >
                            Back
                        </Link>
                    </div>

                    <p className="mt-6 text-xs text-neutral-600 uppercase tracking-widest">
                        Secure Checkout via Shopify
                    </p>
                </div>
            </div>
        </div>
    );
}
