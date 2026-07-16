// Objects / shop data pulled from the Figma "Dev" page Objects grid + the
// one designed PDP ("CH 0045"). Only one product has real detail copy in
// Figma today, so — mirroring the Son Ru placeholder approach on the
// Spaces side — every grid item links through to that same PDP content
// until each object gets its own Sanity + Shopify entry.

export type ObjectItem = {
  slug: string;
  title: string;
  price: string;
  image: string;
};

export type ObjectDetail = ObjectItem & {
  captionIndex: string; // e.g. "1 / 8"
  description: string;
  bodyText: string;
  materials: string;
  measurements: string;
  images: string[];
};

const img = (name: string) => `/images/${name}`;

export const objects: ObjectItem[] = [
  { slug: "ch-0045-01", title: "CH 0045", price: "300€", image: img("b882a0dd13a50f6bc8211867d63083d20bdd11b4.png") },
  { slug: "ch-0045-02", title: "CH 0045", price: "price on request", image: img("4196cc21cb0a31cb7165400eafdd3427b6303853.png") },
  { slug: "ch-0045-03", title: "CH 0045", price: "60€", image: img("c1ca66480bb465f75f2dca73f95b6d45c8c7c30f.png") },
  { slug: "ch-0045-04", title: "CH 0045", price: "price on request", image: img("5288a9ae98b4e860ead6b724d97218da5d6d146e.png") },
  { slug: "ch-0045-05", title: "CH 0045", price: "100€", image: img("da3fcc0defefd94d06fe2fdf5b0680d8653945bd.png") },
  { slug: "ch-0045-06", title: "CH 0045", price: "300€", image: img("08653bb0a5685d9c303fbe6f28aa13c3dfcae0dd.png") },
  { slug: "ch-0045-07", title: "CH 0045", price: "60€", image: img("7654eb7fbca4ee94fe4045947f7988c98c05db60.png") },
  { slug: "ch-0045-08", title: "CH 0045", price: "price on request", image: img("4a3f0558792b8cf6ccae92b1335d7f2566806e77.png") },
  { slug: "ch-0045-09", title: "CH 0045", price: "price on request", image: img("2e29b8e0addee9fa0642775c727aa5511fad0326.png") },
  { slug: "ch-0045-10", title: "CH 0045", price: "60€", image: img("b60878fb16e2dfb3cc569d003a430b93cfb8e541.png") },
  { slug: "ch-0045-11", title: "CH 0045", price: "price on request", image: img("6c5263381db7f0536492121dc814461040732484.png") },
  { slug: "ch-0045-12", title: "CH 0045", price: "price on request", image: img("4db08567d5f682398d9d24c11d80da154c384c42.png") },
  { slug: "ch-0045-13", title: "CH 0045", price: "price on request", image: img("582889cde5883139421983497b56e99d1cb6469f.png") },
  { slug: "ch-0045-14", title: "CH 0045", price: "60€", image: img("e51c49446c9ebbe51e95b3315564a6f00ed4cce7.png") },
  { slug: "ch-0045-15", title: "CH 0045", price: "60€", image: img("5d4862a4faa348d01ffbc7864bb0a86eabdf2118.png") },
];

const detailBase = {
  description:
    "1 / 8 CH 0045 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.",
  bodyText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit. Vestibulum imperdiet nisi et nisi condimentum, vitae lobortis erat lacinia. Suspendisse potenti. Integer lacinia risus iaculis neque consequat efficitur. Nullam ipsum orci, bibendum in pellentesque ut, efficitur sit amet nisl. Donec sagittis tortor ut eros tempor, et scelerisque tellus tempor. Nunc egestas libero vitae elit faucibus consectetur. Vivamus a aliquet tellus, ac rutrum leo. Proin in dictum nisl. Maecenas ac diam id quam feugiat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque et ligula dui.",
  materials: "Brass, Linen",
  measurements: "120cm x 40cm",
};

export const getObject = (slug: string): ObjectDetail | undefined => {
  const index = objects.findIndex((o) => o.slug === slug);
  if (index === -1) return undefined;
  const item = objects[index];
  // Real per-angle photography isn't in Figma yet — until each object has
  // its own shot set, cycle in three neighboring grid images alongside the
  // item's own so the PDP carousel has real click-through variety instead
  // of one image repeated four times.
  const images = [
    item.image,
    objects[(index + 1) % objects.length].image,
    objects[(index + 2) % objects.length].image,
    objects[(index + 3) % objects.length].image,
  ];
  return {
    ...item,
    captionIndex: "1 / 8",
    ...detailBase,
    images,
  };
};
