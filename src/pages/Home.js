import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

// --- Inlined useTypewriter Hook ---
// This hook provides the typing animation text
const useTypewriter = (texts, speed = 100, pause = 1500) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentText = texts[index];

    // Handle deleting
    if (isDeleting) {
      if (subIndex > 0) {
        const timeout = setTimeout(() => {
          setText(currentText.substring(0, subIndex - 1));
          setSubIndex(subIndex - 1);
        }, speed / 2); // Faster deleting
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setSubIndex(0); // Reset subIndex for new text
      }
    }
    // Handle typing
    else {
      if (subIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setText(currentText.substring(0, subIndex + 1));
          setSubIndex(subIndex + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Pause at end of word
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, isDeleting, index, texts, speed, pause]);

  return text;
};

// --- Inlined SimpleCountUp Component ---
// Replaces the 'react-countup' library
const SimpleCountUp = ({ end, duration = 2, start = 0, startAnimation }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    // Don't start if prop is false
    if (!startAnimation) {
      return;
    }

    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round((duration * 1000) / frameRate);
    const increment = (end - start) / totalFrames;
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const newCount = start + increment * currentFrame;

      if (currentFrame >= totalFrames) {
        setCount(end); // Ensure it finishes precisely on 'end'
        clearInterval(counter);
      } else {
        setCount(newCount);
      }
    }, frameRate);

    // Cleanup function
    return () => clearInterval(counter);
  }, [end, start, duration, startAnimation]); // Add startAnimation to dependency array

  // Format number with commas
  const formatNumber = (num) => {
    if (num >= end) {
      return end.toLocaleString();
    }
    // Use ceil to make numbers count up nicely
    return Math.ceil(num).toLocaleString();
  };

  return <>{formatNumber(count)}</>;
};


// --- Main Home Component ---
const Home = () => {
  const typewriterTexts = ["Connecting Restaurants...", "Feeding the Hungry...", "Saving Surplus Food..."];
  const typewriterText = useTypewriter(typewriterTexts, 100);

  // Added state for CountUp animation
  const [countStart, setCountStart] = useState(false);

  // Corrected statsData to include properties used in the JSX (icon, color, value, unit)
  // This is necessary to prevent runtime errors when accessing stat.color, stat.icon, etc.
  const statsData = [
    {
      label: "Food Saved",
      value: 1500,
      unit: "kg",
      icon: "KG", // Placeholder icon
      color: "from-emerald-400 to-teal-400", // Placeholder color
    },
    {
      label: "Meals Donated",
      value: 75000,
      unit: "",
      icon: "🍲", // Placeholder icon
      color: "from-sky-400 to-cyan-400",
    },
    {
      label: "Partners",
      value: 200,
      unit: "+",
      icon: "🤝", // Placeholder icon
      color: "from-purple-400 to-indigo-400",
    },
  ];

  const stepsData = [
    {
      title: 'Restaurants Donate',
      description: 'Restaurants easily list their surplus food available for donation through our user-friendly interface.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M220.2,100l-18-31.18a28,28,0,0,0-47.3-1.92L139.56,40.31a28,28,0,0,0-48.12-.63,28,28,0,0,0-43,34.78l3.34,5.79a28,28,0,0,0-22,41.92l38,65.82a87.46,87.46,0,0,0,53.43,41,88.56,88.56,0,0,0,22.92,3A88,88,0,0,0,220.2,100Zm-6.67,62.63A72,72,0,0,1,81.63,180l-38-65.82a12,12,0,0,1,20.79-12l22,38.1a8,8,0,1,0,13.85-8l-38-65.81a12,12,0,0,1,13.5-17.59,11.9,11.9,0,0,1,7.29,5.59l34,58.89a8,8,0,0,0,13.85-8l-26-45h0a12,12,0,0,1,20.78-12L160,107.78a48.08,48.08,0,0,0-11,61,8,8,0,0,0,13.86-8,32,32,0,0,1,11.71-43.71,8,8,0,0,0,2.93-10.93l-10-17.32a12,12,0,0,1,20.78-12l18,31.18A71.49,71.49,0,0,1,213.53,162.62ZM184.27,29.93a8,8,0,0,1,9.8-5.66c15.91,4.27,29,14.11,36.86,27.73a8,8,0,0,1-13.86,8c-5.72-9.92-15.36-17.12-27.14-20.27A8,8,0,0,1,184.27,29.93ZM80.91,237a8,8,0,0,1-11.24,1.33c-11-8.69-20.11-19.58-28.6-34.28a8,8,0,0,1,13.86-8c7.44,12.88,15.27,22.32,24.65,29.72A8,8,0,0,1,80.91,237Z" />
        </svg>
      )
    },
    {
      title: 'NGOs Collect',
      description: 'NGOs can browse available donations and coordinate pickups, ensuring efficient food distribution.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
        </svg>
      )
    },
    {
      title: 'Impact is Measured',
      description: 'We track the amount of food saved and meals donated, providing transparency and demonstrating the collective impact.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z" />
        </svg>
      )
    },
  ];

  const testimonialsData = [
    {
      quote: '"FoodSaver has made it incredibly easy for us to donate our surplus food. It\'s a win-win!"',
      author: '- Sarah Chen, Restaurant Owner',
      imageClass: 'testimonial-image-1'
    },
    {
      quote: '"Thanks to FoodSaver, we\'ve been ableto provide more meals to those in need. It\'s a fantastic initiative."',
      author: '- David Lee, NGO Coordinator',
      imageClass: 'testimonial-image-2'
    }
  ];

  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="home-bg">
        {/* Grid Pattern */}
        <div className="home-bg-grid" />

        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              position: "absolute",
              width: Math.random() * 300 + 100 + "px",
              height: Math.random() * 300 + 100 + "px",
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(56, 224, 123, ${Math.random() * 0.2 + 0.1}), transparent)`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <div className="home-content">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="home-hero"
        >
          {/* Left: Text Content */}
          <div className="home-hero-text">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="home-hero-title"
            >
              Connect, Reduce, Impact
            </motion.h1>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="home-hero-typewriter"
            >
              {typewriterText}
              <span className="home-hero-typewriter-cursor">|</span>
            </motion.div>

            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="home-hero-description"
            >
              Join FoodSaver, the platform that connects restaurants with NGOs to minimize food waste and feed those in need. Together, we can make a difference.
            </motion.p>

            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <motion.button
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="home-hero-cta"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Right: Image Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="home-hero-image"
          >
            <img
              src="https://thumbs.dreamstime.com/b/homeless-beggars-street-allahabad-india-poor-indian-woman-children-begging-food-streets-uttar-pradesh-74305275.jpg"
              alt="People in need"
            />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setCountStart(true)}
          transition={{ duration: 0.8 }}
          className="home-stats"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.03 }}
              viewport={{ once: true }}
              className="home-stat-card"
            >
              <div className="home-stat-card-top" />

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="home-stat-icon"
              >
                {stat.icon}
              </motion.div>

              <div className="home-stat-value">
                {countStart && <SimpleCountUp end={stat.value} duration={2} startAnimation={countStart} />}
                {stat.unit}
              </div>

              <div className="home-stat-label">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="home-testimonials"
      >
        <h2 className="home-testimonials-title">Testimonials</h2>
        <div className="home-testimonials-grid">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="home-testimonial-card"
            >
              <div
                className={`home-testimonial-avatar ${testimonial.imageClass}`}
              ></div>
              <div>
                <p className="home-testimonial-quote">
                  {testimonial.quote}
                </p>
                <p className="home-testimonial-author">
                  {testimonial.author}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Final CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="home-final-cta"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="home-final-cta-card"
        >
          <h1 className="home-final-cta-title">
            Ready to Make a Difference?
          </h1>
          <Link to="/registration" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="home-final-cta-button"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;