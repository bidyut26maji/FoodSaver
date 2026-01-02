import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="content-wrapper">
            {/* Back to Home Button */}
            <Link to="/" className="privacy-back-btn">
                ⬅ Back to Home
            </Link>

            {/* Hero Section */}
            <div className="privacy-hero">
                <div className="privacy-hero-content">
                    <h1 className="privacy-hero-title">Privacy Policy</h1>
                    <h2 className="privacy-hero-subtitle">
                        Your privacy is important to us. Learn how we collect, use, and protect your information.
                    </h2>
                    <p className="privacy-last-updated">Last Updated: {currentDate}</p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="privacy-content">
                <section className="privacy-section">
                    <h2 className="privacy-section-title">1. Introduction</h2>
                    <p className="privacy-section-text">
                        Welcome to FoodSaver ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
                        you have a positive experience when using our platform. This Privacy Policy explains how we collect,
                        use, disclose, and safeguard your information when you visit our website and use our services.
                    </p>
                    <p className="privacy-section-text">
                        By using FoodSaver, you agree to the collection and use of information in accordance with this policy.
                        If you do not agree with the practices described in this policy, please do not use our services.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">2. Information We Collect</h2>

                    <h3 className="privacy-subsection-title">2.1 Information You Provide</h3>
                    <p className="privacy-section-text">
                        We collect information that you voluntarily provide when you:
                    </p>
                    <ul className="privacy-list">
                        <li>Register an account (restaurant, NGO, or admin)</li>
                        <li>Complete registration forms and profile information</li>
                        <li>Submit food donation listings or requests</li>
                        <li>Contact us through our contact forms or email</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Participate in surveys or feedback</li>
                    </ul>
                    <p className="privacy-section-text">
                        This information may include: name, email address, phone number, organization name, address,
                        business registration details, tax identification numbers, and any other information you choose to provide.
                    </p>

                    <h3 className="privacy-subsection-title">2.2 Automatically Collected Information</h3>
                    <p className="privacy-section-text">
                        When you visit our website, we automatically collect certain information, including:
                    </p>
                    <ul className="privacy-list">
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Operating system</li>
                        <li>Pages visited and time spent on pages</li>
                        <li>Referring website addresses</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">3. How We Use Your Information</h2>
                    <p className="privacy-section-text">
                        We use the collected information for various purposes, including:
                    </p>
                    <ul className="privacy-list">
                        <li>To provide, maintain, and improve our services</li>
                        <li>To facilitate connections between restaurants and NGOs</li>
                        <li>To process and manage food donation requests and listings</li>
                        <li>To send you important updates about your account and our services</li>
                        <li>To respond to your inquiries and provide customer support</li>
                        <li>To send newsletters and promotional materials (with your consent)</li>
                        <li>To monitor and analyze usage patterns and trends</li>
                        <li>To detect, prevent, and address technical issues and security threats</li>
                        <li>To comply with legal obligations and enforce our terms of service</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">4. Information Sharing and Disclosure</h2>
                    <p className="privacy-section-text">
                        We may share your information in the following circumstances:
                    </p>

                    <h3 className="privacy-subsection-title">4.1 With Other Users</h3>
                    <p className="privacy-section-text">
                        To facilitate food donations, we may share relevant information between restaurants and NGOs,
                        including contact details, organization information, and donation listings.
                    </p>

                    <h3 className="privacy-subsection-title">4.2 Service Providers</h3>
                    <p className="privacy-section-text">
                        We may share information with third-party service providers who perform services on our behalf,
                        such as hosting, analytics, payment processing, and customer support.
                    </p>

                    <h3 className="privacy-subsection-title">4.3 Legal Requirements</h3>
                    <p className="privacy-section-text">
                        We may disclose your information if required by law, court order, or government regulation,
                        or if we believe disclosure is necessary to protect our rights, property, or safety, or that
                        of our users or others.
                    </p>

                    <h3 className="privacy-subsection-title">4.4 Business Transfers</h3>
                    <p className="privacy-section-text">
                        In the event of a merger, acquisition, or sale of assets, your information may be transferred
                        to the acquiring entity.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">5. Data Security</h2>
                    <p className="privacy-section-text">
                        We implement appropriate technical and organizational security measures to protect your personal
                        information against unauthorized access, alteration, disclosure, or destruction. However, no method
                        of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
                        absolute security.
                    </p>
                    <p className="privacy-section-text">
                        You are responsible for maintaining the confidentiality of your account credentials and for all
                        activities that occur under your account.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">6. Cookies and Tracking Technologies</h2>
                    <p className="privacy-section-text">
                        We use cookies and similar tracking technologies to track activity on our website and store certain
                        information. Cookies are small data files stored on your device that help us improve your experience.
                    </p>
                    <p className="privacy-section-text">
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        However, if you do not accept cookies, you may not be able to use some portions of our service.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">7. Your Rights and Choices</h2>
                    <p className="privacy-section-text">
                        Depending on your location, you may have the following rights regarding your personal information:
                    </p>
                    <ul className="privacy-list">
                        <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                        <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                        <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                    </ul>
                    <p className="privacy-section-text">
                        To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">8. Children's Privacy</h2>
                    <p className="privacy-section-text">
                        Our services are not directed to individuals under the age of 18. We do not knowingly collect
                        personal information from children. If we become aware that we have collected personal information
                        from a child without parental consent, we will take steps to delete that information.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">9. Changes to This Privacy Policy</h2>
                    <p className="privacy-section-text">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                        the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to
                        review this Privacy Policy periodically for any changes.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2 className="privacy-section-title">10. Contact Us</h2>
                    <p className="privacy-section-text">
                        If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="privacy-contact-info">
                        <p><strong>Email:</strong> privacy@foodsaver.com</p>
                        <p><strong>Address:</strong> Haldia Institute of Technology, Haldia, West Bengal, India</p>
                        <p><strong>Phone:</strong> +91 (XXX) XXX-XXXX</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Privacy;

