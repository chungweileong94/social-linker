/**
 * Combine class names
 */
export const mixClassName = (
  ...classNames: (string | boolean | undefined)[]
) => {
  return classNames.filter((cn) => !!cn).join(' ');
};
