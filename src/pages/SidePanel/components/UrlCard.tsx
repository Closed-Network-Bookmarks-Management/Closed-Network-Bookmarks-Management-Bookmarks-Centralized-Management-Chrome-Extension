import React, { useEffect, useState } from 'react';

// ⭐ 1. Props 타입 정의
interface Props {
  id: number;
  name: string;
  url: string;
  category: string;
}

// ⭐ 2. 즐겨찾기 저장 키 (chrome.storage.local)
const STORAGE_KEY = 'bookmarkedUrls';

const UrlCard: React.FC<Props> = ({ id, name, url, category }) => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // ⭐ 3. 마운트 시 즐겨찾기 여부 확인
  useEffect(() => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const saved: number[] = result[STORAGE_KEY] || [];
      setBookmarked(saved.includes(id));
    });
  }, [id]);

  // ⭐ 4. 즐겨찾기 토글 핸들러
  const toggleBookmark = () => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const saved: number[] = result[STORAGE_KEY] || [];
      let updated: number[];

      if (saved.includes(id)) {
        updated = saved.filter(item => item !== id);
        setBookmarked(false);
      } else {
        updated = [...saved, id];
        setBookmarked(true);
      }

      chrome.storage.local.set({ [STORAGE_KEY]: updated });
    });
  };

  // ⭐ 5. 복사 핸들러
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL이 복사되었습니다!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`복사 실패: ${err.message}`);
      } else {
        alert('복사 실패: 알 수 없는 오류');
      }
    }
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg shadow-sm bg-white relative">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-gray-600 break-all mt-1">{url}</div>
          <div className="text-[10px] text-gray-400 mt-1">[{category}]</div>
        </div>

        {/* ⭐ 즐겨찾기 버튼 */}
        <button
          onClick={toggleBookmark}
          className="ml-2 text-yellow-500 hover:opacity-80"
          title="즐겨찾기 토글"
        >
          {bookmarked ? '★' : '☆'}
        </button>
      </div>

      {/* ⭐ 복사 버튼 */}
      <button
        onClick={handleCopy}
        className="mt-2 text-xs text-blue-600 hover:underline"
      >
        복사
      </button>
    </div>
  );
};

export default UrlCard;
