// src/components/Header.tsx
import React from 'react';

type Props = {
  onSearch: (query: string) => void;
};

const Header: React.FC<Props> = ({ onSearch }) => {
  return (
    <header className="p-4 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
      <h1 className="text-xl font-bold">UCloud URL 관리자</h1>
      <input
        type="text"
        placeholder="검색어 입력..."
        className="px-3 py-1 border rounded w-60"
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
};

export default Header;
