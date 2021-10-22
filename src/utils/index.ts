export const calculatePercentage = (percentage: number): string => {
  return (percentage * 100).toFixed(2) + "%";
};
export const randomHexColor = (): string =>
  Math.floor(Math.random() * 6777215).toString(16);

export const doesImageExist = (url: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
