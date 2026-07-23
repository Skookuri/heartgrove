import {defineField, defineType} from 'sanity'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }]
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {source: 'title'},
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Banner Image',
            type: 'image',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bannerAlt',
            title: 'Banner Alt Text',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'body',
            type: 'array',
            of: [
                {type: 'block'},
                {
                    type: 'image',
                    title: 'Inline Image',
                    options: {hotspot: true},// Enables visual cropping/positioning in Studio
                    fields: [{
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative Text',
                        description: 'Important for SEO and accessibility.',
                        validation: (Rule) => Rule.required(),
                    },
                    {
                        name: 'caption',
                        type: 'string',
                        title: 'Caption',
                        description: 'Displays visibly below the image.',
                    }]
                }
            ],
        }),
        defineField({
            name: 'ctaBtn',
            title: 'CTA Button',
            type: 'reference',
            to: [{ type: 'ctaBtn' }]
        }),
        defineField({
            name: 'sns',
            title: 'Social Media',
            type: 'array',
            of: [{type: 'reference', to: [{ type: 'sns' }]}]
        }),

    ],
})