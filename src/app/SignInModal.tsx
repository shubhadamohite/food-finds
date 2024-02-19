import React from 'react';

interface SignInModalProps {
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Sign in required</h2>
        <p className="text-sm mb-4">You need to sign in to like a recipe.</p>
        <button onClick={onClose} className="text-sm text-gray-500">Close</button>
      </div>
    </div>
  );
};

export default SignInModal;
