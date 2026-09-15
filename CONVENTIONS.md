# Conventions

Reference doc for how content is organized and named across this project. Consult before adding a new project or uploading assets.

## Image formats

- **Static images on project pages:** always `.avif`.
- **Exception — Chase and Revlon:** these two project pages use `.mp4` instead, because they're motion prototypes (site walkthroughs), not static illustrations.
- **Home/Design thumbnails:** `.mp4` on desktop (plays on hover) + `.gif` on mobile (autoplays, no hover). This is unrelated to the exception above — it applies to every project's thumbnail, including Chase and Revlon's.
- **Occasional `.gif`/`.mp4` inside an otherwise-static project:** allowed. Use the `"video"` block type (or a `.gif` as a normal `"image"` block — a `<img>` tag plays a `.gif` natively) for that one asset; everything else in that project stays `.avif`.

## File naming

Pattern: `{slug}-{purpose}[-{variant}].{ext}`

| Purpose | Pattern | Example |
|---|---|---|
| Project page hero | `{slug}-page-01.avif` | `printfresh-page-01.avif` |
| Project page content image, in order | `{slug}-page-NN.avif` (two-digit, sequential) | `printfresh-page-07.avif` |
| Home/Design thumbnail, desktop | `{slug}-thumb-home-desktop.mp4` | `revlon-thumb-home-desktop.mp4` |
| Home/Design thumbnail, mobile | `{slug}-thumb-home-mobile.gif` | `revlon-thumb-home-mobile.gif` |

`page-01` is always the hero. Numbering continues sequentially through every block after it, in the order they appear on the page — including blocks inside a `2-up` (side-by-side) pair, which just take the next two numbers.

## Folder structure

```
public/images/{slug}/
  {slug}-page-01.avif                (hero)
  {slug}-page-02.avif
  {slug}-page-03.avif
  ...
  {slug}-thumb-home-desktop.mp4
  {slug}-thumb-home-mobile.gif
```

One folder per project, named after its `slug`. Nothing is shared between projects.

## Data files (where a project is registered)

| File | Purpose |
|---|---|
| `src/data/projects.js` | `illustrationProjects` / `designProjects` — drives the home and Design listing pages, and is the **source of truth for project order** (used for "Next →" navigation). |
| `src/data/illustrationProjectPages.js` | Full page data for each Illustration project (`hero`, `blocks`, optional `titleLines`). |
| `src/data/designProjectPages.js` | Same, for Design projects. |

A project needs an entry in **both** `projects.js` (to appear on the listing + get a working thumbnail link) and its `*ProjectPages.js` (to have an actual page). If it's only in `projects.js`, the thumbnail won't link anywhere; the `getNextSlug` helper (`src/data/projectNav.js`) also skips any slug that isn't in both places, so it never links "Next →" to a page that doesn't exist yet.

## Block types (project page content)

Set in the `blocks` array of a project's entry in `*ProjectPages.js`. Rendered by `src/pages/illustration/[slug].astro` and `src/pages/design/[slug].astro`.

| `type` | Renders | Component |
|---|---|---|
| `"image"` | One full-width static image (or `.gif`) | `ImageBlock.astro` |
| `"video"` | One full-width looping video (autoplay, muted, no controls) | `VideoBlock.astro` |
| `"images-2"` | Two images side by side (stacks on tablet/mobile) | `ImagesTwoBlock.astro` |
| `"text"` | Meta (year/client/category) + description paragraph | `TextBlock.astro` |

The hero (`project.hero`, outside the `blocks` array) auto-detects video vs. image by file extension — a `.mp4` hero renders as video, anything else renders as image. No extra field needed.
