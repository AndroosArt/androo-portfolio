const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

async function shopifyFetch({ query, variables = {} }: { query: string; variables?: any }) {
  // 1. URL Construction
  // Ensure we are hitting the GraphQL endpoint, not the REST API.
  // We remove any trailing slashes from the domain just in case.
  const cleanDomain = domain?.replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/2024-01/graphql.json`;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // CRITICAL FIX: This is the specific header for Storefront API.
    // If this is "X-Shopify-Access-Token", it will fail with UNAUTHORIZED.
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      // ISR: Revalidate data every 60 seconds
      next: { revalidate: 60 },
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Shopify GraphQL Errors:', data.errors);
      // Throwing here ensures we see the error in the terminal
      throw new Error(data.errors[0].message || 'Shopify Error');
    }

    return {
      status: response.status,
      body: data,
    };
  } catch (error) {
    console.error('Shopify Fetch Error:', error);
    return {
      status: 500,
      error: 'Error receiving data from Shopify',
    };
  }
}

// 2. The Product Query
// This maps your Shopify Data to your App's "Artwork" interface
export async function getAllProducts() {
  const query = `
    query Products {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });

  if (!response.body?.data?.products) {
    console.log("No products found. Response:", JSON.stringify(response));
    return [];
  }

  // Transform Shopify Data -> Your App's "Artwork" Shape
  return response.body.data.products.edges.map((edge: any) => {
    const product = edge.node;
    const image = product.images.edges[0]?.node;

    // Rudimentary layout logic: If image is taller than wide, it's portrait
    let orientation = 'square';
    if (image) {
      if (image.height > image.width) orientation = 'portrait';
      if (image.width > image.height) orientation = 'landscape';
    }

    return {
      id: product.id,
      title: product.title,
      category: product.productType || 'Art',
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      image: image ? image.url : 'https://placehold.co/600x600?text=No+Image',
      orientation: orientation,
      height: orientation === 'portrait' ? 'h-96' : orientation === 'landscape' ? 'h-64' : 'h-80',
    };
  });
}