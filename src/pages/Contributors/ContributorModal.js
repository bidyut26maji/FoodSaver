import React, { useState, useEffect } from 'react';

// Define your repository details here
const REPO_OWNER = 'bidyut26maji';
const REPO_NAME = 'FoodSaver';

const ContributorModal = ({ contributor, onClose }) => {
  const [stats, setStats] = useState({ additions: 0, deletions: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!contributor) return;

    const fetchDetailedStats = async () => {
      setIsLoading(true);
      try {
        // Fetch all commits by this specific user
        const response = await fetch(`https://api.github.com/repos/bidyut26maji/FoodSaver/commits?author=${contributor.name}`);
        const commits = await response.json();

        let totalAdditions = 0;
        let totalDeletions = 0;

        // The 'commits' endpoint doesn't give stats in the list view.
        // We must fetch each commit individually to get additions/deletions.
        // To avoid rate-limiting, we'll just fetch the stats for their 5 most recent commits.
        
        const recentCommits = commits.slice(0, 5);
        const commitStatPromises = recentCommits.map(commit => 
          fetch(commit.url).then(res => res.json())
        );
        
        const detailedCommits = await Promise.all(commitStatPromises);
        
        detailedCommits.forEach(detailedCommit => {
          if (detailedCommit.stats) {
            totalAdditions += detailedCommit.stats.additions;
            totalDeletions += detailedCommit.stats.deletions;
          }
        });

        setStats({ additions: totalAdditions, deletions: totalDeletions });
      } catch (e) {
        console.error("Failed to fetch detailed stats:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailedStats();
  }, [contributor]);

  if (!contributor) return null;

  return (
    <div className="contributor-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <img id="modalAvatar" src={contributor.avatar} alt={contributor.name} className="modal-avatar" />
          <div className="modal-info">
            <h2 id="modalName">{contributor.name}</h2>
            <a id="modalGithubLink" href={contributor.links[0].url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
            <div id="modalBadges" className="modal-badges">
              {contributor.badges.map((badge, idx) => (
                <span key={idx} className={`contributor-badge ${badge}`}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-stats">
          <div className="modal-stat">
            <i className="fas fa-code-commit"></i>
            <span id="modalCommits">{contributor.commits}</span>
            <p>Contributions</p>
          </div>
          <div className="modal-stat">
            <i className="fas fa-code-pull-request"></i>
            <span id="modalPRs">{contributor.prs}</span>
            <p>Pull Requests</p>
          </div>
          <div className="modal-stat">
            <i className="fas fa-plus-circle"></i>
            <span id="modalAdditions">{isLoading ? '...' : stats.additions}</span>
            <p>Lines Added</p>
          </div>
          <div className="modal-stat">
            <i className="fas fa-minus-circle"></i>
            <span id="modalDeletions">{isLoading ? '...' : stats.deletions}</span>
            <p>Lines Deleted</p>
          </div>
        </div>
        {/* Heatmap is a complex component, so we'll leave it as a placeholder for now */}
        <div className="modal-heatmap">
          <h3>Contribution Activity (Recent 5 Commits)</h3>
          <div id="contributionHeatmap">(Heatmap component would go here)</div>
        </div>
      </div>
    </div>
  );
};

export default ContributorModal;