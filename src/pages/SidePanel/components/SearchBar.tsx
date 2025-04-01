import React from 'react';

interface Props {
  search: string;
  setSearch: (val: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-200"
      placeholder="URL 검색..."
    />
  );
}
