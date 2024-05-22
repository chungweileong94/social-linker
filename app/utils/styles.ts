import { twMerge } from "tailwind-merge";

/**
 * Concatenate CSS classes & sanitize tailwind classes
 */
export function cn(...classNames: (string | boolean | undefined)[]) {
  return twMerge(classNames.filter((className) => !!className).join(" "));
}

/**
 * Class variant mapper
 *
 * @description Map a variant value to a CSS class name
 */
export function cvm<TVariant extends string>(
  value: TVariant,
  variantClassMap: Record<TVariant, string>,
) {
  return variantClassMap[value];
}
