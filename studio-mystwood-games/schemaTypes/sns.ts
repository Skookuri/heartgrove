import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sns',
    title: 'Social Media',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Platform Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'url',
            title: 'Profile URL',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Platform Icon',
            description: 'Paste the raw <svg>...</svg> markup here (from icons8.com)',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
    ],
    // preview: {
    //     select: {
    //     title: 'name',
    //     subtitle: 'url',
    //     media: 'icon',
    //     },
    // },
})
