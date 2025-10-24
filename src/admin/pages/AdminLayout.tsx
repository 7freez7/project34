import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ width: 220, padding: 20, borderRight: '1px solid #ddd' }}>
        <h3>Admin</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/aktuality">Aktuality</Link></li>
          <li><Link to="/admin/content">Editace textů</Link></li>
          <li><a onClick={() => { localStorage.removeItem('admin_token'); window.location.href = '/'; }}>Logout</a></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
