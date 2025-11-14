import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [pendingOrgs, setPendingOrgs] = useState([]);
  const [donationLogs, setDonationLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, pendingRes, logsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/pending'),
        fetch('/api/admin/logs?limit=10')
      ]);
      setStats(await statsRes.json());
      setPendingOrgs(await pendingRes.json());
      setDonationLogs(await logsRes.json());
      setLoading(false);
    } catch (err) {
      console.error('Failed to load admin data');
    }
  };

  // 📊 Mock chart data (replace with API)
  const impactData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Food Saved (kg)',
      data: [1200, 1900, 2400, 3100, 4500, 5200],
      backgroundColor: '#38e07b',
      borderColor: '#2bc066',
      borderWidth: 1
    }]
  };

  const orgTypeData = {
    labels: ['Restaurants', 'NGOs', 'Caterers', 'Bakeries'],
    datasets: [{
      data: [42, 28, 12, 8],
      backgroundColor: ['#38e07b', '#51946c', '#94e0b2', '#7bcc9b']
    }]
  };

  const handleApprove = async (id) => {
    await fetch(`/api/admin/approve/${id}`, { method: 'PATCH' });
    fetchData(); // refresh
  };

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      {/* 🔔 Top Bar */}
      <header className="admin-header">
        <h1>FoodSaver Admin</h1>
        <div className="notifications">
          {pendingOrgs.length > 0 && (
            <span className="badge">{pendingOrgs.length} pending</span>
          )}
        </div>
      </header>

      {/* 📊 Stats Cards */}
      <div className="stats-grid">
        <StatCard title="Total Organizations" value={stats.totalOrgs || 86} icon="🏢" />
        <StatCard title="Food Saved" value={`${(stats.totalKg || 28500).toLocaleString()} kg`} icon="♻️" />
        <StatCard title="Meals Distributed" value={`${(stats.meals || 71250).toLocaleString()}`} icon="🍲" />
        <StatCard title="Active Partnerships" value={stats.activePartnerships || 34} icon="🤝" />
      </div>

      {/* 📈 Charts Row */}
      <div className="charts-row">
        <div className="chart-card">
          <h3>Monthly Impact</h3>
          <Bar data={impactData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="chart-card">
          <h3>Org Type Distribution</h3>
          <Pie data={orgTypeData} options={{ responsive: true }} />
        </div>
      </div>

      {/* 🆕 Pending Approvals */}
      <section className="pending-section">
        <h2>🆕 Pending Approvals ({pendingOrgs.length})</h2>
        {pendingOrgs.length === 0 ? (
          <p className="no-pending">✅ All organizations approved!</p>
        ) : (
          <div className="pending-list">
            {pendingOrgs.map(org => (
              <div key={org._id} className="pending-item">
                <div>
                  <strong>{org.organizationName}</strong> • {org.organizationType}
                  <br />
                  <small>{org.contactPerson} • {org.email}</small>
                </div>
                <div>
                  <button 
                    className="btn-approve"
                    onClick={() => handleApprove(org._id)}
                  >
                    ✅ Approve
                  </button>
                  <button className="btn-reject">❌ Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 📦 Recent Activity */}
      <section className="logs-section">
        <h2>📦 Recent Donations</h2>
        <table className="logs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Restaurant</th>
              <th>NGO</th>
              <th>Food (kg)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donationLogs.map(log => (
              <tr key={log._id}>
                <td>{new Date(log.date).toLocaleDateString()}</td>
                <td>{log.restaurantName}</td>
                <td>{log.ngoName}</td>
                <td>{log.weightKg} kg</td>
                <td>
                  <span className={`status-badge status-${log.status}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 📥 Export & Actions */}
      <div className="admin-actions">
        <button className="btn-export">📥 Export NGO Sheet (CSV)</button>
        <button className="btn-export">📥 Export Restaurant Sheet (CSV)</button>
        <button className="btn-primary">+ Add Manual Donation</button>
      </div>
    </div>
  );
};

// 🔲 Reusable Stat Card
const StatCard = ({ title, value, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div>
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
    </div>
  </div>
);

export default AdminDashboard;