import React, { useState, useEffect } from 'react';
// --- Import the new CSS file ---
import '../css/Contributors.css'; 
// --- Import the new Modal component ---
import ContributorModal from './ContributorModal'; 

// --- Define your repo details ---
const REPO_OWNER = 'bidyut26maji';
const REPO_NAME = 'FoodSaver';
const PROJECT_LEAD = 'bidyut26maji';
const PROJECT_CO_LEAD = 'abhishekkumar177';

const Contributors = () => {
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalPoints: 0, // New stat
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('contributions');
  const [filterLevel, setFilterLevel] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [contributors, setContributors] = useState([]);
  const [projectLead, setProjectLead] = useState(null); // State for the lead
  const [activity, setActivity] = useState([]); // State for timeline
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- State for the modal ---
  const [selectedContributor, setSelectedContributor] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const contribUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`;
        const pullsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all&per_page=100`;
        const commitsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=5`; // For timeline

        const [contribResponse, pullsResponse, commitsResponse] = await Promise.all([
          fetch(contribUrl),
          fetch(pullsUrl),
          fetch(commitsUrl)
        ]);

        if (!contribResponse.ok) throw new Error(`Fetch contributors failed: ${contribResponse.status}`);
        if (!pullsResponse.ok) throw new Error(`Fetch PRs failed: ${pullsResponse.status}`);
        if (!commitsResponse.ok) throw new Error(`Fetch commits failed: ${commitsResponse.status}`);
        
        const contribData = await contribResponse.json();
        const pullsData = await pullsResponse.json();
        const commitsData = await commitsResponse.json();

        // --- 1. Process PRs ---
        const prCounts = {};
        pullsData.forEach(pr => {
          if (pr.user) {
            prCounts[pr.user.login] = (prCounts[pr.user.login] || 0) + 1;
          }
        });

        // --- 3. Process Contributors ---
        let totalCommits = 0;
        let totalPRs = 0;
        let totalPoints = 0;
        let leadContributor = null;
        const otherContributors = [];

        contribData.forEach(user => {
          const prCount = prCounts[user.login] || 0;
          const points = user.contributions + (prCount * 5); // Points logic

          let level = 'contributor';
          if (user.contributions > 50) level = 'gold';
          else if (user.contributions > 20) level = 'silver';
          else if (user.contributions > 10) level = 'bronze';

          const formattedUser = {
            id: user.id,
            name: user.login,
            username: `@${user.login}`,
            avatar: user.avatar_url,
            role: 'Contributor',
            commits: user.contributions,
            prs: prCount,
            points: points,
            badges: ['Contributor', level],
            level: level,
            links: [{ icon: 'fab fa-github', url: user.html_url }],
          };

          // --- Separate the project lead ---
          if (user.login === PROJECT_LEAD) {
            leadContributor = { ...formattedUser, isLead: true, role: 'Project Lead' };
          } else {
            otherContributors.push(formattedUser);
          }

          totalCommits += user.contributions;
          totalPRs += prCount;
          totalPoints += points;
        });

        setProjectLead(leadContributor);
        setContributors(otherContributors);

        // --- 4. Set Stats ---
        setStats({
          totalContributors: contribData.length,
          totalCommits: totalCommits,
          totalPRs: totalPRs,
          totalPoints: totalPoints,
        });

      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch data:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // --- Filter and Sort Logic ---
  const filteredContributors = contributors.filter(contributor => {
    const matchesSearch = contributor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || (filterLevel === contributor.level);
    return matchesSearch && matchesFilter;
  });

  const sortedContributors = filteredContributors.sort((a, b) => {
    if (sortBy === 'contributions') return b.commits - a.commits;
    if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
    if (sortBy === 'prs') return b.prs - a.prs;
    if (sortBy === 'points') return b.points - b.points;
    return b.commits - a.commits;
  });

  // --- Pagination Logic ---
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedContributors.length / itemsPerPage);
  const paginatedContributors = sortedContributors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  // --- Render Card Function ---
  // We add an onClick to open the modal
  const renderContributorCard = (contributor) => (
    <div
      key={contributor.id}
      className="contributor"
      onClick={() => setSelectedContributor(contributor)}
    >
      <img src={contributor.avatar} alt={contributor.name} />
      <a href={contributor.links[0].url} target="_blank" rel="noopener noreferrer">
        {contributor.name}
      </a>
      <p>Contributions: {contributor.commits}</p>
      <p>PRs: {contributor.prs}</p>
    </div>
  );

  return (
    <div className="contributors-page">
      <main className="main-content">
        {/* --- Hero Section from HTML --- */}
        <section className="contributors-hero">
          <div className="container">
            <h1>Our Amazing Contributors</h1>
            <p>
              Meet the talented developers and contributors who help make FoodSaver
              better every day
            </p>
          </div>
          <div className="contributor-container">
            <h1>🌟 GitHub Contributors Dashboard</h1>
            
            {/* --- Stats Section from HTML --- */}
            <div id="stats">
              <div className="stat-box">
                <h3>Total Contributors</h3>
                <p id="totalContributors">{stats.totalContributors}</p>
              </div>
              <div className="stat-box">
                <h3>Total Contributions</h3>
                <p id="totalCommits">{stats.totalCommits}</p>
              </div>
              <div className="stat-box">
                <h3>Total PRs</h3>
                <p id="totalPRs">{stats.totalPRs}</p>
              </div>
              <div className="stat-box">
                <h3>Total Points</h3>
                <p id="totalPoints">{stats.totalPoints}</p>
              </div>
            </div>

            {/* --- Controls Section from HTML --- */}
            <div className="search-contributor">
              <input 
                type="text" 
                id="searchInput" 
                placeholder="Search contributor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                id="sortBy" 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="contributions">Most Contributions</option>
                <option value="prs">Most PRs</option>
                <option value="points">Most Points</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              <select 
                id="filterLevel" 
                className="filter-select"
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

            {/* --- Spinner from HTML --- */}
            {isLoading && (
              <div id="spinner">
                <div className="spinner-circle"></div>
              </div>
            )}

            {/* --- Error Message from HTML --- */}
            {error && <p id="errorMessage">Error: {error}</p>}

            {/* --- Project Lead Card from HTML --- */}
            {projectLead && (
              <div id="projectLeadContainer">
                <div 
                  className="contributor special-lead" 
                  onClick={() => setSelectedContributor(projectLead)}
                >
                  <img src={projectLead.avatar} alt={projectLead.name} />
                  <a href={projectLead.links[0].url} target="_blank" rel="noopener noreferrer">
                    {projectLead.name}
                  </a>
                  <p>🌟 {projectLead.role} 🌟</p>
                  <p>Contributions: {projectLead.commits} | PRs: {projectLead.prs}</p>
                </div>
              </div>
            )}

            {/* --- Contributors Grid --- */}
            {!isLoading && (
              <div id="contributorsList">
                {paginatedContributors.map(renderContributorCard)}
              </div>
            )}

            {/* --- Pagination Controls from HTML --- */}
            {!isLoading && totalPages > 1 && (
              <div id="controls">
                <button id="prevPage" onClick={handlePrevPage} disabled={currentPage === 1}>
                  ⬅️ Prev
                </button>
                <span>Page <span id="currentPage">{currentPage}</span> of <span id="totalPages">{totalPages}</span></span>
                <button id="nextPage" onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Next ➡️
                </button>
              </div>
            )}
          </div>
        </section>

        {/* --- How to Contribute Section from HTML --- */}
        <section className="contribute-section">
          <div className="container">
            <div className="section-header">
              <h2>Want to Contribute?</h2>
              <p>Join our community and help improve FoodSaver</p>
            </div>
            <div className="contribute-steps">
              {/* Step cards */}
              {[
                { icon: 'fas fa-clipboard-list', title: 'Create an Issue', desc: 'Start by creating an issue describing your change and wait for it to be assigned.' },
                { icon: 'fab fa-github', title: 'Fork the Repository', desc: 'Fork the main repository to your GitHub account to create your own copy.' },
                { icon: 'fas fa-code-branch', title: 'Create a Branch', desc: 'Create a feature branch for your changes using a descriptive name.' },
                { icon: 'fas fa-code', title: 'Make Changes', desc: 'Implement your features or bug fixes following our coding standards.' },
                { icon: 'fas fa-upload', title: 'Submit PR', desc: 'Create a pull request with a clear description of your changes for review.' }
              ].map(step => (
                <div key={step.title} className="step-card">
                  <div className="step-icon"><i className={step.icon}></i></div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* --- Render the modal if a contributor is selected --- */}
      {selectedContributor && (
        <ContributorModal 
          contributor={selectedContributor} 
          onClose={() => setSelectedContributor(null)} 
        />
      )}
    </div>
  );
};

export default Contributors;