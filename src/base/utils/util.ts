export const isFirst = (index: number) => {
  return index === 0;
};

export const getUniqueArray = (data: any[]) => {
  return [...new Set(data)];
};
