import React from 'react';
import './Team.css';

// --- Optional Styles Component (Prevents Build Errors) ---
const TeamStyles = () => null;

// --- Hero Section ---
const TeamHeroSection = () => {
  return (
    <section className="team-hero-section">
      <div className="container hero-container">
        <div className="hero-text-content">
          <h1 className="hero-title">Meet the Team Driving Our Mission</h1>
          <p className="hero-description">
            United by a collective passion, our team is dedicated to innovating
            solutions that connect communities and reduce food waste.
          </p>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="https://placehold.co/600x400/e0e0e0/b0b0b0?text=Team+Working"
            alt="Team working together"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

// --- Reusable Team Member Card ---
const TeamMemberCard = ({ imgSrc, name, role }) => {
  return (
    <div className="team-card">
      <img
        src={imgSrc}
        alt={name}
        className="team-card-img"
        onError={(e) => {
          e.target.src =
            'https://placehold.co/160x160/e0e0e0/b0b0b0?text=Profile';
        }}
      />
      <h3 className="team-card-name">{name}</h3>
      <p className="team-card-role">{role}</p>
    </div>
  );
};

// --- Core Project Team Section ---
const CoreTeamSection = () => {
  const coreTeam = [
    { name: "Alex Chen", role: "Project Manager", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Alex+Chen" },
    { name: "Brenda Smith", role: "Lead Operations", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Brenda+Smith" },
    { name: "Carlos Rodríguez", role: "Community Outreach", imgSrc: "https://placehold.co/160x160/d1faee5/1f2937?text=Carlos+R" },
    { name: "Dana Williams", role: "Marketing Lead", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Dana+Williams" },
    { name: "Evan Kim", role: "UX/UI Designer", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Evan+Kim" },
  ];

  return (
    <section className="team-section section-gray">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Core Project Team</h2>
          <p className="section-description">
            The dedicated individuals leading the charge and bringing the Foodsaver vision to life every day.
          </p>
        </div>

        <div className="team-grid core-team-grid">
          {coreTeam.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Mentor Section ---
const MentorSection = () => {
  return (
    <section className="mentor-section section-gray">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Guidance from Our Mentor</h2>
          <p className="section-description">
            Expert advice and invaluable direction from an industry leader who shares our passion for change.
          </p>
        </div>

        <div className="mentor-card">
          <div className="mentor-image-wrapper">
            <img
              src="https://placehold.co/200x200/d1fae5/1f2937?text=Dr.+Vance"
              alt="Dr. Eleanor Vance"
              className="mentor-image"
            />
          </div>

          <div className="mentor-info">
            <h3 className="mentor-name">Dr. Eleanor Vance</h3>
            <p className="mentor-title">
              Chief Sustainability Officer, Terra Group
            </p>
            <blockquote className="mentor-quote">
              "Foodsaver is not just an app; it's a movement. I'm proud to guide a team that is so passionately committed to creating a tangible impact on food waste and community well-being."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Tech Team Section ---
const TechTeamSection = () => {
  const techTeam = [
    { name: "Fatima Khan", role: "Lead Backend Developer", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Fatima+Khan" },
    { name: "George Martin", role: "Frontend Developer", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=George+Martin" },
    { name: "Hannah Cho", role: "Mobile Developer (iOS)", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Hannah+Cho" },
    { name: "Ivan Petrov", role: "DevOps Engineer", imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Ivan+Petrov" },
  ];

  return (
    <section className="team-section section-white">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Minds Behind the Tech</h2>
          <p className="section-description">
            Our talented developers who build, maintain, and innovate the Foodsaver platform.
          </p>
        </div>

        <div className="team-grid tech-team-grid">
          {techTeam.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CTA Section ---
const CallToActionSection = () => {
  return (
    <section className="cta-section section-white">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Want to Make a Difference?</h2>
          <p className="cta-description">
            We're always looking for passionate individuals to join our mission. If you're driven to fight food waste and build stronger communities, we'd love to hear from you.
          </p>
          <a href="#" className="cta-button">
            View Open Positions
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---
export default function TeamPage() {
  return (
    <div className="team-page-wrapper">
      <TeamStyles />

      <main>
        <TeamHeroSection />
        <CoreTeamSection />
        <MentorSection />
        <TechTeamSection />
        <CallToActionSection />
      </main>
    </div>
  );
}