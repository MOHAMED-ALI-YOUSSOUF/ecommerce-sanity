import {  TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType( {
    name: 'product',
    title: 'Product ',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule) => Rule.required()

        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name', // Génère automatiquement le slug à partir du champ "name"
              maxLength: 96,
            },
            }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                  hotspot: true
                  }                   
                      
              }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
            }),
        defineField({
                name: 'price',
                title: 'Product Price',
                type: 'number',
                validation: (Rule) => Rule.required()
                }),
   
        defineField({
          name: 'categories',
          title: 'Product Categories',
          type: 'array',
          of:[{ type:"reference", to:{ type:"category"}}]                   
                    
            }),
            defineField({
                name: 'stock',
                title: 'Product Stock',
                type: 'number',
                validation: (Rule) => Rule.required()
                }),


    ],
    preview:{
        select:{
            title: 'name',
            subtitle: 'price',
            media: 'image'
        },
        prepare(select){
            return {
                title: select.title,
                subtitle: `$${select.subtitle}`,
                media: select.media

            }
    }}
})