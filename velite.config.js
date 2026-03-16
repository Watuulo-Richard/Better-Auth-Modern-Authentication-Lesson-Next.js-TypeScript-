import { defineConfig, defineCollection, s } from 'velite'

/** @template {{ slug: string }} T @param {T} data @returns {T & { slugAsParams: string }} */
const computedFields = (data) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
})

const blogs = defineCollection({
  name: 'Blog',
  pattern: 'content/docs/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()),
      image: s.image(),
      imageDark: s.image().optional(),
      author: s.string(),
      code: s.mdx(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { blogs },
})
