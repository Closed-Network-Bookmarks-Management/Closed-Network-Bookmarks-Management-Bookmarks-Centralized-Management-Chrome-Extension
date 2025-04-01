import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../../components/Header';
import CategoryTabs from '../../components/CategoryTabs';
import URLList from '../../components/URLList';
import { URLInfo } from '../../components/URLCard';
import { getStorage, setStorage } from '../../utils/storage';

const Sidepanel = () => {
  const [urls, setUrls] = useState<URLInfo[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');

  useEffect(() => {
    // 초기 데이터 로딩 (임시: 추후 API 또는 storage 연동)
    const fetchData = async () => {
      const saved = await getStorage<URLInfo[]>('urls');
      setUrls(
        saved ?? [
          { id: '1', title: '개발서버', url: 'https://dev.example.com', category: '개발', isFavorite: true },
          { id: '2', title: '운영서버', url: 'https://prod.example.com', category: '운영', isFavorite: false },
        ]
      );
    };
    fetchData();
  }, []);

  const filtered = urls.filter(
    (u) =>
      (category === '전체' || u.category === category) &&
      (u.title.includes(search) || u.url.includes(search))
  );

  const toggleFavorite = (id: string) => {
    const updated = urls.map((u) =>
      u.id === id ? { ...u, isFavorite: !u.isFavorite } : u
    );
    setUrls(updated);
    setStorage('urls', updated);
  };

  return (
    <div className="w-[400px] h-screen bg-gray-50 text-sm">
      <Header onSearch={setSearch} />
      <CategoryTabs selected={category} onSelect={setCategory} />
      <div className="p-4 space-y-2">
        <URLList urls={filtered} onToggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Sidepanel />);
