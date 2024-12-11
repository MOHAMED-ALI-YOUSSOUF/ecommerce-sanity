import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).warning("A title is required."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.max(200).warning("Keep the description under 200 characters."),
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount off in percentage or fixed value",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .warning("Discount should be between 1% and 100%."),
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .warning("Coupon code should be at least 3 characters long."),
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().warning("Specify when the sale starts."),
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "datetime",
      validation: (Rule) =>
        Rule.required()
          .min(Rule.valueOfField("validFrom"))
          .warning("Valid until date must be after the start date."),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Toggle to activate/deactivate the sale.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, discountAmount, couponCode, isActive } = selection;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      };
    },
  },
});
