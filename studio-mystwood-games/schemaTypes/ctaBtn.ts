import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaBtn',
  title: 'Call to Action',
  type: 'document',
  fields: [
    defineField({ name: 'text', title: 'Button Text', type: 'string' }),
    defineField({ name: 'url', title: 'URL', type: 'string' }),
  ],
})
