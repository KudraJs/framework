export const defineState = <T>(state: T) => {
  return () => state;
};
