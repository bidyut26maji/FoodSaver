import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import "../css/AdminDashboard.css";
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

  const fetchData = () => {
    // MOCK DATA (temporary)
    setStats({
      totalOrgs: 20,
      totalKg: 1200,
      meals: 3200,
      activePartnerships: 14,
    });

    setPendingOrgs([
      {
        _id: "1",
        organizationName: "Test Restaurant",
        organizationType: "restaurant",
        contactPerson: "John Doe",
        email: "john@test.com",
        status: "pending",
      }
    ]);

    setDonationLogs([
      {
        _id: "log1",
        date: "2025-11-10T14:30:00Z",
        restaurantName: "Test Restaurant",
        ngoName: "Hope NGO",
        weightKg: 12,
        status: "completed"
      }
    ]);

    setLoading(false);
  };

  // 📊 Mock chart data
  const impactData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Food Saved (kg)',
      data: [1200, 1900, 2400, 3100, 4500, 5200],
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#38e07b',
      borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-dark').trim() || '#2bc066',
      borderWidth: 1
    }]
  };

  const orgTypeData = {
    labels: ['Restaurants', 'NGOs', 'Caterers', 'Bakeries'],
    datasets: [{
      data: [42, 28, 12, 8],
      backgroundColor: [
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#38e07b',
        getComputedStyle(document.documentElement).getPropertyValue('--text-tertiary').trim() || '#51946c',
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary-hover').trim() || '#94e0b2',
        getComputedStyle(document.documentElement).getPropertyValue('--color-primary-light').trim() || '#7bcc9b'
      ]
    }]
  };

  const handleApprove = async (id) => {
    await fetch(`/api/admin/approve/${id}`, { method: 'PATCH' });
    fetchData(); // refresh
  };

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      {/* 🔔 Top Header */}
      <header className="admin-header">
        <div className="header-left">
          <h1>FoodSaver Admin</h1>
          {pendingOrgs.length > 0 && (
            <span className="badge">{pendingOrgs.length} pending</span>
          )}
        </div>
        <nav className="header-nav">
          <button className="btn-export">📥 Export NGO Sheet</button>
          <button className="btn-export">📥 Export Restaurant Sheet</button>
          <button className="btn-primary">+ Add Manual Donation</button>
        </nav>
      </header>

      {/* 📊 Stats Cards Row */}
      <div className="stats-row">
        <StatCard
          title="Total Organizations"
          value={stats.totalOrgs || 0}
          icon="🏢"
          variant="primary"
        />
        <StatCard
          title="Food Saved"
          value={`${(stats.totalKg || 0).toLocaleString()} kg`}
          icon="♻️"
          variant="success"
        />
        <StatCard
          title="Meals Distributed"
          value={`${(stats.meals || 0).toLocaleString()}`}
          icon="🍲"
          variant="info"
        />
        <StatCard
          title="Active Partnerships"
          value={stats.activePartnerships || 0}
          icon="🤝"
          variant="secondary"
        />
      </div>

      {/* 📈 Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Monthly Impact</h3>
          <Bar
            data={impactData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (ctx) => `${ctx.raw} kg` } }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>
        <div className="chart-card">
          <h3>Org Type Distribution</h3>
          <Pie
            data={orgTypeData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}` } }
              }
            }}
          />
        </div>
      </div>

      {/* 🆕 Pending Approvals */}
      <section className="pending-section">
        <h2>🆕 Pending Approvals ({pendingOrgs.length})</h2>
        {pendingOrgs.length === 0 ? (
          <div className="empty-state">
            ✅ All organizations approved!
          </div>
        ) : (
          <div className="pending-list">
            {pendingOrgs.map(org => (
              <div key={org._id} className="pending-item">
                <div className="org-info">
                  <strong>{org.organizationName}</strong> • {org.organizationType}
                  <br />
                  <small>{org.contactPerson} • {org.email}</small>
                </div>
                <div className="org-actions">
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
        <div className="logs-table-wrapper">
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
        </div>
      </section>
    </div>
  );
};

// 🔲 Reusable Stat Card
const StatCard = ({ title, value, icon, variant = "primary" }) => (
  <div className={`stat-card stat-card-${variant}`}>
    <div className={`stat-icon stat-icon-${variant}`}>
      {icon}
    </div>
    <div>
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
    </div>
  </div>
);

export default AdminDashboard;