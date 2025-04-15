import React from 'react';

const Profile = ({ userData, userLogout }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-gray-600 text-2xl font-bold">
          {userData.name ? userData.name.split(' ').map(n => n[0]).join('') : 'U'}
        </div>
        <h2 className="text-xl font-semibold">{userData.name || 'User'}</h2>
        <p className="text-gray-500">{userData.email}</p>
        <p className="text-gray-500">{userData.role}</p>
        <p className="text-sm text-gray-400 mt-1">Last login: {userData.lastLogin}</p>
        <div className="mt-4 w-full">
          <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200 mb-2">
            Edit Profile
          </button>
          <button onClick={userLogout} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;