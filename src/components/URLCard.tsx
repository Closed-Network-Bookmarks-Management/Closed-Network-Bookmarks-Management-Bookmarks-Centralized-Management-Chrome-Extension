// src/components/URLCard.tsx
import React from 'react';
import CopyButton from './CopyButton';
import FavoriteToggle from './FavoriteToggle';

export interface URLInfo {
  id: string;
  title: string;
  url: string;
  category: string;
  isFavorite: boolean;
}

type Props = {
  data: URLInfo;
  onToggleFavorite: (id: string) => void;
};

const URLCard: React.FC<Props> = ({ data, onToggleFavorite }) => {
  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <h2 className="text-md font-semibold">{data.title}</h2>
        <p className="text-sm text-blue-600">{data.url}</p>
      </div>
      <div className="flex items-center space-x-2">
        <CopyButton url={data.url} />
        <FavoriteToggle
          isFavorite={data.isFavorite}
          onClick={() => onToggleFavorite(data.id)}
        />
      </div>
    </div>
  );
};

export default URLCard;
