import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleToggle = (index) => {
    setActiveSection((prev) => (prev === index ? null : index));
  };

  const sections = [
    {
      title: "1. Introduction",
      content: (
        <>
          <p className="privacy-section-text">
            Welcome to FoodSaver ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
            you have a positive experience when using our platform.
          </p>
          <p className="privacy-section-text">
            By using FoodSaver, you agree to the collection and use of information in accordance with this policy.
            If you do not agree, please do not use our services.
          </p>
        </>
      ),
    },
    {
      title: "2. Information We Collect",
      content: (
        <>
          <h3 className="privacy-subsection-title">2.1 Information You Provide</h3>
          <ul className="privacy-list">
            <li>Registering an account (restaurant, NGO, admin)</li>
            <li>Submitting food donation listings or requests</li>
            <li>Contacting us via forms or email</li>
            <li>Newsletter subscriptions and surveys</li>
          </ul>

          <h3 className="privacy-subsection-title">2.2 Automatically Collected Information</h3>
          <ul className="privacy-list">
            <li>IP address and device details</li>
            <li>Browser type and operating system</li>
            <li>Pages visited and usage patterns</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </>
      ),
    },
    {
      title: "3. How We Use Your Information",
      content: (
        <ul className="privacy-list">
          <li>Providing and improving our services</li>
          <li>Facilitating food donations</li>
          <li>Managing accounts and communication</li>
          <li>Security, analytics, and compliance</li>
        </ul>
      ),
    },
    {
      title: "4. Information Sharing and Disclosure",
      content: (
        <>
          <h3 className="privacy-subsection-title">4.1 With Other Users</h3>
          <p className="privacy-section-text">
            Relevant information may be shared between restaurants and NGOs to facilitate food donations.
          </p>

          <h3 className="privacy-subsection-title">4.2 Service Providers</h3>
          <p className="privacy-section-text">
            Third-party providers may assist with hosting, analytics, and support.
          </p>

          <h3 className="privacy-subsection-title">4.3 Legal Requirements</h3>
          <p className="privacy-section-text">
            Disclosure may occur if required by law or to protect rights and safety.
          </p>

          <h3 className="privacy-subsection-title">4.4 Business Transfers</h3>
          <p className="privacy-section-text">
            Information may transfer during mergers or acquisitions.
          </p>
        </>
      ),
    },
    {
      title: "5. Data Security",
      content: (
        <>
          <p className="privacy-section-text">
            We implement security measures to protect your data, but no system is 100% secure.
          </p>
          <p className="privacy-section-text">
            You are responsible for safeguarding your account credentials.
          </p>
        </>
      ),
    },
    {
      title: "6. Cookies and Tracking Technologies",
      content: (
        <>
          <p className="privacy-section-text">
            Cookies help improve your experience and track usage.
          </p>
          <p className="privacy-section-text">
            You may disable cookies, but some features may not work properly.
          </p>
        </>
      ),
    },
    {
      title: "7. Your Rights and Choices",
      content: (
        <ul className="privacy-list">
          <li><strong>Access:</strong> Request your personal data</li>
          <li><strong>Correction:</strong> Fix incorrect data</li>
          <li><strong>Deletion:</strong> Remove your data</li>
          <li><strong>Opt-out:</strong> Stop marketing emails</li>
          <li><strong>Portability:</strong> Receive your data</li>
        </ul>
      ),
    },
    {
      title: "8. Children's Privacy",
      content: (
        <p className="privacy-section-text">
          Our services are not intended for children under 18, and we do not knowingly collect their data.
        </p>
      ),
    },
    {
      title: "9. Changes to This Privacy Policy",
      content: (
        <p className="privacy-section-text">
          We may update this policy and encourage you to review it periodically.
        </p>
      ),
    },
    {
      title: "10. Contact Us",
      content: (
        <div className="privacy-contact-info">
          <p><strong>Email:</strong> privacy@foodsaver.com</p>
          <p><strong>Address:</strong> Haldia Institute of Technology, Haldia, West Bengal, India</p>
          <p><strong>Phone:</strong> +91 (XXX) XXX-XXXX</p>
        </div>
      ),
    },
  ];

  return (
    <div className="content-wrapper privacy-page">
      <Link to="/" className="privacy-back-btn">
        ⬅ Back to Home
      </Link>

      <div className="privacy-hero">
        <div className="privacy-hero-content">
          <h1 className="privacy-hero-title">Privacy Policy</h1>
          <p className="privacy-hero-subtitle">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="privacy-last-updated">Last Updated: {currentDate}</p>
        </div>
      </div>

      <div className="privacy-content">
        {sections.map((section, index) => {
          const isOpen = activeSection === index;

          return (
            <section
              key={index}
              className={`privacy-section ${isOpen ? "active" : ""}`}
              onMouseEnter={() => setActiveSection(index)}
              onMouseLeave={() => setActiveSection(null)}
              onClick={() => handleToggle(index)}
            >
              <h2 className="privacy-section-title">{section.title}</h2>

              <div
                className="privacy-dropdown"
                style={{ maxHeight: isOpen ? "800px" : "0px" }}
              >
                {section.content}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Privacy;
