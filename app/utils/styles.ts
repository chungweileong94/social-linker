/**
 * Combine class names
 */
export const mixClassName = (
  ...classNames: (string | boolean | undefined)[]
) => {
  return classNames.filter((cn) => !!cn).join(' ');
};

/**
 * Map value to class name
 */
export const classNameMapper = <TValue extends string>(
  value: TValue,
  classNameMap: Record<TValue, string>,
) => {
  return classNameMap[value];
};
