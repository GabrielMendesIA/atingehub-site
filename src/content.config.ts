import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    slogan: z.string(),
    summary: z.string(),
    family: z.enum(['operacional', 'inteligencia', 'estrategico']),
    order: z.number(),
    tool_base: z.string(),
    problem: z.string(),
    deliverable: z.string(),
    versatility: z.enum(['baixa', 'media', 'alta', 'muito-alta']),
    sold_alone: z.boolean(),
    dependencies: z.array(z.string()).default([]),
    pricing: z.object({
      oneshot: z.string().optional(),
      monthly: z.string().optional(),
      monthly_required: z.boolean().default(false),
    }),
    accent_color: z.string().optional(),
    icon: z.string().optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaDescription: z.string().optional(),
    category: z.enum(['reflexao', 'bastidores', 'tutorial', 'mercado', 'manifesto']),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Gabriel Mendes'),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    summary: z.string(),
    products_used: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { products, posts, cases };
