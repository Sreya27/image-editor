import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { UploadableImageProps } from "@/lib/types";
import {
  mapUserInputToBrightnessValue,
  mapUserInputToContrastValue,
  mapUserInputToSaturationValue,
} from "@/lib/utils";

const filters = [
  Konva.Filters.Blur,
  Konva.Filters.Brighten,
  Konva.Filters.Contrast,
  Konva.Filters.Pixelate,
  Konva.Filters.HSV,
];

const UploadableImage = ({
  imageUrl,
  isSelected,
  onSelect,
  onChange,
  filterValues,
  imageAttributes,
  flip
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

      node.scaleX(1); 
      node.scaleY(1); 

      onChange({
        x: xPos, //updating x position
        y: yPos, //updating y position
        width: node.width() * scaleX,
        height: node.height() * scaleY,
        rotation: node.rotation(),
      });
    }
  };

  useLayoutEffect(() => {
    if (imageRef.current) {
      imageRef.current.cache();
      imageRef.current.getLayer()?.batchDraw();
    }
  }, [imageAttributes ,image, isSelected, filterValues]);

  useEffect(() => {
    if(imageRef.current){
      const node = imageRef.current;
      node.offsetX(node.width()/2);
      node.offsetY(node.height()/2);
    }
  }, [image])

  return (
    <>
      <KonvaImage
        {...imageAttributes}
        image={image}
        draggable
        ref={imageRef}
        onClick={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTranformEnd}
        filters={filters}
        blurRadius={filterValues.blurRadius}
        brightness={mapUserInputToBrightnessValue(filterValues.brightness)}
        contrast={mapUserInputToContrastValue(filterValues.contrast)}
        pixelSize={filterValues.pixelSize}
        scaleX={flip.horizontal ? -1 : 1}
        scaleY={flip.vertical ? -1 : 1}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

export default UploadableImage;
