// import React, { useState } from 'react';


// const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   const userLogout = () => {
//     // Logic to handle user logout

//     console.log("User logged out");
//     // Redirect to login page or perform any other action 
//     window.location.href = '/'; // Example redirect
//   };
  
  
//   const userName = localStorage.getItem("userName");
//   const userEmail = localStorage.getItem("userEmail");
//   const userId = localStorage.getItem("userId");
 
//   console.log("userName:", userName);
//   console.log("userEmail:", userEmail);
//   console.log("userId:", userId);
  
  

//   // Sample user data
//   const userData = {
//     email: "alex@example.com",
//     role: "Administrator",
//     lastLogin: "2 hours ago",
//     metrics: {
//       projects: 12,
//       tasks: 34,
//       completed: 27,
//       pending: 7
//     },
//     activities: [
//       { id: 1, type: "task", description: "Completed project review", time: "1 hour ago" },
//       { id: 2, type: "comment", description: "Left feedback on design mockup", time: "3 hours ago" },
//       { id: 3, type: "upload", description: "Uploaded new documents", time: "Yesterday" },
//       { id: 4, type: "task", description: "Created weekly report", time: "2 days ago" }
//     ]
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//             <p className="text-sm text-gray-500">Welcome back, {userName}</p>
//           </div>
//           <div className="mt-2 sm:mt-0">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
//               + New Project
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {/* User Profile Card */}
//           <div className="md:col-span-1">
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex flex-col items-center">
//                 <div className="h-24 w-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-gray-600 text-2xl font-bold">
//                   {userData.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <h2 className="text-xl font-semibold">{userData.name}</h2>
//                 <p className="text-gray-500">{userData.role}</p>
//                 <p className="text-sm text-gray-400 mt-1">Last login: {userData.lastLogin}</p>
//                 <div className="mt-4 w-full">
//                   <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200">
//                     Edit Profile
//                   </button>
//                   <button onClick={userLogout} className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200">
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Dashboard Area */}
//           <div className="md:col-span-3">
//             {/* Metrics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               <div className="bg-white rounded-lg shadow p-4">
//                 <p className="text-gray-500 text-sm">Projects</p>
//                 <p className="text-2xl font-bold">{userData.metrics.projects}</p>
//               </div>
//               <div className="bg-white rounded-lg shadow p-4">
//                 <p className="text-gray-500 text-sm">Total Tasks</p>
//                 <p className="text-2xl font-bold">{userData.metrics.tasks}</p>
//               </div>
//               <div className="bg-white rounded-lg shadow p-4">
//                 <p className="text-gray-500 text-sm">Completed</p>
//                 <p className="text-2xl font-bold text-green-600">{userData.metrics.completed}</p>
//               </div>
//               <div className="bg-white rounded-lg shadow p-4">
//                 <p className="text-gray-500 text-sm">Pending</p>
//                 <p className="text-2xl font-bold text-yellow-600">{userData.metrics.pending}</p>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="bg-white rounded-lg shadow mb-6">
//               <div className="border-b">
//                 <nav className="flex -mb-px">
//                   <button 
//                     onClick={() => setActiveTab('overview')}
//                     className={`py-4 px-6 text-sm font-medium ${
//                       activeTab === 'overview' 
//                         ? 'border-b-2 border-blue-500 text-blue-600'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Overview
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('projects')}
//                     className={`py-4 px-6 text-sm font-medium ${
//                       activeTab === 'projects' 
//                         ? 'border-b-2 border-blue-500 text-blue-600'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Projects
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('tasks')}
//                     className={`py-4 px-6 text-sm font-medium ${
//                       activeTab === 'tasks' 
//                         ? 'border-b-2 border-blue-500 text-blue-600'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Tasks
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('settings')}
//                     className={`py-4 px-6 text-sm font-medium ${
//                       activeTab === 'settings' 
//                         ? 'border-b-2 border-blue-500 text-blue-600'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     Settings
//                   </button>
//                 </nav>
//               </div>

//               {/* Tab Content */}
//               <div className="p-6">
//                 {activeTab === 'overview' && (
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
//                     <div className="space-y-4">
//                       {userData.activities.map((activity) => (
//                         <div key={activity.id} className="flex items-start">
//                           <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                             {activity.type === 'task' && (
//                               <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                               </svg>
//                             )}
//                             {activity.type === 'comment' && (
//                               <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                               </svg>
//                             )}
//                             {activity.type === 'upload' && (
//                               <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                               </svg>
//                             )}
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium">{activity.description}</p>
//                             <p className="text-xs text-gray-500">{activity.time}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {activeTab === 'projects' && (
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Your Projects</h3>
//                     <p className="text-gray-500">Project content would be displayed here.</p>
//                   </div>
//                 )}
//                 {activeTab === 'tasks' && (
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Your Tasks</h3>
//                     <p className="text-gray-500">Task content would be displayed here.</p>
//                   </div>
//                 )}
//                 {activeTab === 'settings' && (
//                   <div>
//                     <h3 className="text-lg font-medium mb-4">Account Settings</h3>
//                     <p className="text-gray-500">Settings content would be displayed here.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;







import React, { useState } from 'react';
import Header from './Header';
import Profile from './Profile';
import MetricsCards from './MetricsCards';


const UserDashboard = () => {
 

  const userLogout = () => {
    console.log("User logged out");
    window.location.href = '/';
  };
  
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");
 
  console.log("userName:", userName);
  console.log("userEmail:", userEmail);
  console.log("userId:", userId);
  
  // Sample user data
  const userData = {
    name: userName,
    email: userEmail || "alex@example.com",
    role: "Administrator",
    lastLogin: "2 hours ago",
    metrics: {
      tasks: 34,
      completed: 27,
      pending: 7
    },
  
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Component */}
      <Header userName={userName} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* User Profile Card */}
          <div className="md:col-span-1">
            <Profile userData={userData} userLogout={userLogout} />
          </div>

          {/* Main Dashboard Area */}
          <div className="md:col-span-3">
            {/* Metrics Cards */}
            <MetricsCards metrics={userData.metrics} />

            {/* Tabs */}
         
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;