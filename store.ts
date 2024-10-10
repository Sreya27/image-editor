import { create } from "zustand";

export const useStore = create((set) => ({
    width: window.innerWidth,
    height: window.innerHeight,
    setSize: (width: number, height: number ) => set(() => ({ width, height })),

    imageWidth: 0,
    imageHeight: 0,
    setimageSize: (width: number, height: number ) => set(() => ({imageWidth: width, imageheight: height})),

    blur: 0,
    setBlur: (blurRadius: number) => set(() => ({blur: blurRadius})),
}));
