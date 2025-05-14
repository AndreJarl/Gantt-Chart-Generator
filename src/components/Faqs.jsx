import React, { useState } from "react";

const faqs = [
{
    question: "Who can use this Gantt chart generator?",
    answer:
      "Our tool is designed for students who need to manage and visualize tasks efficiently.",
  },
  {
    question: "Do I need to create an account to use the generator?",
    answer:
      "You can create Gantt charts without an account.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, the basic Gantt chart generator is completely free to use.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <h2 className="text-3xl font-bold mb-6 text-center">📌 Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-2xl p-4 shadow-sm transition-all duration-300 bg-white">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left font-semibold text-lg flex justify-between items-center"
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
