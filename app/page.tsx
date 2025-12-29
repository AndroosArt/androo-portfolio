import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MasonryGrid from "@/components/MasonryGrid";
import { getAllProducts } from "@/lib/shopify"; // Import the real fetcher

export default async function Home() {
  // Fetch real data from Shopify on the server
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-neutral-950">
      <Navbar />
      <Hero />

      {/* Pass the real products to the Grid */}
      <MasonryGrid products={products} />

      <footer className="py-12 text-center text-white/40 text-sm border-t border-white/5 uppercase tracking-widest">
        &copy; 2026 Androo. All Rights Reserved.
      </footer>
    </main>
  );
}