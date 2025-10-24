import React, { useEffect, useState } from 'react';

type NewsItem = { id: string; title: string; text: string; date: string };

const ManageNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => { fetchNews(); }, []);
  async function fetchNews() {
    const res = await fetch('/api/news');
    const data = await res.json();
    setNews(data);
  }

  const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('admin_token')}` });

  async function add() {
    const res = await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ title, text })
    });
    if (res.ok) { setTitle(''); setText(''); fetchNews(); }
    else alert('Chyba při přidávání');
  }

  async function remove(id: string) {
    if (!confirm('Smazat aktualitu?')) return;
    const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE', headers: authHeaders() });
    if (res.ok) fetchNews();
  }

  return (
    <div>
      <h2>Správa aktualit</h2>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Titulek" value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <textarea placeholder="Text" value={text} onChange={e => setText(e.target.value)} />
        <br />
        <button onClick={add}>Přidat</button>
      </div>

      <ul>
        {news.map(n => (
          <li key={n.id} style={{ marginBottom: 10 }}>
            <strong>{n.title}</strong> — {new Date(n.date).toLocaleString()}
            <div>{n.text}</div>
            <button onClick={() => remove(n.id)}>Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageNews;
