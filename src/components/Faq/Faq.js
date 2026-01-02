import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Faq.css";

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
    <section className="faq-section">
      <h2 className="faq-title">
        Frequently Asked Questions
      </h2>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question-wrapper">
              <h3 className="faq-question">
                {faq.question}
              </h3>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="faq-icon"
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
                  <p className="faq-answer">
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
