import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Profile from './Profile';
import MetricsCards from './MetricsCards';
import TaskUpdateModal from './TaskUpdateModal';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

const UserDashboard = () => {
  const userId = localStorage.getItem("userMongoId"); // MongoDB _id stored as taskid in task
  const userName = localStorage.getItem("userName") || "User";
  const userEmail = localStorage.getItem("userEmail") || "alex@example.com";
  const userIdName=localStorage.getItem("userId") || "User ID";
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All"); // Default filter: All
  const [isLoading, setIsLoading] = useState(true);
  
  const userLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  
  const fetchUserTasks = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/tasks/usertaskdisplay`, {
        params: { id: userId }, // userMongoId used to match task.taskid
      });
      
      // Sort tasks by creation date (newest first)
      const sortedTasks = [...res.data].sort((a, b) => 
        new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
      );
      
      setTasks(sortedTasks);
      applyFilter(sortedTasks, statusFilter);
    } catch (err) {
      // Handle 404 differently than other errors
      if (err.response && err.response.status === 404) {
        // No tasks found - this is actually okay, just set empty array
        setTasks([]);
        setFilteredTasks([]);
        console.log("No tasks found for this user");
      } else {
        console.error("Error fetching user tasks:", err);
        toast.error("Failed to load tasks. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Apply status filter to tasks
  const applyFilter = (taskList, filter) => {
    if (filter === "All") {
      setFilteredTasks(taskList);
    } else {
      const filtered = taskList.filter(task => task.status === filter);
      setFilteredTasks(filtered);
    }
  };
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    applyFilter(tasks, filter);
  };
    
  // Initial fetch on component mount
  useEffect(() => {
    if (userId) {
      console.log("Logged in User ID:", userId);
      fetchUserTasks();
    }
  }, [userId]);
  
  // Set up polling to check for new tasks regularly
  useEffect(() => {
    if (!userId) return;
    
    // Fetch tasks every 10 seconds
    const intervalId = setInterval(() => {
      fetchUserTasks();
    }, 10000); // 10 seconds interval
    
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);
  
  // Re-apply filter when status filter changes
  useEffect(() => {
    applyFilter(tasks, statusFilter);
  }, [statusFilter, tasks]);
  
  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };
  
  const handleTaskUpdate = (updatedTask) => {
    // Store the old task to compare status change
    const oldTask = tasks.find(task => task._id === updatedTask._id);
    
    // Update tasks state
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    
    // Show toast notification if status changed
    if (oldTask && oldTask.status !== updatedTask.status) {
      const statusIcons = {
        "Completed": "✅",
        "In Progress": "🔄",
        "Pending": "⏳"
      };
      
      toast.success(
        <div>
          <span className="font-bold">Task status updated</span>
          <p className="text-sm">
            {statusIcons[updatedTask.status] || ''} 
            {oldTask.title} is now <span className="font-medium">{updatedTask.status}</span>
          </p>
        </div>,
        {
          duration: 4000,
          style: {
            borderLeft: updatedTask.status === "Completed" ? 
              "4px solid #10B981" : updatedTask.status === "In Progress" ? 
              "4px solid #3B82F6" : "4px solid #F59E0B"
          }
        }
      );
    }
  };
  
  const isTaskExpired = (dueDate) => {
    return new Date(dueDate) < new Date();
  };
    
  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  
  const userData = {
    name: userName,
    email: userEmail,
    userIdName: userIdName,
    role: "User",
    lastLogin: "2 hours ago",
    metrics: {
      tasks: tasks.length,
      completed,
      pending
    }
  };
  
  // Get task card background color based on priority
  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high':
        return 'bg-gradient-to-r from-pink-50 to-red-50 border-l-4 border-red-500';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500';
      case 'low':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500';
      default:
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500';
    }
  };
  
  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Get due date color and icon
  const getDueDateInfo = (dueDate, isCompleted) => {
    const expired = isTaskExpired(dueDate);
    
    if (isCompleted) {
      return {
        className: 'text-green-600',
        icon: '✓',
        text: 'Completed'
      };
    } else if (expired) {
      return {
        className: 'text-red-600 font-medium',
        icon: '⚠️',
        text: 'Expired'
      };
    } else {
      // Calculate days remaining
      const today = new Date();
      const due = new Date(dueDate);
      const diffTime = Math.abs(due - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 2) {
        return {
          className: 'text-orange-600',
          icon: '⏰',
          text: `${diffDays} day${diffDays !== 1 ? 's' : ''} left`
        };
      } else {
        return {
          className: 'text-gray-600',
          icon: '📅',
          text: `${diffDays} days left`
        };
      }
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* React Hot Toast container */}
      {/* <Toaster position="top-right" /> */}
      
      <Header userName={userName} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Profile userData={userData} userLogout={userLogout} />
          </div>
          
          <div className="md:col-span-3">
            <MetricsCards metrics={userData.metrics} />
            
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Your Tasks</h2>
                
                <div className="flex items-center space-x-3">
                  {/* Status Filter */}
                  <div className="flex bg-white rounded-lg shadow-sm p-1 border border-gray-200">
                    <button
                      onClick={() => handleFilterChange("All")}
                      className={`px-3 py-1 text-sm rounded-md transition-all ${
                        statusFilter === "All" 
                          ? "bg-indigo-100 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      All ({tasks.length})
                    </button>
                    <button
                      onClick={() => handleFilterChange("Pending")}
                      className={`px-3 py-1 text-sm rounded-md transition-all ${
                        statusFilter === "Pending" 
                          ? "bg-yellow-100 text-yellow-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Pending ({pending})
                    </button>
                    <button
                      onClick={() => handleFilterChange("In Progress")}
                      className={`px-3 py-1 text-sm rounded-md transition-all ${
                        statusFilter === "In Progress" 
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      In Progress ({inProgress})
                    </button>
                    <button
                      onClick={() => handleFilterChange("Completed")}
                      className={`px-3 py-1 text-sm rounded-md transition-all ${
                        statusFilter === "Completed" 
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Completed ({completed})
                    </button>
                  </div>
                  
                  {/* Priority Legend */}
                  <div className="hidden lg:flex gap-2 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span> High
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span> Medium
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span> Low
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {isLoading ? (
                  <div className="p-8 text-center bg-white rounded-lg shadow">
                    <p className="text-gray-500 text-lg">Loading tasks...</p>
                  </div>
                ) : filteredTasks.length > 0 ? (
                  filteredTasks.map(task => {
                    const isCompleted = task.status === "Completed";
                    const dueDateInfo = getDueDateInfo(task.dueDate, isCompleted);
                    
                    return (
                      <div 
                        key={task._id} 
                        className={`p-5 rounded-lg shadow-md hover:shadow-lg transition-all ${getPriorityColor(task.priority)}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className={`text-lg font-bold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                {task.title}
                              </h3>
                              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusBadge(task.status)}`}>
                                {task.status}
                              </span>
                            </div>
                            
                            <p className={`mt-2 text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                              {task.description}
                            </p>
                            
                            <div className="mt-4 flex flex-wrap gap-3">
                              <span className="inline-flex items-center text-xs font-medium">
                                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${task.priority?.toLowerCase() === 'high' ? 'bg-red-500' : task.priority?.toLowerCase() === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                                {task.priority} Priority
                              </span>
                              
                              <span className={`inline-flex items-center text-xs font-medium ${dueDateInfo.className}`}>
                                <span className="mr-1">{dueDateInfo.icon}</span>
                                {new Date(task.dueDate).toLocaleDateString()} • {dueDateInfo.text}
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleOpenModal(task)}
                            disabled={isCompleted}
                            className={`px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all ${
                              isCompleted
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow"
                            }`}
                          >
                            {isCompleted ? "Completed" : "Update"}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center bg-white rounded-lg shadow">
                    {tasks.length > 0 ? (
                      <>
                        <p className="text-gray-500 text-lg">No {statusFilter.toLowerCase()} tasks found.</p>
                        <p className="text-sm text-gray-400 mt-1">Try changing the filter to see more tasks.</p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-500 text-lg">No tasks assigned to you yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Tasks will appear here when they're assigned.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {showModal && selectedTask && (
        <TaskUpdateModal 
          task={selectedTask}
          onClose={handleCloseModal}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default UserDashboard;