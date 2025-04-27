import React from 'react';
import { Shapes } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Shapes size={32} className="text-blue-600 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">SignSnap</h1>
          <p className="text-sm italic text-gray-600">Quick & intelligent hand gesture recognition</p>
        </div>
      </div>
    </header>
  );
};

export default Header;