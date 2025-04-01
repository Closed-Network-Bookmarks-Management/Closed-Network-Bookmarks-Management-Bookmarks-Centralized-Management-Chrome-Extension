// src/components/FavoriteToggle.tsx
import React from 'react';

type Props = {
  isFavorite: boolean;
  onClick: () => void;
};

const FavoriteToggle: React.FC<Props> = ({ isFavorite, onClick }) => {
  return (
    <button onClick={onClick} title="즐겨찾기">
      {isFavorite ? '⭐' : '☆'}
    </button>
  );
};

export default FavoriteToggle;
