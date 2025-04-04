import React, { useState } from 'react';

// Sample data for tasks
const initialTasks = [
  { id: 1, title: 'Design login page', status: 'In Progress', priority: 'High', assignee: 'John Doe', dueDate: '2025-04-12' },
  { id: 2, title: 'API integration', status: 'Pending', priority: 'Medium', assignee: 'Jane Smith', dueDate: '2025-04-15' },
  { id: 3, title: 'Fix navigation bug', status: 'Completed', priority: 'High', assignee: 'Alex Johnson', dueDate: '2025-04-03' },
  { id: 4, title: 'Update documentation', status: 'Pending', priority: 'Low', assignee: 'Sam Wilson', dueDate: '2025-04-18' },
  { id: 5, title: 'Server optimization', status: 'In Progress', priority: 'Medium', assignee: 'John Doe', dueDate: '2025-04-10' },
];

// Sample data for teams
const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Frontend Developer', tasks: 2 },
  { id: 2, name: 'Jane Smith', role: 'Backend Developer', tasks: 1 },
  { id: 3, name: 'Alex Johnson', role: 'UI/UX Designer', tasks: 1 },
  { id: 4, name: 'Sam Wilson', role: 'Project Manager', tasks: 1 },
];

const AdminDashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter tasks based on status
  const filteredTasks = statusFilter === 'All' 
    ? tasks 
    : tasks.filter(task => task.status === statusFilter);

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'Pending').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    completed: tasks.filter(task => task.status === 'Completed').length,
  };

  // Handle task status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-indigo-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">TaskMaster Admin</h1>
        <button 
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'block' : 'hidden'} md:block
        w-full md:w-64 bg-indigo-800 text-white p-6
        md:h-screen md:static fixed inset-0 z-50
        overflow-y-auto
      `}>
        <div className="md:hidden flex justify-end mb-4">
          <button 
            onClick={toggleSidebar} 
            className="text-white focus:outline-none"
          >
            ✕
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-8 hidden md:block">TaskMaster Admin</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <button 
                className={`flex items-center w-full p-2 rounded ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => {
                  setActiveTab('dashboard');
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-3">📊</span> Dashboard
              </button>
            </li>
            <li className="mb-4">
              <button 
                className={`flex items-center w-full p-2 rounded ${activeTab === 'tasks' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => {
                  setActiveTab('tasks');
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-3">📝</span> Tasks
              </button>
            </li>
            <li className="mb-4">
              <button 
                className={`flex items-center w-full p-2 rounded ${activeTab === 'team' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => {
                  setActiveTab('team');
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-3">👥</span> Team
              </button>
            </li>
            <li className="mb-4">
              <button 
                className={`flex items-center w-full p-2 rounded ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => {
                  setActiveTab('settings');
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-3">⚙️</span> Settings
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-8">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
              A
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-indigo-300">admin@taskmaster.com</p>
            </div>
          </div>
          <button className="flex items-center text-sm text-indigo-300 hover:text-white">
            <span className="mr-2">🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4 md:hidden">
                ☰
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'tasks' && 'Task Management'}
                {activeTab === 'team' && 'Team Members'}
                {activeTab === 'settings' && 'System Settings'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                🔔
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                📧
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">📊</div>
                    <div>
                      <p className="text-sm text-gray-500">Total Tasks</p>
                      <p className="text-2xl font-bold">{taskStats.total}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">⏳</div>
                    <div>
                      <p className="text-sm text-gray-500">Pending</p>
                      <p className="text-2xl font-bold">{taskStats.pending}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">🔄</div>
                    <div>
                      <p className="text-sm text-gray-500">In Progress</p>
                      <p className="text-2xl font-bold">{taskStats.inProgress}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">✅</div>
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-2xl font-bold">{taskStats.completed}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Tasks */}
              <div className="bg-white rounded-lg shadow mb-6 md:mb-8">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium">Recent Tasks</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-500">
                      <tr>
                        <th className="p-2 whitespace-nowrap text-left">Task</th>
                        <th className="p-2 whitespace-nowrap text-left">Status</th>
                        <th className="p-2 whitespace-nowrap text-left">Priority</th>
                        <th className="p-2 whitespace-nowrap text-left">Assignee</th>
                        <th className="p-2 whitespace-nowrap text-left">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {tasks.slice(0, 3).map(task => (
                        <tr key={task.id} className="border-b border-gray-100">
                          <td className="p-2">{task.title}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              task.priority === 'High' ? 'bg-red-100 text-red-800' :
                              task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="p-2">{task.assignee}</td>
                          <td className="p-2">{task.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Team Activity */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium">Team Activity</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-3">
                          J
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-gray-500">Completed task: Fix navigation bug</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white mr-3">
                          J
                        </div>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-sm text-gray-500">Added new task: API integration</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                          A
                        </div>
                        <div>
                          <p className="font-medium">Alex Johnson</p>
                          <p className="text-sm text-gray-500">Updated task: Design login page</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                <div>
                  <select 
                    className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full sm:w-auto">
                  + Add New Task
                </button>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium">Tasks List</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-500">
                      <tr>
                        <th className="p-2 whitespace-nowrap text-left">ID</th>
                        <th className="p-2 whitespace-nowrap text-left">Task</th>
                        <th className="p-2 whitespace-nowrap text-left">Status</th>
                        <th className="p-2 whitespace-nowrap text-left">Priority</th>
                        <th className="p-2 whitespace-nowrap text-left">Assignee</th>
                        <th className="p-2 whitespace-nowrap text-left">Due Date</th>
                        <th className="p-2 whitespace-nowrap text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredTasks.map(task => (
                        <tr key={task.id} className="border-b border-gray-100">
                          <td className="p-2">{task.id}</td>
                          <td className="p-2">{task.title}</td>
                          <td className="p-2">
                            <select 
                              className={`border px-2 py-1 rounded ${
                                task.status === 'Completed' ? 'bg-green-100 border-green-200' :
                                task.status === 'In Progress' ? 'bg-blue-100 border-blue-200' :
                                'bg-yellow-100 border-yellow-200'
                              }`}
                              value={task.status}
                              onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              task.priority === 'High' ? 'bg-red-100 text-red-800' :
                              task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="p-2">{task.assignee}</td>
                          <td className="p-2">{task.dueDate}</td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-500 hover:text-blue-700">
                                ✏️
                              </button>
                              <button className="p-1 text-red-500 hover:text-red-700">
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                <h3 className="text-lg font-medium">Team Management</h3>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full sm:w-auto">
                  + Add Team Member
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers.map(member => (
                  <div key={member.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl mr-4">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold">{member.name}</h4>
                        <p className="text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm sm:items-center gap-2 sm:gap-0">
                      <span className="text-gray-500">Assigned Tasks: <span className="font-bold">{member.tasks}</span></span>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">View</button>
                        <button className="text-red-500 hover:text-red-700">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium">System Settings</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">General Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          System Name
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2"
                          defaultValue="TaskMaster"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded p-2"
                          defaultValue="admin@taskmaster.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timezone
                        </label>
                        <select className="w-full border border-gray-300 rounded p-2">
                          <option>UTC (GMT+0)</option>
                          <option>America/New_York (GMT-4)</option>
                          <option>Europe/London (GMT+1)</option>
                          <option>Asia/Tokyo (GMT+9)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Notification Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="email-notif" className="mr-2" defaultChecked />
                        <label htmlFor="email-notif">Email Notifications</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="task-notif" className="mr-2" defaultChecked />
                        <label htmlFor="task-notif">Task Assignment Notifications</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="due-notif" className="mr-2" defaultChecked />
                        <label htmlFor="due-notif">Due Date Reminders</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="system-notif" className="mr-2" />
                        <label htmlFor="system-notif">System Updates</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 sm:mr-2 order-2 sm:order-1">
                    Save Changes
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 order-1 sm:order-2">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;