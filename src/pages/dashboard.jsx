import React from 'react';

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Selamat datang di dashboard aplikasi kebencanaan Gunung Merapi.</p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Informasi</h3>
        <ul className="list-disc list-inside mt-2">
          <li>Lihat data terbaru tentang aktivitas Gunung Merapi.</li>
          <li>Kelola data gunung dan data korban.</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;