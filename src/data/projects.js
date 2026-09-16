export const illustrationProjects = [
  { slug: "urban-coffee", name: "Urban Coffee", href: "/illustration/urban-coffee" },
  { slug: "virgin-atlantic", name: "Virgin Atlantic Magazine", href: "/illustration/virgin-atlantic" },
  { slug: "people-brooklyn-parks", name: "People of Brooklyn Parks", href: "/illustration/people-brooklyn-parks" },
  { slug: "harper-collins", name: "Harper Collins Book Covers", href: "/illustration/harper-collins" },
  { slug: "scholastic", name: "Scholastic", href: "/illustration/scholastic" },
  { slug: "spotted-ny", name: "Spotted in New York", href: "/illustration/spotted-ny" },
  { slug: "good-vibes-only", name: "Good Vibes Only", href: "/illustration/good-vibes-only" },
  { slug: "printfresh", name: "Printfresh Icons", href: "/illustration/printfresh" },
  { slug: "splendid", name: "Splendid", href: "/illustration/splendid" },
  { slug: "philly-map", name: "Philly Map", href: "/illustration/philly-map" },
];

const illustrationNextOrderSlugs = [
  "urban-coffee",
  "virgin-atlantic",
  "people-brooklyn-parks",
  "harper-collins",
  "scholastic",
  "spotted-ny",
  "good-vibes-only",
  "printfresh",
  "splendid",
  "philly-map",
];

export const illustrationNextOrder = illustrationNextOrderSlugs.map((slug) =>
  illustrationProjects.find((project) => project.slug === slug)
);

export const designProjects = [
  { slug: "revlon", name: "Revlon", href: "/design/revlon" },
  { slug: "chase", name: "Chase", href: "/design/chase" },
];
