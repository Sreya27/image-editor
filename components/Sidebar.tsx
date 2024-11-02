import React from "react";
import { useState } from "react";
import { FaSave, FaFileImport, FaSlidersH } from "react-icons/fa";
import { CgEditFlipV, CgEditFlipH } from "react-icons/cg";

interface SidebarProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  toggleFilterMenu: () => void;
  toggleVerticalFlip: () => void;
  toggleHorizontalFlip: () => void;
}

const Sidebar = ({ onUpload, onDownload, toggleFilterMenu, toggleHorizontalFlip, toggleVerticalFlip }: SidebarProps) => {
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
      <button
        onClick={toggleVerticalFlip}
        className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 flex items-center justify-center"
        title="Vertical flip"
      >
        <CgEditFlipV />
        <CgEditFlipV />
      </button>
      <button
        onClick={toggleHorizontalFlip}
        className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 flex items-center justify-center"
        title="Horizontal flip"
      >
        <CgEditFlipH />
      </button>
        <CgEditFlipH />
      </button>
    </div>
  );
};

export default Sidebar;
