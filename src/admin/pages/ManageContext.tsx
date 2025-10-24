import React, { useEffect, useState } from 'react';

const ManageContent: React.FC = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [value, setValue] = useState('');

  useEffect(() => { (async () => {
    const res = await fetch('/api/content');
    const data = await res.json();
    setContent(data);
    const keys = Object.keys(data);
    if (keys.length > 0) { setSelectedKey(keys[0]); setValue(data[keys[0]]); }
  })(); }, []);

  const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('admin_token')}` });

  useEffect(() => {
    if (selectedKey) setValue(content[selectedKey] || '');
  }, [selectedKey, content]);

  async function save() {
    const res = await fetch(`/api/admin/content/${selectedKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ value })
    });
    if (res.ok) {
      const copy = { ...content, [selectedKey]: value };
      setContent(copy);
      alert('Uloženo');
    } else alert('Chyba');
  }

  return (
    <div>
      <h2>Editace textů</h2>
      <select value={selectedKey} onChange={e => setSelectedKey(e.target.value)}>
        {Object.keys(content).map(k => <option key={k} value={k}>{k}</option>)}
      </select>
      <div>
        <textarea style={{ width: '100%', minHeight: 200 }} value={value} onChange={e => setValue(e.target.value)} />
      </div>
      <button onClick={save}>Uložit</button>
    </div>
  );
};

export default ManageContent;
