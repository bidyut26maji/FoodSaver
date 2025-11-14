import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How can restaurants donate surplus food?",
    answer:
      "Restaurants can register on our platform and list their available surplus food items. Once listed, nearby NGOs can view and request pickups.",
  },
  {
    question: "Is there any cost involved for NGOs or restaurants?",
    answer:
      "No, our platform is completely free to use for both restaurants and NGOs. We aim to promote food sharing and community welfare.",
  },
  {
    question: "How do NGOs ensure food safety?",
    answer:
      "All participating NGOs are verified and follow standard food safety guidelines. They ensure collected food is distributed promptly and hygienically.",
  },
  {
    question: "Can individuals volunteer or contribute?",
    answer:
      "Yes! Individuals can join as volunteers to help with pickups, logistics, and awareness drives in their communities.",
  },
  {
    question: "How can I contact support for help?",
    answer:
      "You can reach us through the contact form or by emailing support@foodsaver.org. Our team will get back to you within 24 hours.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      style={{
        padding: "60px 20px",
        backgroundColor: "#f8fbfa",
        borderRadius: "12px",
        margin: "60px auto",
        maxWidth: "900px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "800",
          color: "#0e1a13",
          marginBottom: "40px",
        }}
      >
        Frequently Asked Questions
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#e8f2ec",
              borderRadius: "12px",
              padding: "20px 24px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              transition: "0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => toggleFAQ(index)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  color: "#0e1a13",
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: 0,
                }}
              >
                {faq.question}
              </h3>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: "24px",
                  color: "#38e07b",
                  fontWeight: "bold",
                  lineHeight: "1",
                }}
              >
                +
              </motion.span>
            </div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <p
                    style={{
                      color: "#51946c",
                      marginTop: "12px",
                      lineHeight: "1.6",
                      fontSize: "16px",
                    }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
