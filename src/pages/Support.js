import React from 'react';
import './Support.css'; // Import the CSS file
import { 
  Rss, 
  Truck, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Award, 
  Megaphone, 
  ClipboardList, 
  ShoppingBasket, 
  LayoutGrid, 
  Users,
  Salad,
  Menu // Added Menu icon
} from 'lucide-react';

// --- Hero Section ---
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Support & Partnership
          </h1>
          <p className="hero-subtitle">
            Detailing our features, values, and how we facilitate mutual support between restaurants and NGOs to combat food waste.
          </p>
          <div className="hero-cta-group">
            <a href="#" className="btn btn-hero-primary">
              Contact Support
            </a>
            <a href="#" className="btn btn-hero-secondary">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Features Section ---
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="info-card">
    <div className="info-card-icon-wrapper">
      <Icon className="info-card-icon" />
    </div>
    <h3 className="info-card-title">{title}</h3>
    <p className="info-card-description">
      {description}
    </p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Rss,
      title: "Real-time Matching",
      description: "Instantly connect with partners in your area when food becomes available."
    },
    {
      icon: Truck,
      title: "Logistics Coordination",
      description: "Streamline the pickup and delivery process with our integrated scheduling tools."
    },
    {
      icon: TrendingUp,
      title: "Impact Tracking",
      description: "Monitor and report on your donation efforts and environmental impact."
    }
  ];

  return (
    <section className="section-white">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Our Features
          </h2>
          <p className="section-subtitle">
            Explore the functionalities that make Foodsaver the leading platform for connecting restaurants and NGOs.
          </p>
        </div>
        <div className="info-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Integrity Section ---
const IntegritySection = () => {
  const principles = [
    {
      icon: ShieldCheck,
      title: "Food Safety Compliance",
      description: "Ensuring all donations meet health and safety regulations for safe consumption."
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Protecting the information of our partners with robust security measures."
    },
    {
      icon: Eye,
      title: "Transparent Operations",
      description: "Providing clear and honest communication about our processes and impact."
    }
  ];

  return (
    <section className="section-gray">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Our Integrity
          </h2>
          <p className="section-subtitle">
            We are committed to the highest ethical and operational standards to build a trustworthy community.
          </p>
        </div>
        <div className="info-grid">
          {principles.map((principle) => (
            <FeatureCard key={principle.title} {...principle} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Mutual Support Section ---
const SupportListItem = ({ icon: Icon, title, description }) => (
  <div className="support-list-item">
    <div className="support-list-icon-wrapper">
      <Icon className="support-list-icon" />
    </div>
    <div>
      <h4 className="support-list-title">{title}</h4>
      <p className="support-list-description">
        {description}
      </p>
    </div>
  </div>
);

const MutualSupportSection = () => {
  const ngoToRestaurant = [
    {
      icon: Award,
      title: "Waste Reduction Certification",
      description: "Receive official recognition for your sustainability efforts, enhancing your brand image."
    },
    {
      icon: Megaphone,
      title: "Community PR",
      description: "Gain positive local exposure through our partner spotlight programs and social media."
    },
    {
      icon: ClipboardList,
      title: "Simplified Logistics",
      description: "Benefit from streamlined pickup schedules managed by our dedicated NGO partners."
    }
  ];

  const restaurantToNgo = [
    {
      icon: ShoppingBasket,
      title: "Consistent Food Supply",
      description: "Access a reliable stream of high-quality, surplus food to support your mission."
    },
    {
      icon: LayoutGrid,
      title: "Variety in Donations",
      description: "Provide diverse and nutritious meal options to the communities you serve."
    },
    {
      icon: Users,
      title: "Direct Local Impact",
      description: "Forge stronger community ties by directly supporting local families and individuals in need."
    }
  ];

  return (
    <section className="section-white">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            How We Support Each Other
          </h2>
          <p className="section-subtitle">
            Our platform is built on a foundation of mutual benefit, creating a powerful cycle of support between our partners.
          </p>
        </div>
        <div className="support-grid">
          <div className="support-box">
            <h3 className="support-box-title">
              Support from NGOs to Restaurants
            </h3>
            <div className="support-list">
              {ngoToRestaurant.map((item) => (
                <SupportListItem key={item.title} {...item} />
              ))}
            </div>
          </div>
          <div className="support-box">
            <h3 className="support-box-title">
              Support from Restaurants to NGOs
            </h3>
            <div className="support-list">
              {restaurantToNgo.map((item) => (
                <SupportListItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Team Section ---
const TeamMemberCard = ({ imgSrc, name, title }) => (
  <div className="team-card">
    <img
      src={imgSrc}
      alt={name}
      className="team-card-img"
      onError={(e) => { e.target.src = 'https://placehold.co/160x160/E0E0E0/B0B0B0?text=Profile'; }}
    />
    <h3 className="team-card-name">{name}</h3>
    <p className="team-card-title">
      {title}
    </p>
  </div>
);

const TeamSection = () => {
  const team = [
    {
      imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Jane+Doe",
      name: "Jane Doe",
      title: "NGO Liaison"
    },
    {
      imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=John+Smith",
      name: "John Smith",
      title: "Restaurant Partnership Manager"
    },
    {
      imgSrc: "https://placehold.co/160x160/d1fae5/1f2937?text=Alex+Johnson",
      name: "Alex Johnson",
      title: "Technical Support Specialist"
    }
  ];

  return (
    <section className="section-gray">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Meet Our Support Team
          </h2>
          <p className="section-subtitle">
            Our dedicated team is here to ensure a seamless experience for all our partners. We're passionate about making a difference, one meal at a time.
          </p>
        </div>
        <div className="info-grid">
          {team.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="support-page-wrapper">
      <main>
        <HeroSection />
        <FeaturesSection />
        <IntegritySection />
        <MutualSupportSection />
        <TeamSection />
      </main>
    </div>
  );
}