import React, { useState } from "react";
import "./Faq.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "What shipping methods are available?",
      answer:
        "Marwues rhues edites sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Rhiues uleresume rkoes consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
      question: "What shipping methods are available?",
      answer:
        "Heries feruesm geruesm ueres, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container">
      <div className="row faq-page">
        {/* Section Heading */}
        <div className="section-head dt-sc-heading text-start">
          <h4 className="dt-sc-sub-heading">Faq</h4>
          <h2 className="dt-sc-main-heading">Frequently Asked Questions</h2>
        </div>

        <div className="dt-sc-column two-column">
          {/* FAQ Content */}
          <div className="dt-sc-faqs">
            <div className="dt-sc-accordion-container text-start default-style">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div
                    className={`dt-sc-accordion-btn ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <h5>{faq.question}</h5>
                  </div>
                  <div
                    className={`dt-sc-accordion-content ${
                      activeIndex === index ? "open" : ""
                    }`}
                  >
                    <div className="dt-sc-accordion-content-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="dt-sc-faqs_image">
            <img
              src="https://orgass.myshopify.com/cdn/shop/files/abo05_680x660.jpg?v=1641380281"
              alt="FAQ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
