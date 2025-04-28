import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4" style={{ backgroundColor: '#1F4959' }}>
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="p-1 bg-white rounded-2xl shadow-lg">
          <img
            src="/logo.webp"
            alt="SignSnap Logo"
            className="h-14 w-14 object-cover rounded-xl"
          />
        </div>

        {/* Text next to logo */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>SignSnap</h1>
          <p className="text-sm italic font-semibold" style={{ color: '#5C7C89' }}>
            Bridging communication through the power of SignLanguage
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
