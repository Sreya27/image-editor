export interface UploadableImageProps {
  imageUrl: string | null;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (attributes: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation?: number;
  }) => void;
  filterValues: FilterValues;
  imageAttributes: any;
}

export interface ImageAttributes {
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
}

export interface FilterValues {
    blurRadius: number; //integer
    contrast: number; //value between -100 and 100
    brightness: number; //value between -1 and 1
    pixelSize: number; //integer
    saturation: number; //0 is no change. -1.0 halves the saturation and 1.0 doubles it
}
