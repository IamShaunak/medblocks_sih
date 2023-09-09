
const ProposalModal = ({ onClose, onCreate, onDataChange, proposalData, isCreatingProposal }) => {
  const handleCreateProposal = () => {
    onCreate(proposalData);

  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md w-full md:w-96">
      <h2 className="text-xl font-semibold mb-4">Create Proposal</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={proposalData.title}
          onChange={onDataChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={proposalData.description}
          onChange={onDataChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 h-32 focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={proposalData.category}
          onChange={onDataChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCreateProposal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
          disabled={isCreatingProposal}
        >
          {isCreatingProposal ? 'Creating...' : 'Create Proposal'}
        </button>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        Close
      </button>
    </div>
  );
};

export default ProposalModal;
