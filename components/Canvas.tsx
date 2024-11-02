import React, { useState, useRef } from "react";
import { Stage, Layer } from "react-konva";
import UploadableImage from "./UploadableImage";
import Konva from "konva";
import { downloadUri } from "@/lib/utils";
import FilterMenu from "./FilterMenu";
import Sidebar from "./Sidebar";
import { ImageAttributes } from "@/lib/types";
import { FilterValues } from "@/lib/types";


const Canvas = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [IsFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [horizontalFlip, setHorizontalFlip] = useState<boolean>(false);
  const [verticalFlip, setVerticalFlip] = useState<boolean>(false);
  const [imageAttributes, setImageAttributes] = useState<ImageAttributes>({
    x: 100,
    y: 100,
    width: 0,
    height: 0,
    rotation: 0,
  });
  const [filterValues, setFilterValues] = useState<FilterValues>({
    blurRadius: 0,
    contrast: 50,
    brightness: 50,
    pixelSize: 0,
    saturation: 50,
  });

  const handleFilterChange = (filterName: keyof FilterValues, value: number) => {
    setFilterValues(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

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
        x: 100,
        y: 100,
        width: 768,
        height: 512,
      };
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
  };

  const handleDownloadClick = () => {
    const dataUri = stageRef?.current?.toDataURL({ pixelRatio: 3 });
    downloadUri(dataUri, "image.png");
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <main className="flex-1 p-6" ref={containerRef}>
        <Stage
          ref={stageRef}
          width={window.innerWidth * 0.75}
          height={window.innerHeight * 0.9}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          className="bg-gray-800 rounded-lg"
        >
          <Layer>
            <UploadableImage
              imageUrl={imageUrl}
              isSelected={isSelected}
              onSelect={() => setIsSelected(true)}
              onChange={(attributes) => {
                setImageAttributes((oldAttributes) => {
                  const newImageAttributes = {
                    ...oldAttributes,
                    ...attributes,
                  };
                  return newImageAttributes;
                }); // Update image attributes
              }}
              filterValues={filterValues}
              imageAttributes={imageAttributes}
              flip={{horizontal: horizontalFlip, vertical: verticalFlip}}
            />
          </Layer>
        </Stage>
      </main>
      <aside>
        <Sidebar
          onUpload={handleUpload}
          onDownload={handleDownloadClick}
          toggleFilterMenu={() => setIsFilterMenuOpen((prevState) => !prevState)}
          toggleHorizontalFlip={() => setHorizontalFlip((prevState) => !prevState)}
          toggleVerticalFlip={() => setVerticalFlip((prevState) => !prevState)}
        />
      </aside>
      {IsFilterMenuOpen && <FilterMenu title="Filters" filters={filterValues} onFilterChange={handleFilterChange}/>}
    </div>
  );
};

export default Canvas;
