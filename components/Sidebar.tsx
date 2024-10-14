import React from "react";
import { useState } from "react"
import { FaSave, FaFileImport, FaSlidersH } from "react-icons/fa";

interface SidebarProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onBlur: () => void;
  // onPixelate: () => void;
  onDownload: () => void;
  toggleFilterMenu: () => void;
}

const Sidebar = ({
  onUpload,
  // onBlur,
  // onPixelate,
  onDownload,
  toggleFilterMenu
}: SidebarProps) => {
  
  return (
    <div className="w-20 bg-gray-800 p-4 flex flex-col items-center space-y-4">
      <button
        onClick={onDownload}
        className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 flex items-center justify-center"
        title="Save Image"
      >
        <FaSave />
      </button>
      <label className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 flex items-center justify-center">
        <FaFileImport />
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="hidden"
        />
      </label>
      <button
        onClick={toggleFilterMenu}
        className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 flex items-center justify-center"
        title="Save Image"
      >
        <FaSlidersH />
      </button>
      {/* <button
        onClick={onBlur}
        className="flex items-center space-x-1 hover:text-gray-300"
      >
        Blur
      </button>
      <button className="flex items-center space-x-1 hover:text-gray-300">
        Sepia
      </button>
      <button
        onClick={onPixelate}
        className="flex items-center space-x-1 hover:text-gray-300"
      >
        Pixelate
      </button> */}
    </div>
  );
};

export default Sidebar;
