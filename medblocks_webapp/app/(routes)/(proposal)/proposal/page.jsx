"use client";
import React, { useState } from 'react';
import Navbar from '../../../../src/components/Navbar';
import ProposalModal from '../../../../src/components/ProposalModal';

const ProposalPage = () => {
  // Sample user information (replace with authenticated user data)
  const [user, setUser] = useState({
    name: 'John Doe',
    address: '0x123abc...',
    tokens: 100, // Governance tokens
  });

  // Sample proposal statuses
  const PROPOSAL_STATUS = {
    PENDING: 'Pending',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
  };

  const [proposalData, setProposalData] = useState({
    title: '',
    description: '',
    category: '', // New field for category
  });

  const [recentProposals, setRecentProposals] = useState([]);
  const [isProposalModalOpen, setProposalModalOpen] = useState(false);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [creationStatus, setCreationStatus] = useState(null);

  const openProposalModal = () => {
    setProposalModalOpen(true);
  };

  const closeProposalModal = () => {
    setProposalModalOpen(false);
    setProposalData({
      title: '',
      description: '',
      category: '',
    }); // Reset the form data
    setCreationStatus(null); // Reset the creation status
  };

  const createProposal = async () => {
    setIsCreatingProposal(true); // Set loading state

    // Deduct tokens for creating the proposal
    const updatedUser = { ...user };
    updatedUser.tokens -= 1; // Assuming 1 token is required to create a proposal

    // Simulate a delay for proposal creation (replace this with actual logic)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate a successful or failed creation (replace this with actual logic)
    const isProposalCreated = Math.random() < 0.7; // 70% success rate

    if (isProposalCreated) {
      // Proposal creation was successful
      const newProposal = {
        ...proposalData,
        status: 'Accepted', // Set status to Accepted
      };

      setRecentProposals([newProposal, ...recentProposals]);
      closeProposalModal(); // Close the modal after successful creation
    } else {
      // Proposal creation failed
      setCreationStatus('Rejected'); // Set status to Rejected
    }

    setUser(updatedUser); // Update the user's token balance
    setIsCreatingProposal(false); // Reset loading state
  };

  // Update proposalData when the form fields change
  const handleProposalDataChange = (e) => {
    const { name, value } = e.target;
    setProposalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold">Proposal Page</h1>
        <div className="bg-white p-4 shadow-md rounded-md mt-4">
          <h2 className="text-xl font-semibold">Your Account</h2>
          <p>Name: {user.name}</p>
          <p>Address: {user.address}</p>
          <p>Available Tokens: {user.tokens} MED</p>
          <button
            onClick={openProposalModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-4"
          >
            Create Proposal
          </button>
        </div>
      </div>
      {/* Inside ProposalPage component */}
      <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentProposals.map((proposal, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg border-t-4 border-blue-500 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-lg font-semibold text-blue-800">{proposal.title}</h3>
            <p className="text-gray-600">{proposal.description}</p>
            <div className="mt-2">
              <span className="text-gray-700">Status: </span>
              <span
                className={
                  proposal.status === PROPOSAL_STATUS.PENDING
                    ? 'text-yellow-500'
                    : proposal.status === PROPOSAL_STATUS.ACCEPTED
                      ? 'text-green-500'
                      : 'text-red-500'
                }
              >
                {proposal.status}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-gray-700">Category: {proposal.category}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Proposal Creation Modal*/}
      {isProposalModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-md"></div>
          <div className="relative bg-white p-4 shadow-md rounded-md">
            <button
              onClick={closeProposalModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <ProposalModal
              onClose={closeProposalModal}
              onCreate={createProposal}
              onDataChange={handleProposalDataChange} // Pass the data change handler
              proposalData={proposalData} // Pass the proposal data
              isCreatingProposal={isCreatingProposal} // Pass the loading state
            />
            {/* Display creation status within the modal */}
            {creationStatus === 'Rejected' && (
              <div className="text-red-500 mt-4 text-sm">Proposal creation failed. Please try again.</div>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default ProposalPage;
