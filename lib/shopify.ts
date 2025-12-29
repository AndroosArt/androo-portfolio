const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

async function shopifyFetch({ query, variables = {} }: { query: string; variables?: any }) {
  const cleanDomain = domain?.replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/2024-01/graphql.json`;

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Shopify GraphQL Errors:', data.errors);
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

  return response.body.data.products.edges.map((edge: any) => {
    const product = edge.node;
    const image = product.images.edges[0]?.node;

    let orientation = 'square';
    if (image) {
      if (image.height > image.width) orientation = 'portrait';
      if (image.width > image.height) orientation = 'landscape';
    }

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      category: product.productType || 'Art',
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      image: image ? image.url : 'https://placehold.co/600x600?text=No+Image',
      orientation: orientation,
      height: orientation === 'portrait' ? 'h-96' : orientation === 'landscape' ? 'h-64' : 'h-80',
    };
  });
}

export async function getProduct(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({
    query,
    variables: { handle }
  });

  return response.body?.data?.product;
}