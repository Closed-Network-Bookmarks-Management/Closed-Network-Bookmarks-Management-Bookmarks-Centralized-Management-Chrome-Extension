// src/components/CopyButton.tsx
import React from 'react';

type Props = {
  url: string;
};

const CopyButton: React.FC<Props> = ({ url }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('복사되었습니다!');
    } catch (err) {
      alert('복사 실패');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
    >
      복사
    </button>
  );
};

export default CopyButton;
