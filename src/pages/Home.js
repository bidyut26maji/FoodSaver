import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = [
    "Connecting Restaurants...",
    "Feeding the Hungry...",
    "Saving Surplus Food...",
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[textIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex]);

  const statsData = [
    {
      label: "Food Saved",
      value: 1500,
      unit: "kg",
      icon: "🍽️",
      color: "from-emerald-400 to-teal-400",
    },
    {
      label: "Meals Donated",
      value: 75000,
      unit: "",
      icon: "❤️",
      color: "from-rose-400 to-pink-400",
    },
    {
      label: "Partners",
      value: 200,
      unit: "+",
      icon: "🤝",
      color: "from-blue-400 to-cyan-400",
    },
  ];

  const stepsData = [
    {
      title: "Restaurants Donate",
      description:
        "Restaurants easily list their surplus food available for donation through our user-friendly interface.",
      icon: "🏪",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "NGOs Collect",
      description:
        "NGOs can browse available donations and coordinate pickups, ensuring efficient food distribution.",
      icon: "🚚",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Impact is Measured",
      description:
        "We track the amount of food saved and meals donated, providing transparency and demonstrating the collective impact.",
      icon: "📊",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  const testimonialsData = [
    {
      quote:
        "FoodSaver has made it incredibly easy for us to donate our surplus food. It's a win-win!",
      author: "Sarah Chen",
      role: "Restaurant Owner",
      avatar: "👩‍🍳",
    },
    {
      quote:
        "Thanks to FoodSaver, we've been able to provide more meals to those in need. It's a fantastic initiative.",
      author: "David Lee",
      role: "NGO Coordinator",
      avatar: "👨‍💼",
    },
  ];

  const [countStart, setCountStart] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0a0a0a, #1a1a1a)",
        color: "white",
        overflowX: "hidden",
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Grid Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
            opacity: 0.3,
          }}
        />

        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined"
                  ? window.innerWidth
                  : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined"
                  ? window.innerHeight
                  : 1000),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x:
                Math.random() *
                (typeof window !== "undefined"
                  ? window.innerWidth
                  : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined"
                  ? window.innerHeight
                  : 1000),
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
              background: `radial-gradient(circle, rgba(16,185,129,${
                Math.random() * 0.2 + 0.1
              }), transparent)`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 20px",
            gap: "40px",
          }}
        >
          {/* Left: Text Content */}
          <div style={{ flex: 1, maxWidth: "600px" }}>
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: "900",
                marginBottom: "24px",
                background:
                  "linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
              }}
            >
              Connect, Reduce, Impact
            </motion.h1>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: "600",
                marginBottom: "24px",
                color: "#10b981",
                minHeight: "60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {currentText}
              <span style={{ opacity: 0.5 }}>|</span>
            </motion.div>

            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "rgba(255,255,255,0.7)",
                lineHeight: "1.8",
                marginBottom: "40px",
              }}
            >
              Join FoodSaver, the platform that connects restaurants with NGOs to minimize food waste and feed those in need. Together, we can make a difference.
            </motion.p>

            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "20px 48px",
                background:
                  "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                fontWeight: "700",
                fontSize: "1.25rem",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 40px rgba(16,185,129,0.4)",
              }}
            >
              Get Started
            </motion.button>
          </div>

         
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              flex: 1,
              maxWidth: "600px",
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src="https://thumbs.dreamstime.com/b/homeless-beggars-street-allahabad-india-poor-indian-woman-children-begging-food-streets-uttar-pradesh-74305275.jpg"
              alt="People in need"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            marginBottom: "120px",
            padding: "40px 0",
          }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.03 }}
              viewport={{ once: true }}
              style={{
                position: "relative",
                padding: "40px",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: `linear-gradient(to right, ${stat.color
                    .replace("from-", "#")
                    .split(" to-")
                    .join(", #")})`,
                }}
              />

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: "4rem", marginBottom: "16px" }}
              >
                {stat.icon}
              </motion.div>

              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: "900",
                  background: `linear-gradient(135deg, ${stat.color
                    .replace("from-", "#")
                    .split(" to-")
                    .join(", #")})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: "8px",
                }}
              >
                {countStart && <Counter end={stat.value} duration={2} />}
                {stat.unit}
              </div>

              <div
                style={{
                  fontSize: "1.125rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: "600",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "120px" }}
        >
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "900",
                marginBottom: "16px",
                background:
                  "linear-gradient(to right, #10b981, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              How FoodSaver Works
            </motion.h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.25rem",
                maxWidth: "700px",
                margin: "0 auto 32px",
              }}
            >
              Our platform simplifies the process of connecting restaurants with NGOs, ensuring surplus food reaches those who need it most.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "14px 32px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(16,185,129,0.3)",
                color: "#10b981",
                fontWeight: "700",
                fontSize: "1rem",
                borderRadius: "50px",
                cursor: "pointer",
              }}
            >
              Learn More
            </motion.button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
            }}
          >
            {stepsData.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                style={{
                  position: "relative",
                  padding: "40px",
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "24px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    right: "-50%",
                    width: "200%",
                    height: "200%",
                    background: `radial-gradient(circle, rgba(16,185,129,0.1), transparent 50%)`,
                    pointerEvents: "none",
                  }}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.15 + 0.2,
                  }}
                  viewport={{ once: true }}
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${step.gradient
                      .replace("from-", "#")
                      .split(" to-")
                      .join(", #")})`,
                    borderRadius: "20px",
                    fontSize: "2.5rem",
                    marginBottom: "24px",
                    boxShadow: "0 10px 30px rgba(16,185,129,0.3)",
                  }}
                >
                  {step.icon}
                </motion.div>

                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "white",
                    marginBottom: "12px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: "120px" }}
        >
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "900",
              marginBottom: "64px",
              textAlign: "center",
              background:
                "linear-gradient(to right, #10b981, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            What People Say
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "32px",
            }}
          >
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -30 : 30,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                viewport={{ once: true }}
                style={{
                  padding: "40px",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background:
                      "linear-gradient(to right, #10b981, #06b6d4)",
                  }}
                />

                <div
                  style={{
                    fontSize: "4rem",
                    marginBottom: "24px",
                    opacity: 0.3,
                  }}
                >
                  ❝
                </div>

                <p
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: "1.8",
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "32px",
                    fontStyle: "italic",
                  }}
                >
                  {testimonial.quote}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      background:
                        "linear-gradient(135deg, #10b981, #059669)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "700",
                        color: "white",
                        marginBottom: "4px",
                      }}
                    >
                      {testimonial.author}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            padding: "100px 20px",
            marginBottom: "60px",
            position: "relative",
            borderRadius: "32px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.15), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: "5rem", marginBottom: "32px" }}
            >
              🚀
            </motion.div>

            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "900",
                marginBottom: "24px",
                background:
                  "linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ready to Make a Difference?
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1.25rem",
                marginBottom: "48px",
                maxWidth: "600px",
                margin: "0 auto 48px",
              }}
            >
              Join thousands of restaurants and NGOs making an impact today
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "20px 48px",
                background:
                  "linear-gradient(135deg, #10b981, #059669)",
                color: "white",
                fontWeight: "700",
                fontSize: "1.25rem",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 40px rgba(16,185,129,0.4)",
              }}
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Counter Component
const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count.toLocaleString();
};

export default Home;
