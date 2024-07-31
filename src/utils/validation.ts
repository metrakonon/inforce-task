import { Product } from "../types/product";

export const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateProduct = (productState: Partial<Product>): boolean => {
  return (
    !!productState.imageUrl &&
    !!productState.name &&
    !!productState.count &&
    !!productState.size?.width &&
    !!productState.size?.height &&
    !!productState.weight
  );
};
