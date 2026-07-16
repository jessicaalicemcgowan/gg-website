// Content pulled verbatim from the Figma "Dev" page (Son Ru / Son Rullan
// case study, node 65:775 + surrounding frames). Per brief: every other
// Spaces case study reuses this exact template + copy as a CMS placeholder
// until each property gets its own entry in Sanity.

export type CaseStudySection = {
  heading: string;
  body: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  title: string; // e.g. "Son Rullan"
  location: string; // e.g. "Mallorca Spain"
  gridImage: string; // thumbnail used on the Spaces grid
  heroImage: GalleryImage;
  sections: CaseStudySection[];
  gallery: GalleryImage[]; // the horizontally-scrolling strip inside the panel
  infoImages: GalleryImage[]; // images shown inside the "info" sub-panel
  infoLocation: string; // e.g. "deía, mallorca" — heading in the text-only info panel
  infoText: string; // body copy in the text-only info panel
};

const img = (name: string) => `/images/${name}`;

const sonRullan: CaseStudy = {
  slug: "son-rullan",
  title: "Son Rullan",
  location: "Mallorca Spain",
  gridImage: img("a0364afee0fdf552721b3d5d0e6ce87bf5ad1b49.png"),
  heroImage: {
    src: img("a0364afee0fdf552721b3d5d0e6ce87bf5ad1b49.png"),
    alt: "Son Rullan, Mallorca Spain",
    caption:
      "1 / 8        SON RULLAN, Mallorca Spain. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit.",
  },
  sections: [
    {
      heading: "origins",
      body: "Geoffrey Grunfeld was born and raised in Mallorca, on Traumuntana mountain range. Growing up in an old monastery Son Rullan, a property that was purchased and carefully restored with respect to Mallorquin estatic by his father, Fred Grunfeld, and later on became a pinnacle point of Deia community Geoffrey was surrounded by nature, people and spirits of Mallorquin.",
    },
    {
      heading: "approach",
      body: "After graduating St.Martin for Architecture “Spaces and Objects” degree, Grunfeld returned home and started working as a designer refurbishing houses on the island. His early on work show us glimpse of his whimsical functional space. From multiple-curving-layers bathtub to Mallorquin style fire place. While making houses as a way of earning, his passion for objects continue to developed and being included through out his works.",
    },
  ],
  gallery: [
    { src: img("a4daf582f74e6864739b2d6d90aed84f27e48dc1.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_044" },
    { src: img("6145c7caa128c0b12c242334cbd20b7703eb4ea9.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_001" },
    { src: img("7ed79b1e6413eecadde7785501891d8d81d5cea3.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_045" },
    { src: img("08653bb0a5685d9c303fbe6f28aa13c3dfcae0dd.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_013" },
    { src: img("ffe222202da7afd63ed12494ff3d71695c77493a.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_042" },
    { src: img("da3fcc0defefd94d06fe2fdf5b0680d8653945bd.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_028" },
    { src: img("984d24e5a66a0cdd8167d8c17088c405d891ce78.png"), alt: "Son Rullan detail", caption: "image 70" },
    { src: img("e2fad2f2486666583d7d817b26132ed00320ad9c.png"), alt: "Son Rullan detail", caption: "image 68" },
    { src: img("25b1c02e29615a767f02c7c54bf990cb2b1bbcec.png"), alt: "Son Rullan detail", caption: "image 69" },
    { src: img("def6a06bb4f25c7baab81e4a7878947d54991f82.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_017" },
    { src: img("35c1a853e7c0800b5c029ff148a8903ef76a7868.png"), alt: "Son Rullan detail", caption: "image 71" },
    { src: img("dedfba55394bb0291a446bc221bbf7f4b267f843.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_002" },
    { src: img("f0c90a01f07ff01c5e6667c99d58545fa3af9d6b.png"), alt: "Son Rullan detail", caption: "SonRu_Fanette-Guilloud_018" },
  ],
  infoImages: [
    { src: img("d38af03a961ec052bb19d3937b00545e5797b79e.png"), alt: "Can Gelat interior", caption: "CAN GELAT, Mallorca Spain" },
    { src: img("da86bf5e573a6a23ff7cb8d49905568ce3d1e9b7.png"), alt: "Can German fireplace", caption: "CAN GERMAN, Mallorca Spain" },
    { src: img("cd4642a6c9ff389d0e7bfdff7052c1e206bdaa48.png"), alt: "Can Cigonya detail", caption: "CAN CIGONYA, Mallorca Spain" },
    { src: img("cdb1bb7ab36aafdd4660dd29c47e37ebf1368406.png"), alt: "Exterior terrace", caption: "DSC03687" },
  ],
  // Text-only "info" sub-panel content (node 65:1093/1096/1097) — no images,
  // just a location heading + the same lorem ipsum body copy reused
  // throughout the page.
  infoLocation: "deía, mallorca",
  infoText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nulla bibendum, convallis tortor sed, accumsan elit. Vestibulum imperdiet nisi et nisi condimentum, vitae lobortis erat lacinia. Suspendisse potenti. Integer lacinia risus iaculis neque consequat efficitur. Nullam ipsum orci, bibendum in pellentesque ut, efficitur sit amet nisl. Donec sagittis tortor ut eros tempor, et scelerisque tellus tempor. Nunc egestas libero vitae elit faucibus consectetur. Vivamus a aliquet tellus, ac rutrum leo. Proin in dictum nisl. Maecenas ac diam id quam feugiat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque et ligula dui.",
};

// Remaining grid entries — real project names from the Figma grid, Son
// Rullan's write-up used as placeholder body copy for every one until each
// gets its own Sanity entry (per brief: "use the same content as Son Ru as
// placeholder").
const placeholderTitles: { slug: string; title: string; location: string; grid: string }[] = [
  { slug: "can-cigonya", title: "Can Cigonya", location: "Mallorca Spain", grid: "cd4642a6c9ff389d0e7bfdff7052c1e206bdaa48.png" },
  { slug: "can-gelat", title: "Can Gelat", location: "Mallorca Spain", grid: "d38af03a961ec052bb19d3937b00545e5797b79e.png" },
  { slug: "can-german", title: "Can German", location: "Mallorca Spain", grid: "da86bf5e573a6a23ff7cb8d49905568ce3d1e9b7.png" },
];

export const caseStudies: CaseStudy[] = [
  sonRullan,
  ...placeholderTitles.map((p) => ({
    ...sonRullan,
    slug: p.slug,
    title: p.title,
    location: p.location,
    gridImage: img(p.grid),
  })),
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
