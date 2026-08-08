import { defineCollection, z } from 'astro:content';

const releases = defineCollection({
  type: 'content',
  schema: z.object({
    title_hi: z.string(),
    title_roman: z.string(),
    deity: z.string(),
    deity_form: z.string(),
    dialect: z.string(),
    raga: z.string().optional(),
    taal: z.string().optional(),
    bpm: z.number().optional(),
    year: z.number(),
    release_date: z.date(),
    youtube_id: z.string(),
    spotify_url: z.string().optional(),
    jiosaavn_url: z.string().optional(),
    apple_url: z.string().optional(),
    rights_status: z.enum(['original', 'traditional', 'pd-derived', 'arrangement']),
    rights_note: z.string().optional(),
    credits: z.object({
      singer: z.string(),
      lyrics: z.string().optional(),
      music: z.string().optional(),
      chorus: z.string().optional(),
    }),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  releases,
};
