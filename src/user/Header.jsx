import React from 'react';

const Header = ({ userName }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {userName}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            + New Project
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;