// src/components/CategoryTabs.tsx
import React from 'react';

const categories = ['전체', '개발', '운영', '보안'];

type Props = {
  selected: string;
  onSelect: (category: string) => void;
};

const CategoryTabs: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className="flex space-x-2 px-4 py-2 bg-white border-b border-gray-200">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 text-sm rounded ${
            selected === cat
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
