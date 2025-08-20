// ./schemas/category.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty if this is a top-level category',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
  name: 'order',
  title: 'Order',
  type: 'number',
  description: 'Lower numbers appear first',
  initialValue: 0,
}),
  ],
  preview: {
    select: {
      title: 'title',
      parent: 'parent.title',
      order: 'order',
    },
    prepare({ title, parent, order }) {
      return {
        title,
        subtitle: parent ? `Child of ${parent} (Order: ${order})` : `Top-level (Order: ${order})`,
      }
    },
  },
})