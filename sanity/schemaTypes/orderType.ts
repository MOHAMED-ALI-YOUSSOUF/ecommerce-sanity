import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required().error("Order number is required."),
    }),
    defineField({
      name: "stripeCheckoutSessionsId",
      title: "Stripe Checkout Sessions ID",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required().error("Stripe customer ID is required."),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Customer name is required."),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .email()
          .error("Please provide a valid email address."),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required().error("Stripe payment intent ID is required."),
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) =>Rule.required().error("Order date is required."),
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "amount Discount",
      type: "number",
      validation: (Rule) => Rule.min(0) 
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Delivered", value: "delivered" },
          { title: "Shipped", value: "shipped" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule) => Rule.required().error("Order status is required."),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
              validation: (Rule) =>
                Rule.required()
                  .positive()
                  .error("Quantity must be a positive number."),
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              price: "product.price",
              image: "product.image",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `Total: $${(select.quantity * select.price).toFixed(2)}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview:{
    select:{
        name:"customerName",
        amount: "totalPrice",
        currency:"currency",
        orderId: "orderNumber",
        email:"email"
        
    },
    prepare(select){
        const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`
        return {
            title: `${select.name} (${orderIdSnippet})`,
            subtitle: `${select.amount} ${select.currency}, ${select.email}`,
            media: BasketIcon

        }
}}
});
