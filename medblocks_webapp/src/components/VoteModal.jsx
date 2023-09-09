import React from 'react';

const VoteModal = ({ isOpen, title, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>
              <div className="relative p-6 flex-auto">{children}</div>
              <div className="flex items-end justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className= "text-black font-semibold px-4"
                  onClick={onClose}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
      )}
    </>
  );
};

export default VoteModal;
