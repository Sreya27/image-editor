import React, { useRef, useEffect } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

interface UploadableImageProps {
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
  imageFilters: {
    blurRadius: number;
    contrast: number | null;
    brightness: number | null;
    maskThreshold: number | null;
    pixelSize: number | null;
    sepia: boolean;
  }
}

const UploadableImage = ({
  imageUrl,
  isSelected,
  onSelect,
  onChange,
  imageFilters
}: UploadableImageProps) => {
  const [image] = useImage(imageUrl || "");
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && imageRef.current && transformerRef.current) {
      transformerRef.current.nodes([imageRef.current]); //Attach transformer to the image is selected
      transformerRef.current.getLayer()?.batchDraw(); //Re-draw layer to show transformer
    }
  }, [isSelected]); //Trasnformer gets attached and layer is redrawn whenever isSelected changes

  //Function to update new position after dragging
  const handleDragEnd = (event: any) => {
    onChange({
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  //Function to update new size and rotation after tranformation
  const handleTranformEnd = (event: any) => {
    const node = imageRef.current;
    if (node) {
      const scaleX = node.scaleX(); //get current scaleX after transformation
      const scaleY = node.scaleY(); //get current scaleY after transformation
      const xPos = node.x(); //get current x position after tranformation
      const yPos = node.y(); //get current y position after transformation

      node.scaleX(1); //reset scaleX
      node.scaleY(1); //reset scaleY

      onChange({
        x: xPos, //updating x position
        y: yPos, //updating y position
        width: node.width() * scaleX, 
        height: node.height() * scaleY,
        rotation: node.rotation(),
      });
    }
  };

  useEffect(() => {
    if (imageRef.current) {
        imageRef.current.cache();
        imageRef.current.filters([Konva.Filters.Blur]);
        imageRef.current.blurRadius(imageFilters.blurRadius);
        imageRef.current.getLayer()?.batchDraw();
      }
  }, [imageFilters.blurRadius])

  return (
    <>
      <KonvaImage
        image={image}
        draggable
        ref={imageRef}
        onClick={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTranformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          flipEnabled={false}
        />
      )}
    </>
  );
};

export default UploadableImage;
