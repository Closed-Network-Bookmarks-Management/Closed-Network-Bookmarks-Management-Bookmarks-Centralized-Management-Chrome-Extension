// src/components/URLList.tsx
import React from 'react';
import URLCard, { URLInfo } from './URLCard';

type Props = {
  urls: URLInfo[];
  onToggleFavorite: (id: string) => void;
};

const URLList: React.FC<Props> = ({ urls, onToggleFavorite }) => {
  if (urls.length === 0) {
    return <p className="text-center text-gray-500">URL이 없습니다.</p>;
  }

  return (
    <div className="space-y-3">
      {urls.map((url) => (
        <URLCard key={url.id} data={url} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
};

export default URLList;
