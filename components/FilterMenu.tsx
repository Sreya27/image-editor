import { FilterValues } from "@/lib/types";
import React from "react";

interface FilterMenuProps {
  title: string;
  filters: FilterValues;
  onFilterChange: (filterName: keyof FilterValues, value: number) => void
}

const FilterMenu = ({ title, filters, onFilterChange}: FilterMenuProps) => {

  return (
    <div className="absolute right-20 top-0 w-64 rounded-lg bg-gray-800 p-4 shadow-lg z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {Object.entries(filters).map(([filter, value]) => (
          <div key={filter} className="space-y-2">
            <label className="text-sm text-gray-300 capitalize block">
              {filter}
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              defaultValue={value}
              value={value}
              onChange={(e) =>
                onFilterChange(
                  filter as keyof FilterValues,
                  parseFloat(e.target.value)
                )
              }
              className="w-full bg-gray-700 appearance-none h-2 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterMenu;