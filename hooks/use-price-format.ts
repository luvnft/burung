export const formatPrice = (price: number | null) => {
  if (!price) {
    return undefined;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const parsePrice = (formattedPrice: string) => {
  if (!formattedPrice) {
    return null;
  }

  const numericPrice = formattedPrice.replace(/[^\d]/g, "");

  return parseInt(numericPrice, 10);
};
