const sizes = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const screen = {
  sm: `@media (min-width: ${sizes.sm})`,
  md: `@media (min-width: ${sizes.md})`,
  lg: `@media (min-width: ${sizes.lg})`,
  xl: `@media (min-width: ${sizes.xl})`,
  max: `${sizes.xl}`,
};
