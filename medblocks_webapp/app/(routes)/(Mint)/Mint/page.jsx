"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import BirthdayCrackers from './BirthdayCrackers';

const TokenMintingPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTokens, setMintedTokens] = useState([]);
  const [isTransactionSuccessful, setTransactionSuccessful] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false); // Add state for celebration
  const [isBackgroundVisible, setBackgroundVisible] = useState(true); // Add state for background visibility

  const openModal = () => {
    setModalOpen(true);
    setBackgroundVisible(false); // Hide the background
  };

  const closeModal = () => {
    setModalOpen(false);
    setAmount('');
    setTransactionSuccessful(false);
    setCelebrationActive(false); // Close celebration when modal is closed
    setBackgroundVisible(true); // Show the background
  };

  const mintTokens = async () => {
    setIsMinting(true);

    // Simulate a delay for minting (replace this with actual logic)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate a successful or failed minting (replace this with actual logic)
    const isSuccess = Math.random() < 0.7; // 70% success rate

    if (isSuccess) {
      const newTransaction = {
        address: '0x123abc...',
        tokens: parseInt(amount),
      };

      setMintedTokens([newTransaction, ...mintedTokens]);
      setTransactionSuccessful(true);

      // Enable celebration after a successful transaction
      setCelebrationActive(true);

      // Close the modal automatically after a successful transaction
      setTimeout(() => {
        closeModal();
      }, 3000); // Close after 3 seconds
    }

    setIsMinting(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-4">MedBlocks Token Minting</h1>
      <div className="bg-white p-6 shadow-md rounded-md mt-4 md:w-1/2 mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Your Balance</label>
          <p className="text-lg font-semibold text-blue-500">100 MED</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Mint Tokens</label>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full ml-2 transition-transform"
            >
              Mint
            </button>
          </div>
        </div>
        {mintedTokens.length > 0 && (
          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">Recent Transactions</label>
            <ul className="list-disc pl-6">
              {mintedTokens.map((transaction, index) => (
                <li key={index} className="text-gray-600">
                  Address: {transaction.address}, Tokens: {transaction.tokens}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-0 flex items-center justify-center z-50 ${
              isBackgroundVisible ? 'bg-gray-900 bg-opacity-50' : '' // Add background only when visible
            } backdrop-blur-md`}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-white p-6 shadow-md rounded-md md:w-1/2 mx-auto"
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Confirm Transaction</label>
                <p className="text-lg font-semibold text-blue-500">Mint {amount} MED tokens?</p>
              </div>
              <button
                onClick={mintTokens}
                disabled={isMinting}
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full ${
                  isMinting ? 'cursor-not-allowed' : 'hover:shadow-md transition-transform'
                }`}
              >
                {isMinting ? 'Minting...' : 'Confirm Mint'}
              </button>
              {isMinting && (
                <div className="text-center mt-4">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
              {isTransactionSuccessful && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-center text-green-500 font-semibold"
                >
                  <p>Tokens minted successfully!</p>
                  {/* Render the BirthdayCrackers component here */}
                  {celebrationActive && (
                    <Canvas style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
                      <BirthdayCrackers />
                    </Canvas>
                  )}
                </motion.div>
              )}
              {!isMinting && !amount && (
                <p className="mt-4 text-center text-red-500 font-semibold">Please enter an amount.</p>
              )}
              {!isMinting && amount && !Number.isInteger(parseFloat(amount)) && (
                <p className="mt-4 text-center text-red-500 font-semibold">Please enter a valid amount.</p>
              )}
            </motion.div>
          </motion.div>
        )}
        <div className="mt-8"></div>
      </AnimatePresence>
    </div>
  );
};

export default TokenMintingPage;
