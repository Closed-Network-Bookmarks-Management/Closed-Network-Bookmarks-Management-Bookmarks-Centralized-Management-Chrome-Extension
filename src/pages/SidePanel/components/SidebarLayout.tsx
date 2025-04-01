import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import UrlCard from './UrlCard';

type UrlItem = {
  id: number;
  name: string;
  url: string;
  category: string;
};

export default function SidebarLayout() {
  const [search, setSearch] = useState('');
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [filtered, setFiltered] = useState<UrlItem[]>([]);

  useEffect(() => {
    const data: UrlItem[] = [
      { id: 1, name: 'GitLab', url: 'http://gitlab.local', category: '개발' },
      { id: 2, name: 'Jenkins', url: 'http://jenkins.local', category: '배포' },
      { id: 3, name: 'Grafana', url: 'http://grafana.local', category: '모니터링' }
    ];
    setUrls(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    const result = urls.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.url.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, urls]);

  return (
    <div className="p-3">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mt-4 flex flex-col gap-3">
        {filtered.map(item => (
          <UrlCard key={item.id} name={item.name} url={item.url} />
        ))}
        {filtered.length === 0 && <div className="text-sm text-gray-400">검색 결과 없음</div>}
      </div>
    </div>
  );
}
