# Fonts Directory

## Required Fonts

Place subsetted WOFF2 files here:

1. `tiro-devanagari-hindi-subset.woff2` — Devanagari serif
2. `crimson-pro-subset.woff2` — Latin serif, regular weight
3. `crimson-pro-semibold-subset.woff2` — Latin serif, semibold weight

## Subsetting Instructions

### Why Subset?

Full Devanagari fonts are 200-400KB. With subsetting, we can reduce to 30-50KB.

### Recommended Tools

**Option 1: glyphhanger (automated)**

```bash
npm install -g glyphhanger
glyphhanger --subset=TiroDevanagariHindi-Regular.ttf --formats=woff2 --LATIN --US_ASCII
```

**Option 2: pyftsubset (manual, more control)**

```bash
pip install fonttools brotli
pyftsubset TiroDevanagariHindi-Regular.ttf \
  --output-file=tiro-devanagari-hindi-subset.woff2 \
  --flavor=woff2 \
  --unicodes="U+0900-097F,U+1CD0-1CFF,U+A8E0-A8FF,U+0020-007F,U+00A0-00FF,U+2000-206F"
```

### Unicode Ranges to Include

**Devanagari:**
- U+0900-097F — Devanagari base
- U+1CD0-1CFF — Devanagari Extended
- U+A8E0-A8FF — Devanagari Extended-A

**Latin (for metadata, English spans):**
- U+0020-007F — Basic Latin
- U+00A0-00FF — Latin-1 Supplement

**Punctuation:**
- U+2000-206F — General Punctuation

### Source Fonts

**Tiro Devanagari Hindi:**
- Download: https://fonts.google.com/specimen/Tiro+Devanagari+Hindi
- License: OFL (open source, can self-host)

**Crimson Pro:**
- Download: https://fonts.google.com/specimen/Crimson+Pro
- License: OFL (open source, can self-host)

### Current Status

**TEMPORARY:** The site currently uses a Google Fonts fallback for development.

**Before production deploy:**
1. Subset fonts using tools above
2. Place WOFF2 files in this directory
3. Remove Google Fonts `<link>` from Base.astro
4. Verify page weight is under 150KB

## Testing Devanagari Rendering

After adding fonts, test these:

- Conjuncts: क्ष, त्र, ज्ञ
- Matras: के, की, कौ, कं, कः
- Proper spacing and line-height (should be 1.9-2.0)
- Mobile rendering (320px viewport)
