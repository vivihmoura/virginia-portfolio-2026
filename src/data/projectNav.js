export function getNextSlug(homeOrder, pageEntries, currentSlug) {
  const availableSlugs = homeOrder
    .map((project) => project.slug)
    .filter((slug) => pageEntries.some((entry) => entry.slug === slug));

  const index = availableSlugs.indexOf(currentSlug);
  const isLast = index === availableSlugs.length - 1;
  return isLast ? null : availableSlugs[index + 1];
}
