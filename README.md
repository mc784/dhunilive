# Dhuni (धूनी)

Static site for a Hindi devotional music imprint. Built with Astro 5, deployed to Cloudflare Pages.

## Design Principles

- **Audience-first:** Indian, Hindi-speaking, mobile on patchy connections
- **Weight budget:** Under 150KB per page including fonts
- **Zero JavaScript:** Fully functional without client-side JS
- **Devanagari primary:** Hindi is not a translation, it's the main language
- **Semantic HTML:** Real heading hierarchy, proper lang attributes, alt text everywhere
- **WCAG AA contrast:** Accessible to all

## Tech Stack

- Astro 5 (static output, no UI framework)
- Hand-written CSS (no Tailwind)
- Self-hosted subsetted fonts
- No analytics, trackers, or consent modals

## Setup

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
```

## Adding a New Release

1. Create a new markdown file in `src/content/releases/`:

```bash
src/content/releases/your-song-slug.md
```

2. Use this frontmatter template:

**Note:** The slug is derived from the filename (e.g., `your-song-slug.md` → `/your-song-slug`)

```yaml
---
title_hi: "भजन का शीर्षक"
title_roman: "Bhajan ka Shirshak"
deity: "Ram"
deity_form: "Ram of Ayodhya"
dialect: "Awadhi"
raga: "Bhairavi"           # optional
taal: "Keherwa"            # optional
bpm: 90                    # optional
year: 2024
release_date: 2024-06-15
youtube_id: "YOUR_YOUTUBE_VIDEO_ID"
spotify_url: "https://open.spotify.com/track/..."    # optional
jiosaavn_url: "https://www.jiosaavn.com/song/..."   # optional
apple_url: "https://music.apple.com/..."            # optional
rights_status: "traditional"    # or "original", "pd-derived", "arrangement"
rights_note: "Traditional aarti, arrangement and recording original to Dhuni"
credits:
  singer: "Singer Name"
  lyrics: "Lyricist Name"       # optional
  music: "Composer Name"        # optional
  chorus: "Chorus singers"      # optional
draft: false                    # Set to true to hide from site
---
```

3. Add lyrics in markdown body:

```markdown
## देवनागरी गीत

[Full lyrics in Devanagari]

## Roman Transliteration

[Full lyrics in Roman script]
```

4. The release will automatically appear on the homepage and get its own detail page.

## Fonts

The site uses:
- **Tiro Devanagari Hindi** (serif) for Devanagari text
- **Crimson Pro** (serif) for Latin text

**Font subsetting required:** Place subsetted WOFF2 files in `public/fonts/`:

```
public/fonts/
  tiro-devanagari-hindi-subset.woff2
  crimson-pro-subset.woff2
  crimson-pro-semibold-subset.woff2
```

Use a tool like [glyphhanger](https://github.com/zachleat/glyphhanger) or [fonttools](https://github.com/fonttools/fonttools) to subset fonts. Include only:
- Devanagari Unicode range: U+0900-097F, U+1CD0-1CFF, U+A8E0-A8FF
- Latin basic + extended: U+0020-007F, U+00A0-00FF
- Common punctuation

**Without subsetting, fonts will exceed the 150KB page budget.**

## Deploying to Cloudflare Pages

### Option 1: Via Cloudflare Dashboard (GitHub auto-deploy)

1. Push this repo to GitHub
2. Go to Cloudflare Dashboard → Workers & Pages → Create application
3. Connect to Git → Select your repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** `NODE_VERSION = 20`
5. Deploy

### Option 2: Via Wrangler CLI (manual)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the site
npm run build

# Create Pages project (first time only)
wrangler pages project create dhunilive --production-branch=main

# Deploy
wrangler pages deploy dist --project-name=dhunilive
```

### Custom Domain Setup

1. In Cloudflare Pages → dhunilive → Custom domains
2. Add `dhunilive.com` and `www.dhunilive.com`
3. DNS records will be created automatically if domain is on Cloudflare

## Performance Budget

**Target:** Under 150KB per page including fonts

Check actual output after building:

```bash
npm run build
ls -lh dist/        # Check index.html size
ls -lh dist/fonts/  # Check font file sizes
```

If over budget:
1. Further subset fonts (reduce character set)
2. Optimize images (use WebP, compress)
3. Remove unused CSS rules

## What's Missing (Intentionally)

The following were considered and deliberately excluded:

- **Blog/Articles** — YouTube descriptions serve this purpose
- **Search** — Site is small, cmd+F works
- **Newsletter signup** — YouTube subscriptions are the engagement channel
- **Contact form** — Email link is sufficient
- **About page** — The tagline and footer say enough
- **Social share buttons** — YouTube has these built-in
- **Analytics** — Respect for user privacy, YouTube provides metrics
- **Animations** — Save bandwidth, faster load times

If you think something is missing, ask yourself: Does this serve the audience (older Indians on slow connections searching for bhajan lyrics), or does it serve vanity metrics?

## File Structure

```
dhunilive/
├── src/
│   ├── content/
│   │   ├── config.ts              # Zod schema for releases
│   │   └── releases/              # Markdown files, one per song
│   ├── layouts/
│   │   └── Base.astro             # Base layout with SEO, JSON-LD
│   ├── pages/
│   │   ├── index.astro            # Homepage with releases list
│   │   └── [slug].astro           # Dynamic release detail pages
│   ├── styles/
│   │   └── global.css             # Hand-written CSS, no utilities
│   └── env.d.ts
├── public/
│   ├── fonts/                     # Self-hosted subsetted fonts
│   ├── _headers                   # Cloudflare security/cache headers
│   └── og-image.jpg               # Open Graph image (create this)
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## SEO

- Semantic HTML with proper heading hierarchy
- `<title>` and meta description in Hindi + English
- Open Graph and Twitter Card tags
- JSON-LD structured data (MusicGroup on index, MusicRecording on releases)
- Sitemap generated automatically at `/sitemap-index.xml`
- `lang="hi"` on html element, `lang="en"` on English spans
- Server-rendered lyrics as crawlable HTML (not JS-injected)

## Maintenance

- **Replace placeholder tagline** before launch (see index.astro comment)
- **Create Open Graph image** at `public/og-image.jpg` (1200x630px)
- **Replace example release** in `src/content/releases/` with real bhajan
- **Test on real devices** — mid-range Android phones, slow 3G connection
- **Validate Devanagari rendering** — check conjuncts, matras, proper spacing

## License

Content and code proprietary to Dhuni unless otherwise noted. Traditional bhajan lyrics are in the public domain where applicable.
