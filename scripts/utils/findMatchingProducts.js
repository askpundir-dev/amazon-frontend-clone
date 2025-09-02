export function findMatchingProduct(products, productToFind) {
  if (!products && !productToFind) return null;
  return products.find((product) => product.id === productToFind.id);
}

export function findMatchingProductWithId(productsArray, productId) {
  if (!productsArray && !productId) return null;
  return productsArray.find((product) => product.id === productId);
}
