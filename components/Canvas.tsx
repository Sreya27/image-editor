import React, { useState, useRef } from "react";
import { Stage, Layer } from "react-konva";
import UploadableImage from "./UploadableImage";
import Konva from "konva";
import { downloadUri } from "@/utils";
import Toolbar from "./Toolbar";

interface imageAttributes {
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation?: number;
}

interface imageFilters {
    blurRadius: number;
    contrast: number | null;
    brightness: number | null;
    maskThreshold: number | null;
    pixelSize: number | null;
    sepia: boolean;
}

const Canvas = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [imageAttributes, setImageAttributes] = useState<imageAttributes>({
    x: 100,
    y: 100,
    width: undefined,
    height: undefined,
    rotation: undefined,
  });
  const [imageFilters, setImageFilters] = useState<imageFilters>({
    blurRadius: 0,
    contrast: null,
    brightness: null,
    maskThreshold: null,
    pixelSize: null,
    sepia: false,
  })

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file from input
    if (file) {
        //Revoke the previous object URL if it exists
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        const newImageUrl = URL.createObjectURL(file);
        const newImageAttributes = {
            imageUrl: newImageUrl,
            x: 10,
            y: 10,
            width: 512,
            height: 512,
        }
        setImageUrl(newImageUrl);
        setImageAttributes(newImageAttributes);
    }
  };

  const checkDeselect = (event: any) => {
    //deselect when clicked on empty area
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) {
        setIsSelected(false);
    }
  }

  const handleChangeAttributes = (attributes: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    rotation?: number;
  }) => {
    setImageAttributes((oldAttributes) => {
        const newImageAttributes = {...oldAttributes, ...attributes};
        return newImageAttributes;
    }); // Update image attributes
  }

  const handleBlurClick = () => {
    setImageFilters((oldFilters) => {
        const newFilters = { ...oldFilters, blurRadius: oldFilters.blurRadius===0 ? 10 : 0 };
        return newFilters;
    })
  }

  const handleDownloadClick = () => {
    const dataUri = stageRef?.current?.toDataURL({pixelRatio: 3});
    downloadUri(dataUri, "image.png");
  }

  return (
    <div className="bg-gray-100">
        <Toolbar 
            onUpload={handleUpload}
            onBlur={handleBlurClick}
            onDownload={handleDownloadClick}
        />
      <Stage 
        ref={stageRef}
        width={768} 
        height={512}
        x={100}
        y={100}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        >
        <Layer>
          <UploadableImage 
            imageUrl={imageUrl} 
            isSelected={isSelected}
            onSelect={() => setIsSelected(true)} 
            onChange={handleChangeAttributes}
            imageFilters={imageFilters}
        />
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
