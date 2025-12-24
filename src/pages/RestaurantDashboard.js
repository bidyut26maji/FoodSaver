// src/pages/RestaurantDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/RestaurantDashboard.css';

const RestaurantDashboard = () => {
  // === STATE ===
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', available: true });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // === INIT & PERSISTENCE ===
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedOrders = JSON.parse(localStorage.getItem('foodSaver_orders')) || generateDemoOrders();
    const savedMenu = JSON.parse(localStorage.getItem('foodSaver_menu')) || generateDemoMenu();
    const savedSales = JSON.parse(localStorage.getItem('foodSaver_sales')) || generateDemoSales();
    setOrders(savedOrders);
    setMenuItems(savedMenu);
    setSalesData(savedSales);
  };

  const saveData = () => {
    localStorage.setItem('foodSaver_orders', JSON.stringify(orders));
    localStorage.setItem('foodSaver_menu', JSON.stringify(menuItems));
    localStorage.setItem('foodSaver_sales', JSON.stringify(salesData));
  };

  // === DEMO DATA ===
  const generateDemoOrders = () => [
    { id: 1, customer: 'NGO Hope Kitchen', items: ['Veg Biryani (10)', 'Raita (5)'], total: 1250, status: 'pending', date: '2025-11-12' },
    { id: 2, customer: 'City Shelter', items: ['Paneer Curry (8)', 'Roti (16)'], total: 980, status: 'completed', date: '2025-11-11' },
    { id: 3, customer: 'Children’s Home', items: ['Dal Khichdi (12)'], total: 720, status: 'pending', date: '2025-11-13' },
  ];

  const generateDemoMenu = () => [
    { id: 1, name: 'Veg Biryani', price: 125, available: true },
    { id: 2, name: 'Paneer Curry', price: 140, available: true },
    { id: 3, name: 'Dal Khichdi', price: 60, available: false },
  ];

  const generateDemoSales = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay(); // 0 = Sun
    return days.reduce((acc, day, i) => {
      const diff = (i - today + 7) % 7;
      const date = new Date();
      date.setDate(date.getDate() - diff);
      const key = date.toISOString().split('T')[0];
      acc[key] = Math.floor(Math.random() * 1500) + 500;
      return acc;
    }, {});
  };

  // === ORDER ACTIONS ===
  const addDemoOrder = () => {
    const demo = {
      id: Date.now(),
      customer: 'NGO FoodShare',
      items: ['Mixed Veg (6)', 'Roti (12)'],
      total: Math.floor(Math.random() * 800) + 600,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [demo, ...orders];
    setOrders(updated);
    saveData();
  };

  const toggleOrderStatus = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: order.status === 'pending' ? 'completed' : 'pending' } : order
    ));
    saveData();
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    saveData();
  };

  const completeAllPending = () => {
    setOrders(orders.map(order => order.status === 'pending' ? { ...order, status: 'completed' } : order));
    saveData();
  };

  const resetData = () => {
    if (window.confirm('Reset all data to demo state?')) {
      const demoOrders = generateDemoOrders();
      const demoMenu = generateDemoMenu();
      const demoSales = generateDemoSales();
      setOrders(demoOrders);
      setMenuItems(demoMenu);
      setSalesData(demoSales);
      localStorage.setItem('foodSaver_orders', JSON.stringify(demoOrders));
      localStorage.setItem('foodSaver_menu', JSON.stringify(demoMenu));
      localStorage.setItem('foodSaver_sales', JSON.stringify(demoSales));
    }
  };

  const randomizeSales = () => {
    const newSales = { ...salesData };
    Object.keys(newSales).forEach(day => {
      newSales[day] = Math.floor(Math.random() * 2000) + 300;
    });
    setSalesData(newSales);
    localStorage.setItem('foodSaver_sales', JSON.stringify(newSales));
  };

  // === MENU ACTIONS ===
  const handleMenuItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMenuItem({
      ...newMenuItem,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addMenuItem = (e) => {
    e.preventDefault();
    if (!newMenuItem.name || !newMenuItem.price) return;
    const item = {
      id: Date.now(),
      name: newMenuItem.name.trim(),
      price: parseFloat(newMenuItem.price),
      available: newMenuItem.available
    };
    setMenuItems([...menuItems, item]);
    setNewMenuItem({ name: '', price: '', available: true });
    saveData();
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    saveData();
  };

  const toggleMenuItemAvailability = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
    saveData();
  };

  const editMenuItem = (id) => {
    const item = menuItems.find(i => i.id === id);
    if (item) {
      setNewMenuItem({
        name: item.name,
        price: item.price.toString(),
        available: item.available
      });
      deleteMenuItem(id);
    }
  };

  // === NEWSLETTER ===
  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) return;
    const emails = JSON.parse(localStorage.getItem('foodSaver_emails') || '[]');
    if (!emails.includes(newsletterEmail)) {
      emails.push(newsletterEmail);
      localStorage.setItem('foodSaver_emails', JSON.stringify(emails));
    }
    setNewsletterEmail('');
    alert(`Thank you! ${newsletterEmail} added to updates.`);
  };

  // === KPI CALCULATIONS ===
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const menuCount = menuItems.length;

  // === SALES CHART ===
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const chartData = days.map(day => {
    const date = new Date(today);
    const dayIndex = days.indexOf(day);
    const diff = dayIndex - today.getDay() + (dayIndex < today.getDay() ? 7 : 0);
    date.setDate(today.getDate() - (7 - diff) % 7);
    const key = date.toISOString().split('T')[0];
    return {
      day,
      value: salesData[key] || 0,
      key
    };
  });
  const maxSale = Math.max(...chartData.map(d => d.value), 1);

  // Get theme colors from CSS variables for charts
  const getChartColors = () => {
    if (typeof window === 'undefined') return { active: '#10b981', inactive: '#cbd5e1' };
    const root = getComputedStyle(document.documentElement);
    return {
      active: root.getPropertyValue('--color-primary').trim() || '#38e07b',
      inactive: root.getPropertyValue('--text-muted').trim() || '#6b8576'
    };
  };

  return (
    <div className="restaurant-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Restaurant Dashboard</h1>
          <p className="dashboard-subtitle">Summary of operations for partnered restaurants</p>
        </div>
        <div className="header-actions">
          <button onClick={addDemoOrder} className="btn btn-outline">
            <i className="fas fa-plus"></i> Add Demo Order
          </button>
          <button onClick={resetData} className="btn btn-outline">
            <i className="fas fa-redo"></i> Reset Data
          </button>
          <Link to="/donate" className="btn btn-donate">
            <i className="fas fa-hands-helping"></i> DONATE
          </Link>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard 
          title="Total Orders" 
          value={totalOrders} 
          subtitle="All-time orders"
          icon="📦"
        />
        <KPICard 
          title="Pending Orders" 
          value={pendingOrders} 
          subtitle="Awaiting fulfillment"
          icon="⏳"
        />
        <KPICard 
          title="Revenue" 
          value={`₹${revenue.toLocaleString()}`} 
          subtitle="Food value donated"
          icon="💰"
        />
        <KPICard 
          title="Menu Items" 
          value={menuCount} 
          subtitle="Available for donation"
          icon="🍽️"
        />
      </div>

      <div className="dashboard-body">
        {/* Left Column: Orders + Sales + Quick Actions */}
        <div className="main-column">
          {/* Orders Table */}
          <section className="card">
            <div className="section-header">
              <h2>Orders Management</h2>
              <div className="quick-actions">
                <button onClick={completeAllPending} className="btn btn-sm btn-success">
                  Complete All Pending
                </button>
              </div>
            </div>
            <div className="table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-data">No orders yet. Add a demo order to get started!</td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} className={order.status === 'completed' ? 'completed' : ''}>
                        <td>{order.customer}</td>
                        <td>{order.items.join(', ')}</td>
                        <td>₹{order.total.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${order.status}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td className="action-cell">
                          <button 
                            onClick={() => toggleOrderStatus(order.id)}
                            className={`btn-icon ${order.status === 'pending' ? 'btn-success' : 'btn-warning'}`}
                            title={order.status === 'pending' ? 'Mark as complete' : 'Undo completion'}
                          >
                            {order.status === 'pending' ? '✓' : '↩'}
                          </button>
                          <button 
                            onClick={() => deleteOrder(order.id)}
                            className="btn-icon btn-danger"
                            title="Delete order"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sales Chart */}
          <section className="card">
            <div className="section-header">
              <h2>Sales Insights (7-Day)</h2>
              <button onClick={randomizeSales} className="btn btn-sm btn-outline">
                <i className="fas fa-dice"></i> Randomize
              </button>
            </div>
            <div className="sales-chart">
              {chartData.map((item, i) => {
                const chartColors = getChartColors();
                return (
                  <div key={i} className="chart-bar">
                    <div 
                      className="bar"
                      style={{ 
                        height: `${(item.value / maxSale) * 100}%`,
                        backgroundColor: item.value > 0 ? chartColors.active : chartColors.inactive
                      }}
                    >
                      <span className="bar-value">₹{item.value}</span>
                    </div>
                    <span className="bar-label">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="card quick-actions-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions-grid">
              <button onClick={completeAllPending} className="quick-action">
                <div className="icon">✓</div>
                <span>Complete All Pending</span>
              </button>
              <button onClick={randomizeSales} className="quick-action">
                <div className="icon">🎲</div>
                <span>Randomize Sales</span>
              </button>
              <button onClick={resetData} className="quick-action">
                <div className="icon">🔄</div>
                <span>Reset Demo Data</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Menu + Newsletter */}
        <div className="sidebar-column">
          {/* Menu Management */}
          <section className="card">
            <div className="section-header">
              <h2>Menu Management</h2>
            </div>
            <form onSubmit={addMenuItem} className="menu-form">
              <input
                type="text"
                name="name"
                value={newMenuItem.name}
                onChange={handleMenuItemChange}
                placeholder="Item name (e.g., Veg Biryani)"
                required
              />
              <div className="price-row">
                <input
                  type="number"
                  name="price"
                  value={newMenuItem.price}
                  onChange={handleMenuItemChange}
                  placeholder="Price (₹)"
                  min="0"
                  step="0.01"
                  required
                />
                <label className="switch">
                  <input
                    type="checkbox"
                    name="available"
                    checked={newMenuItem.available}
                    onChange={handleMenuItemChange}
                  />
                  <span className="slider"></span>
                  <span className="switch-label">Available</span>
                </label>
              </div>
              <button type="submit" className="btn btn-primary full-width">
                {newMenuItem.name ? 'Update' : 'Add'} Item
              </button>
            </form>

            <div className="menu-list">
              {menuItems.length === 0 ? (
                <p className="no-data">No menu items. Add your first donation item!</p>
              ) : (
                menuItems.map(item => (
                  <div key={item.id} className="menu-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="item-actions">
                      <div className="availability">
                        <span className={item.available ? 'available' : 'unavailable'}>
                          {item.available ? '✓ Available' : '✗ Unavailable'}
                        </span>
                      </div>
                      <button 
                        onClick={() => toggleMenuItemAvailability(item.id)}
                        className="btn-icon"
                        title="Toggle availability"
                      >
                        {item.available ? '✓' : '✕'}
                      </button>
                      <button 
                        onClick={() => editMenuItem(item.id)}
                        className="btn-icon"
                        title="Edit item"
                      >
                        ✏
                      </button>
                      <button 
                        onClick={() => deleteMenuItem(item.id)}
                        className="btn-icon btn-danger"
                        title="Delete item"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Newsletter */}
          <section className="card">
            <h2>Stay Updated</h2>
            <p>Get impact reports & FoodSaver news</p>
            <form onSubmit={submitNewsletter} className="newsletter-form">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@ngo.org"
                required
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

// Reusable KPICard Component
const KPICard = ({ title, value, subtitle, icon }) => (
  <div className="kpi-card">
    <div className="kpi-icon">{icon}</div>
    <div className="kpi-content">
      <div className="kpi-value">{value}</div>
      <div className="kpi-title">{title}</div>
      <div className="kpi-subtitle">{subtitle}</div>
    </div>
  </div>
);

export default RestaurantDashboard;