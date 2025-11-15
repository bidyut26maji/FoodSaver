import React, { useState, useEffect } from 'react';
import '../css/Contributors.css';

// Define your repository details here
const REPO_OWNER = 'abhishekkumar177';
const REPO_NAME = 'FoodSaver';

const Contributors = () => {
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalCommits: 0, // This will be total contributions
    totalPRs: 0,     // New stat
    goldContributors: 0,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('contributions'); // Default sort
  const [filterLevel, setFilterLevel] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- States for fetched data ---
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch data from GitHub API ---
  useEffect(() => {
    const fetchContributorData = async () => {
      try {
        // --- We will fetch from two endpoints ---
        const contribUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`;
        // Fetch all PRs (open and closed). Note: per_page=100 is max.
        const pullsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all&per_page=100`;

        const [contribResponse, pullsResponse] = await Promise.all([
          fetch(contribUrl),
          fetch(pullsUrl)
        ]);

        if (!contribResponse.ok) {
          throw new Error(`Failed to fetch contributors: ${contribResponse.status}`);
        }
        if (!pullsResponse.ok) {
          throw new Error(`Failed to fetch pull requests: ${pullsResponse.status}`);
        }
        
        const contribData = await contribResponse.json();
        const pullsData = await pullsResponse.json();

        // --- 1. Process Pull Requests to create a count ---
        const prCounts = {};
        pullsData.forEach(pr => {
          if (pr.user) {
            const username = pr.user.login;
            prCounts[username] = (prCounts[username] || 0) + 1;
          }
        });

        // --- 2. Map Contributor data and merge PR counts ---
        const formattedData = contribData.map(user => {
          const prCount = prCounts[user.login] || 0; // Get PR count from our tally
          
          let level = 'contributor';
          if (user.contributions > 50) level = 'gold';
          else if (user.contributions > 20) level = 'silver';
          else if (user.contributions > 10) level = 'bronze';

          return {
            id: user.id,
            name: user.login,
            username: `@${user.login}`,
            avatar: user.avatar_url,
            role: 'Contributor',
            // --- Use both counts ---
            commits: user.contributions, // This is the total "contributions"
            prs: prCount,                 // This is the specific "PR" count
            // ---
            projects: 0, // Still static, as this isn't from the API
            badges: ['Contributor', level],
            level: level,
            links: [
              { icon: 'fab fa-github', url: user.html_url }
            ],
            isLead: false 
          };
        });

        setContributors(formattedData);

        // --- 3. Calculate stats from fetched data ---
        const totalContributions = formattedData.reduce((acc, c) => acc + c.commits, 0);
        const totalPRs = formattedData.reduce((acc, c) => acc + c.prs, 0);
        const goldCount = formattedData.filter(c => c.level === 'gold').length;

        setStats({
          totalContributors: contribData.length,
          totalCommits: totalContributions,
          totalPRs: totalPRs, // Set new stat
          goldContributors: goldCount,
        });

      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch data:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributorData();
  }, []); // Empty array ensures this runs once on mount

  // --- Filter logic (unchanged) ---
  const filteredContributors = contributors.filter(contributor => {
    const matchesSearch =
      contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contributor.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || (filterLevel === contributor.level);
    return matchesSearch && matchesFilter;
  });

  // --- Sort logic (unchanged) ---
  const sortedContributors = filteredContributors.sort((a, b) => {
    if (sortBy === 'contributions') {
      return b.commits - a.commits; // Descending
    }
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name); // A-Z
    }
    if (sortBy === 'prs') {
      return b.prs - a.prs; // Sort by PRs
    }
    return b.commits - a.commits;
  });

  // --- Pagination (unchanged) ---
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedContributors.length / itemsPerPage);
  const paginatedContributors = sortedContributors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // --- Render card function ---
  const renderContributorCard = (contributor) => (
    <div
      key={contributor.id}
      className={`contributor-card ${contributor.isLead ? 'project-lead-card' : ''}`}
    >
      {contributor.isLead && (
        <div className="project-lead-badge">🌟 Project Lead</div>
      )}
      <div className="card-header">
        <div className="contributor-avatar">
          <img src={contributor.avatar} alt={`${contributor.name}'s avatar`} />
        </div>
        <h3 className="contributor-name">{contributor.name}</h3>
        <span className="contributor-username">{contributor.username}</span>
        <div className="contributor-stats">
          <div className="stat-item">
            {/* --- UPDATED LABEL --- */}
            <div className="stat-value">{contributor.commits}</div>
            <div className="stat-label">Contributions</div>
          </div>
          <div className="stat-item">
            {/* --- NOW USES LIVE DATA --- */}
            <div className="stat-value">{contributor.prs}</div>
            <div className="stat-label">PRs</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{contributor.projects}</div>
            <div className="stat-label">Projects</div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="contributor-badges">
          {contributor.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`contributor-badge ${
                badge.includes('Lead') ? 'badge-gold' :
                badge.includes('gold') ? 'badge-gold' :
                badge.includes('silver') ? 'badge-silver' :
                badge.includes('bronze') ? 'badge-bronze' : ''
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="contributor-links">
          {contributor.links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              className="contributor-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="contributors-page">
      <main className="main-content">
        <section className="contributors-hero">
          <div className="container">
            <h1>🌟 Our Amazing Contributors</h1>
            <p>
              Meet the talented developers, designers, and contributors who help make FoodSaver better every day
              through their dedication and expertise.
            </p>
          </div>
        </section>

        <div className="container">
          {/* Stats Section */}
          <div className="stats-container">
            <div className="stat-card">
              <i className="fas fa-users"></i>
              <h3>Total Contributors</h3>
              <p>{stats.totalContributors.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-code-commit"></i>
              {/* --- UPDATED LABEL --- */}
              <h3>Total Contributions</h3>
              <p>{stats.totalCommits.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              {/* --- NEW CARD --- */}
              <i className="fas fa-code-pull-request"></i>
              <h3>Total PRs</h3>
              <p>{stats.totalPRs.toLocaleString()}</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-trophy"></i>
              <h3>Gold Contributors</h3>
              <p>{stats.goldContributors}</p>
            </div>
          </div>

          {/* Controls Section */}
          <div className="controls-section">
            <h2 className="controls-title">Filter & Search Contributors</h2>
            <div className="controls-grid">
              <div className="control-group">
                <label htmlFor="searchInput">Search Contributor</label>
                <input
                  type="text"
                  id="searchInput"
                  className="control-input"
                  placeholder="Enter name or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="control-group">
                <label htmlFor="sortBy">Sort By</label>
                <select
                  id="sortBy"
                  className="control-input"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="contributions">Most Contributions</option>
                  <option value="prs">Most PRs</option> {/* --- NEW SORT --- */}
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              <div className="control-group">
                <label htmlFor="filterLevel">Filter By Level</label>
                <select
                  id="filterLevel"
                  className="control-input"
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="gold">🥇 Gold (50+)</option>
                  <option value="silver">🥈 Silver (20-49)</option>
                  <option value="bronze">🥉 Bronze (10-19)</option>
                  <option value="contributor">⭐ Contributor (1-9)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contributors Grid */}
          <div className="contributors-grid">
            {isLoading ? (
              <div className="loading-message">
                <i className="fas fa-spinner fa-spin"></i> Loading Contributors...
              </div>
            ) : error ? (
              <div className="error-message">
                <h3>Error: {error}</h3>
                <p>Could not load contributors. Please try again later.</p>
              </div>
            ) : paginatedContributors.length > 0 ? (
              paginatedContributors.map(renderContributorCard)
            ) : (
              <div className="no-contributors">
                <i className="fas fa-search" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                <h3>No contributors found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Pagination (unchanged) */}
          {sortedContributors.length > itemsPerPage && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <span className="pagination-info">
                Page <span className="current-page">{currentPage}</span> of <span className="total-pages">{totalPages}</span>
              </span>
              <button
                className="pagination-btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}

          {/* Activity Timeline (Static - unchanged) */}
          <div className="timeline-section">
            <h2 className="timeline-title">Recent Contribution Activity</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-date">Nov 12, 2023</div>
                  <h3 className="timeline-title-item">New Feature: Dashboard</h3>
                  <p className="timeline-desc">Admin dashboard layout and charts integration completed.</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-date">Oct 28, 2023</div>
                  <h3 className="timeline-title-item">UI Redesign</h3>
                  <p className="timeline-desc">Homepage and NGO page redesign merged.</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Contribute (Static - unchanged) */}
        <section className="contribute-section">
          <div className="container">
            <div className="contribute-header">
              <h2>🚀 Want to Contribute?</h2>
              <p>Join our vibrant community and help improve FoodSaver. Every contribution counts!</p>
            </div>
            <div className="steps-container">
              {/* Static steps map... */}
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div key={num} className="step-card">
                  <div className="step-number">{num}</div>
                  <div className="step-icon">
                    <i className={
                      num === 1 ? 'fas fa-clipboard-list' :
                      num === 2 ? 'fab fa-github' :
                      num === 3 ? 'fas fa-code-branch' :
                      num === 4 ? 'fas fa-code' :
                      num === 5 ? 'fas fa-upload' :
                      'fas fa-check-circle'
                    }></i>
                  </div>
                  <h3>
                    {num === 1 ? 'Create an Issue' :
                      num === 2 ? 'Fork the Repository' :
                      num === 3 ? 'Create a Branch' :
                      num === 4 ? 'Make Changes' :
                      num === 5 ? 'Submit PR' :
                      'Get Merged'}
                  </h3>
                  <p>
                    {num === 1 ? 'Start by creating an issue describing your proposed change. Wait for it to be assigned before proceeding.' :
                      num === 2 ? 'Fork the main repository to your GitHub account to create your own working copy.' :
                      num === 3 ? 'Create a feature branch for your changes using a descriptive naming convention.' :
                      num === 4 ? 'Implement your features or bug fixes following our coding standards and guidelines.' :
                      num === 5 ? 'Create a pull request with a clear description ofyour changes for review.' :
                      'After review and approval, your contribution will be merged into the main codebase!'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contributors;