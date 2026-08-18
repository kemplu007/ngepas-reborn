/*==================================================
 NGEPAS REBORN
 File   : productReadiness.js
 Module : Admin Product Content Readiness
 Intent : Menyatukan sinyal read-only kesiapan URL gambar
          publik dan affiliate tanpa mengubah write flow.
==================================================*/

function isHttpUrl(value) {
  if (typeof value !== "string" || value.trim().length === 0) return false;

  try {
    const parsedUrl = new URL(value.trim());
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

function getProductContentReadiness(product = {}) {
  const items = [
    {
      key: "image",
      label: "URL gambar publik",
      complete: isHttpUrl(product.image),
    },
    {
      key: "affiliateLink",
      label: "URL affiliate",
      complete: isHttpUrl(product.affiliateLink),
    },
  ];

  const completeCount = items.filter((item) => item.complete).length;

  return {
    items,
    completeCount,
    isReady: completeCount === items.length,
    missingLabels: items
      .filter((item) => !item.complete)
      .map((item) => item.label),
  };
}

export { getProductContentReadiness, isHttpUrl };
