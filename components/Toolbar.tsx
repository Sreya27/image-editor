import React from "react";
import { FaSave, FaFileImport } from "react-icons/fa";

const filters = ["Blur", "Contrast", "Brightness", "Mask", "Pixelate", "Sepia"];

interface ToolbarProps {
    onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onPixelate: () => void;
    onDownload: () => void;
}

const Toolbar = ({ onUpload, onBlur, onPixelate ,onDownload }: ToolbarProps) => {
    return (
        <div id="tool-container" className="bg-gray-800 text-white flex items-center justify-between p-2 shadow-lg">
            <div className="flex items-center space-x-4">
                <button onClick={onDownload} className="flex items-center space-x-1 hover:text-gray-300">
                    <FaSave />
                </button>
                <label className="flex items-center space-x-1 hover:text-gray-300">
                    <FaFileImport />
                    <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                </label>
                <button onClick={onBlur} className="flex items-center space-x-1 hover:text-gray-300">
                    Blur
                </button>
                <button className="flex items-center space-x-1 hover:text-gray-300">
                    Sepia
                </button>
                <button onClick={onPixelate} className="flex items-center space-x-1 hover:text-gray-300">
                    Pixelate
                </button>
            </div>
        </div>
    );
}

export default Toolbar;