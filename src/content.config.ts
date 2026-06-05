// src/content.config.ts
import { defineCollection } from 'astro:content';
import { z } from 'zod';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = { blog };
