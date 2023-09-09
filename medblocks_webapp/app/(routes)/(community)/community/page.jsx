"use client"
import React, { useState } from 'react';
import Navbar from '../../../../src/components/Navbar';
import VoteModal from '../../../../src/components/VoteModal';

const Community = () => {
  const [userAccount, setUserAccount] = useState({
    name: 'John Doe',
    address: '0x123abc...',
    tokens: 100,
  });

  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: 'Upgrade Medical Equipment',
      description: 'Proposal to upgrade hospital medical equipment.',
      votes: {
        yes: 10,
        no: 5,
        abstain: 2,
      },
    },
    {
      id: 2,
      title: 'Hire Additional Staff',
      description: 'Proposal to hire more medical staff.',
      votes: {
        yes: 8,
        no: 7,
        abstain: 3,
      },
    },
    // Add more proposals here
  ]);

  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isVoteModalOpen, setVoteModalOpen] = useState(false);

  const openVoteModal = (proposalId) => {
    setSelectedProposal(proposalId);
    setVoteModalOpen(true);
  };

  const closeVoteModal = () => {
    setSelectedProposal(null);
    setVoteModalOpen(false);
  };

  const handleVote = (proposalId, vote) => {
    if (userAccount.tokens < 1) {
      alert('You do not have enough tokens to vote.');
      return;
    }

    setProposals((prevProposals) => {
      return prevProposals.map((proposal) => {
        if (proposal.id === proposalId) {
          return {
            ...proposal,
            votes: {
              ...proposal.votes,
              [vote]: proposal.votes[vote] + 1,
            },
          };
        }
        return proposal;
      });
    });

    setUserAccount((prevUserAccount) => ({
      ...prevUserAccount,
      tokens: prevUserAccount.tokens - 1,
    }));

    closeVoteModal();
  };

  const sortProposalsByVotes = () => {
    const sortedProposals = [...proposals];
    sortedProposals.sort((a, b) => {
      const votesA = a.votes.yes + a.votes.no + a.votes.abstain;
      const votesB = b.votes.yes + b.votes.no + b.votes.abstain;
      return votesB - votesA;
    });
    setProposals(sortedProposals);
  };

  const displayVotingHistory = () => {
    alert('Displaying user voting history...');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Your Account</h2>
            <p>Name: {userAccount.name}</p>
            <p>Address: {userAccount.address}</p>
            <p>Available Tokens: {userAccount.tokens} MED</p>
            <button
              onClick={displayVotingHistory}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-2"
            >
              View Voting History
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Proposals</h2>
            <button
              onClick={sortProposalsByVotes}
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full mb-4"
            >
              Sort by Votes (Descending)
            </button>
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white p-4 shadow-md rounded-md mb-4">
                <h3 className="text-lg font-semibold">{proposal.title}</h3>
                <p>{proposal.description}</p>
                <div className="mt-2">
                  <button
                    onClick={() => openVoteModal(proposal.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                  >
                    Vote
                  </button>
                  <span className="text-green-500 hover:text-green-700 mr-2">
                    Yes: {proposal.votes.yes}
                  </span>
                  <span className="text-red-500 hover:text-red-700 mr-2">
                    No: {proposal.votes.no}
                  </span>
                  <span className="text-gray-500 hover:text-gray-700">
                    Abstain: {proposal.votes.abstain}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VoteModal
        isOpen={isVoteModalOpen}
        title="Vote on Proposal"
        onClose={closeVoteModal}
      >
        <p>Do you want to vote on this proposal?</p>
        <div className="mt-2">
          <button
            onClick={() => handleVote(selectedProposal, 'yes')}
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
          >
            Vote Yes
          </button>
          <button
            onClick={() => handleVote(selectedProposal, 'no')}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
          >
            Vote No
          </button>
          <button
            onClick={() => handleVote(selectedProposal, 'abstain')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full"
          >
            Abstain
          </button>
        </div>
      </VoteModal>
    </>
  );
};

export default Community;
