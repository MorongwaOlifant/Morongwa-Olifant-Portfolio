export default function sitemap() {
  const base = "https://morongwa.dev";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/#education` },
    { url: `${base}/#projects` },
    { url: `${base}/#skills` },
    { url: `${base}/#contact` },
  ];
}