// /schemas/product.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Base Price',
      type: 'number',
      validation: Rule => Rule.required(),
    }),

    // 🔥 New Category Reference
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'defaultImage',
      title: 'Default Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'colorImages',
      title: 'Images per Color',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'colorImage',
          fields: [
            defineField({
              name: 'color',
              title: 'Color Name',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'variant',
          fields: [
            defineField({
              name: 'color',
              title: 'Color',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  { title: 'XS', value: 'XS' },
                  { title: 'S', value: 'S' },
                  { title: 'M', value: 'M' },
                  { title: 'L', value: 'L' },
                  { title: 'XL', value: 'XL' },
                  { title: 'XXL', value: 'XXL' },
                ],
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'priceOverride',
              title: 'Price Override',
              type: 'number',
            }),
            defineField({
              name: 'sku',
              title: 'SKU',
              type: 'string',
              readOnly: true,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'defaultImage',
      categoryTitle: 'category.title',
    },
    prepare({ title, subtitle, media, categoryTitle }) {
      return {
        title,
        subtitle: categoryTitle ? `${subtitle} • ${categoryTitle}` : subtitle,
        media,
      }
    },
  },
})