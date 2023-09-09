"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "../../src/components/Navbar";

export default function Home() {
  const [contentVisible, setContentVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  useEffect(() => {
    setContentVisible(true);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } },
  };

  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-12 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className={`bg-gray-100 p-4 lg:p-8 rounded-lg shadow-lg text-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-semibold mb-4"
          >
            Welcome to MedBlocks
          </motion.header>
          <motion.section variants={contentVariants}>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <motion.p variants={paragraphVariants}>
              Empowering healthcare professionals and improving patient care through decentralized governance.
            </motion.p>
          </motion.section>
          <motion.section variants={contentVariants}>
            <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc pl-6">
              <motion.li variants={paragraphVariants}>Enhanced hospital management</motion.li>
              <motion.li variants={paragraphVariants}>Optimized staffing</motion.li>
              <motion.li variants={paragraphVariants}>Improved patient experience</motion.li>
            </ul>
          </motion.section>
        </motion.div>
        <div className="absolute top-4 right-4">
          {/* Adjust button size using responsive classes */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button className="bg-blue-500 md:py-2 md:px-4 py-2 px-3 hover:bg-blue-600 text-white rounded-full transform hover:scale-105 transition duration-300">
              Connect Wallet
            </button>
          </motion.div>
        </div>
        <motion.div className={`fixed bottom-4 right-4`}>
          <button onClick={toggleChat} className="bg-blue-500 text-white py-2 px-3 rounded-full transform hover:scale-105 transition duration-300">
            Chat
          </button>
        </motion.div>
        <AnimatePresence>
          {chatVisible && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-4 right-4"
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="text-sm text-gray-500">Chat with our AI Assistant</div>
                <div className="mt-2">
                  <div className="mb-2">
                    <div className="text-left text-gray-700 p-2 bg-gray-200 rounded-lg">
                      Hello! How can I assist you today?
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-right text-blue-700 p-2 bg-blue-200 rounded-lg">
                      Sure, I can help you with that. Please provide more details.
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
