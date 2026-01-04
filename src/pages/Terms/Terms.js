import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="content-wrapper">
            {/* Back to Home Button */}
            <Link to="/" className="terms-back-btn">
                ⬅ Back to Home
            </Link>

            {/* Hero Section */}
            <div className="terms-hero">
                <div className="terms-hero-content">
                    <h1 className="terms-hero-title">Terms of Use</h1>
                    <h2 className="terms-hero-subtitle">
                        Please read these terms carefully before using FoodSaver. By using our service, you agree to these terms.
                    </h2>
                    <p className="terms-last-updated">Last Updated: {currentDate}</p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="terms-content">
                <section className="terms-section">
                    <h2 className="terms-section-title">1. Acceptance of Terms</h2>
                    <p className="terms-section-text">
                        Welcome to FoodSaver ("we," "our," or "us"). These Terms of Use ("Terms") govern your access to
                        and use of the FoodSaver platform, including our website, mobile applications, and related services
                        (collectively, the "Service").
                    </p>
                    <p className="terms-section-text">
                        By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any
                        part of these Terms, you may not access or use the Service. These Terms apply to all visitors,
                        users, restaurants, NGOs, and other parties who access or use the Service.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">2. Description of Service</h2>
                    <p className="terms-section-text">
                        FoodSaver is a platform that connects restaurants and food businesses with non-governmental
                        organizations (NGOs) to facilitate the donation of surplus food. Our Service enables:
                    </p>
                    <ul className="terms-list">
                        <li>Restaurants to list and donate surplus food</li>
                        <li>NGOs to discover and request food donations</li>
                        <li>Coordination and tracking of food donations</li>
                        <li>Communication between restaurants and NGOs</li>
                    </ul>
                    <p className="terms-section-text">
                        We are not responsible for the quality, safety, or condition of food items donated through our
                        platform. All food donations are made directly between restaurants and NGOs.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">3. User Accounts and Registration</h2>

                    <h3 className="terms-subsection-title">3.1 Account Creation</h3>
                    <p className="terms-section-text">
                        To use certain features of the Service, you must register for an account. You agree to:
                    </p>
                    <ul className="terms-list">
                        <li>Provide accurate, current, and complete information during registration</li>
                        <li>Maintain and promptly update your account information</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Accept responsibility for all activities under your account</li>
                        <li>Notify us immediately of any unauthorized use of your account</li>
                    </ul>

                    <h3 className="terms-subsection-title">3.2 Account Types</h3>
                    <p className="terms-section-text">
                        We offer different account types for restaurants, NGOs, and administrators. Each account type
                        has specific privileges and responsibilities as outlined in these Terms and our platform guidelines.
                    </p>

                    <h3 className="terms-subsection-title">3.3 Account Termination</h3>
                    <p className="terms-section-text">
                        We reserve the right to suspend or terminate your account at any time if you violate these Terms,
                        engage in fraudulent activity, or for any other reason we deem necessary to protect the integrity
                        of our Service.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">4. User Responsibilities</h2>

                    <h3 className="terms-subsection-title">4.1 For Restaurants</h3>
                    <p className="terms-section-text">
                        Restaurants using our Service agree to:
                    </p>
                    <ul className="terms-list">
                        <li>Provide accurate information about food donations, including quantity, type, and condition</li>
                        <li>Ensure all donated food meets applicable food safety standards and regulations</li>
                        <li>Handle and store food in accordance with food safety guidelines</li>
                        <li>Coordinate pickup or delivery times with NGOs in a timely manner</li>
                        <li>Comply with all applicable local, state, and federal laws regarding food donations</li>
                    </ul>

                    <h3 className="terms-subsection-title">4.2 For NGOs</h3>
                    <p className="terms-section-text">
                        NGOs using our Service agree to:
                    </p>
                    <ul className="terms-list">
                        <li>Use donated food solely for charitable purposes</li>
                        <li>Verify the condition of food upon receipt</li>
                        <li>Distribute food in accordance with applicable health and safety regulations</li>
                        <li>Provide accurate information about your organization and its charitable status</li>
                        <li>Coordinate pickup or delivery in a timely and professional manner</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">5. Food Safety and Liability</h2>
                    <p className="terms-section-text">
                        <strong>IMPORTANT:</strong> FoodSaver serves as a connecting platform only. We do not prepare,
                        handle, store, transport, or distribute food. We are not responsible for:
                    </p>
                    <ul className="terms-list">
                        <li>The quality, safety, or condition of any food donated through our platform</li>
                        <li>Any illness or injury resulting from consumption of donated food</li>
                        <li>The accuracy of information provided by restaurants or NGOs</li>
                        <li>Any disputes between restaurants and NGOs</li>
                        <li>Compliance with food safety regulations by users</li>
                    </ul>
                    <p className="terms-section-text">
                        Users are solely responsible for ensuring compliance with all applicable food safety laws and
                        regulations. Restaurants and NGOs are encouraged to consult with legal and food safety experts
                        before participating in food donation activities.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">6. Prohibited Activities</h2>
                    <p className="terms-section-text">
                        You agree not to:
                    </p>
                    <ul className="terms-list">
                        <li>Use the Service for any illegal or unauthorized purpose</li>
                        <li>Violate any laws or regulations in your jurisdiction</li>
                        <li>Infringe upon the intellectual property rights of others</li>
                        <li>Upload or transmit viruses, malware, or harmful code</li>
                        <li>Interfere with or disrupt the Service or servers</li>
                        <li>Create false or misleading listings or information</li>
                        <li>Use automated systems to access the Service without authorization</li>
                        <li>Harass, abuse, or harm other users</li>
                        <li>Collect or store personal information of other users without consent</li>
                        <li>Use the Service for commercial purposes other than food donation coordination</li>
                    </ul>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">7. Intellectual Property</h2>
                    <p className="terms-section-text">
                        The Service and its original content, features, and functionality are owned by FoodSaver and
                        are protected by international copyright, trademark, patent, trade secret, and other intellectual
                        property laws.
                    </p>
                    <p className="terms-section-text">
                        You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly
                        perform, republish, download, store, or transmit any of the material on our Service without our
                        prior written consent.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">8. Disclaimers</h2>
                    <p className="terms-section-text">
                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                        OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                        PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                    </p>
                    <p className="terms-section-text">
                        We do not warrant that the Service will be uninterrupted, secure, or error-free, or that defects
                        will be corrected. We do not warrant or make any representations regarding the accuracy, reliability,
                        or availability of the Service.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">9. Limitation of Liability</h2>
                    <p className="terms-section-text">
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FOODSAVER, ITS OFFICERS, DIRECTORS,
                        EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                        OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
                        INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
                    </p>
                    <p className="terms-section-text">
                        Our total liability for any claims arising out of or relating to the use of the Service shall
                        not exceed the amount you paid us, if any, in the twelve (12) months prior to the claim.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">10. Indemnification</h2>
                    <p className="terms-section-text">
                        You agree to defend, indemnify, and hold harmless FoodSaver and its officers, directors, employees,
                        agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses,
                        including without limitation, reasonable legal and accounting fees, arising out of or in any way
                        connected with your access to or use of the Service, your violation of these Terms, or your
                        violation of any rights of another party.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">11. Modifications to Terms</h2>
                    <p className="terms-section-text">
                        We reserve the right to modify or replace these Terms at any time. If a revision is material,
                        we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes
                        a material change will be determined at our sole discretion.
                    </p>
                    <p className="terms-section-text">
                        By continuing to access or use our Service after any revisions become effective, you agree to
                        be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">12. Termination</h2>
                    <p className="terms-section-text">
                        We may terminate or suspend your account and access to the Service immediately, without prior
                        notice or liability, for any reason, including without limitation if you breach these Terms.
                    </p>
                    <p className="terms-section-text">
                        Upon termination, your right to use the Service will immediately cease. All provisions of these
                        Terms which by their nature should survive termination shall survive, including ownership provisions,
                        warranty disclaimers, indemnity, and limitations of liability.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">13. Governing Law</h2>
                    <p className="terms-section-text">
                        These Terms shall be interpreted and governed by the laws of India, without regard to its conflict
                        of law provisions. Any disputes arising out of or relating to these Terms or the Service shall be
                        subject to the exclusive jurisdiction of the courts in West Bengal, India.
                    </p>
                </section>

                <section className="terms-section">
                    <h2 className="terms-section-title">14. Contact Information</h2>
                    <p className="terms-section-text">
                        If you have any questions about these Terms of Use, please contact us:
                    </p>
                    <div className="terms-contact-info">
                        <p><strong>Email:</strong> legal@foodsaver.com</p>
                        <p><strong>Address:</strong> Haldia Institute of Technology, Haldia, West Bengal, India</p>
                        <p><strong>Phone:</strong> +91 (XXX) XXX-XXXX</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Terms;

