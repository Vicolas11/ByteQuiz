import { sliceText } from "./slicetext.util";

export const shrinkTxt = (txt: string, width: number) => {
  return width <= 312
    ? sliceText(txt, 5)
    : width <= 360
    ? sliceText(txt, 10)
    : width < 412
    ? sliceText(txt, 15)
    : txt;
};
