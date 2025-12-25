import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import "../css/NGODashboard.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const NGODashboard = () => {
  const [stats, setStats] = useState({});
  const [donations, setDonations] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [customOrder, setCustomOrder] = useState({
    restaurantId: '',
    foodItems: [],
    quantity: 1,
    notes: ''
  });
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // MOCK DATA — replace with API later
    setStats({
      totalMealsReceived: 3200,
      totalKgReceived: 1200,
      activeRestaurants: 8,
      pendingPickups: 2
    });

    setDonations([
      {
        _id: "d1",
        date: "2025-11-10T14:30:00Z",
        restaurantName: "Green Garden Bakery",
        foodItems: [
          { name: "Bread", image: "https://via.placeholder.com/60?text=Bread", quantity: 12 },
          { name: "Pastries", image: "https://via.placeholder.com/60?text=Pastry", quantity: 8 }
        ],
        totalKg: 12,
        status: "completed"
      },
      {
        _id: "d2",
        date: "2025-11-08T10:00:00Z",
        restaurantName: "Downtown Diner",
        foodItems: [
          { name: "Rice", image: "https://via.placeholder.com/60?text=Rice", quantity: 5 },
          { name: "Chicken", image: "https://via.placeholder.com/60?text=Chicken", quantity: 3 }
        ],
        totalKg: 8,
        status: "completed"
      }
    ]);

    setPendingOrders([
      {
        _id: "p1",
        restaurantName: "Green Garden Bakery",
        foodItems: [
          { name: "Bread", image: "https://via.placeholder.com/60?text=Bread", quantity: 10, expires: "2025-11-12" }
        ],
        pickupBy: "2025-11-12T18:00:00Z",
        notes: "Left at back door"
      },
      {
        _id: "p2",
        restaurantName: "Sunny Cafe",
        foodItems: [
          { name: "Salads", image: "https://via.placeholder.com/60?text=Salad", quantity: 6, expires: "2025-11-11" }
        ],
        pickupBy: "2025-11-11T17:00:00Z",
        notes: "Call before pickup"
      }
    ]);

    setLoading(false);
  };

  const handleCustomOrderSubmit = async (e) => {
    e.preventDefault();
    alert(`✅ Custom order submitted to ${customOrder.restaurantId} for ${customOrder.quantity} units.`);
    // Later: POST to /api/ngo/order
    setCustomOrder({ restaurantId: '', foodItems: [], quantity: 1, notes: '' });
  };

  const handlePickup = async (orderId) => {
    alert(`✅ Pickup confirmed for order #${orderId}`);
    // Later: PATCH /api/ngo/pickup/${orderId}
  };

  if (loading) return <div className="ngo-loading">Loading dashboard...</div>;

  return (
    <div className="ngo-dashboard">
      {/* Header */}
      <header className="ngo-header">
        <h1>Hi, Hope Food Bank 👋</h1>
        <div className="ngo-stats">
          <span>{stats.pendingPickups} Pending Pickups</span>
          <button className="btn-primary" onClick={() => document.getElementById('customOrderModal').style.display = 'block'}>
            + Request Custom Order
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-row">
        <StatCard title="Total Meals Received" value={stats.totalMealsReceived} icon="🍲" />
        <StatCard title="Food Saved" value={`${stats.totalKgReceived} kg`} icon="♻️" />
        <StatCard title="Active Restaurants" value={stats.activeRestaurants} icon="🏢" />
        <StatCard title="Pending Pickups" value={stats.pendingPickups} icon="⏳" variant="warning" />
      </div>

      {/* Charts */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Monthly Donations (kg)</h3>
          <Bar
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Food Received (kg)',
                data: [800, 950, 1200, 1400, 1600, 1800],
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#38e07b',
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-dark').trim() || '#2bc066',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>
      </div>

      {/* Pending Orders Section */}
      <section className="pending-orders">
        <h2>⏳ Pending Pickups ({pendingOrders.length})</h2>
        {pendingOrders.length === 0 ? (
          <div className="empty-state">✅ No pending pickups!</div>
        ) : (
          <div className="order-list">
            {pendingOrders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <strong>{order.restaurantName}</strong>
                  <span className="order-date">
                    Pickup by: {new Date(order.pickupBy).toLocaleString()}
                  </span>
                </div>
                <div className="food-items">
                  {order.foodItems.map(item => (
                    <div key={item.name} className="food-item">
                      <img src={item.image} alt={item.name} className="food-image" />
                      <div>
                        <strong>{item.name}</strong> × {item.quantity}
                        <br />
                        <small>Expires: {new Date(item.expires).toLocaleDateString()}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-actions">
                  <button className="btn-pickup" onClick={() => handlePickup(order._id)}>
                    ✅ Confirm Pickup
                  </button>
                  <button className="btn-notes">📝 Notes: {order.notes}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Donation History */}
      <section className="donation-history">
        <h2>📦 Donation History</h2>
        <div className="donation-table-wrapper">
          <table className="donation-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Restaurant</th>
                <th>Food Items</th>
                <th>Total (kg)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation._id}>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                  <td>{donation.restaurantName}</td>
                  <td>
                    <div className="food-preview">
                      {donation.foodItems.slice(0, 2).map(item => (
                        <img key={item.name} src={item.image} alt={item.name} className="food-thumb" />
                      ))}
                      {donation.foodItems.length > 2 && (
                        <span>+{donation.foodItems.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td>{donation.totalKg} kg</td>
                  <td>
                    <span className={`status-badge status-${donation.status}`}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="export-buttons">
          <button className="btn-export">📥 Export CSV</button>
          <button className="btn-export">🖨️ Print Report</button>
        </div>
      </section>

      {/* Custom Order Modal */}
      <div id="customOrderModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => document.getElementById('customOrderModal').style.display = 'none'}>&times;</span>
          <h2>➕ Request Custom Order</h2>
          <form onSubmit={handleCustomOrderSubmit}>
            <div className="form-group">
              <label>Restaurant</label>
              <select
                value={customOrder.restaurantId}
                onChange={(e) => setCustomOrder(prev => ({ ...prev, restaurantId: e.target.value }))}
                required
              >
                <option value="">Select Restaurant</option>
                <option value="green-garden">Green Garden Bakery</option>
                <option value="downtown-diner">Downtown Diner</option>
                <option value="sunny-cafe">Sunny Cafe</option>
              </select>
            </div>

            <div className="form-group">
              <label>Food Item</label>
              <select
                onChange={(e) => {
                  const item = e.target.value;
                  setCustomOrder(prev => ({
                    ...prev,
                    foodItems: [...prev.foodItems, item]
                  }));
                }}
              >
                <option value="">Add Food Item</option>
                <option value="bread">Bread</option>
                <option value="rice">Rice</option>
                <option value="chicken">Chicken</option>
                <option value="salad">Salad</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={customOrder.quantity}
                onChange={(e) => setCustomOrder(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
              />
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                value={customOrder.notes}
                onChange={(e) => setCustomOrder(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="e.g., Prefer morning pickup, call before arriving..."
              />
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn-primary">Submit Request</button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => document.getElementById('customOrderModal').style.display = 'none'}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

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

export default NGODashboard;