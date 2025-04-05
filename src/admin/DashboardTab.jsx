import React from "react";

// Sample data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Design login page",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
    dueDate: "2025-04-12",
  },
  {
    id: 2,
    title: "API integration",
    status: "Pending",
    priority: "Medium",
    assignee: "Jane Smith",
    dueDate: "2025-04-15",
  },
  {
    id: 3,
    title: "Fix navigation bug",
    status: "Completed",
    priority: "High",
    assignee: "Alex Johnson",
    dueDate: "2025-04-03",
  },
  {
    id: 4,
    title: "Update documentation",
    status: "Pending",
    priority: "Low",
    assignee: "Sam Wilson",
    dueDate: "2025-04-18",
  },
  {
    id: 5,
    title: "Server optimization",
    status: "In Progress",
    priority: "Medium",
    assignee: "John Doe",
    dueDate: "2025-04-10",
  },
];

const DashboardTab = () => {
  // Calculate task statistics
  const taskStats = {
    total: initialTasks.length,
    pending: initialTasks.filter((task) => task.status === "Pending").length,
    inProgress: initialTasks.filter((task) => task.status === "In Progress").length,
    completed: initialTasks.filter((task) => task.status === "Completed").length,
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              📊
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-2xl font-bold">{taskStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              ⏳
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold">{taskStats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              🔄
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="text-2xl font-bold">
                {taskStats.inProgress}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              ✅
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold">
                {taskStats.completed}
              </p>
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
                <th className="p-2 whitespace-nowrap text-left">
                  Task
                </th>
                <th className="p-2 whitespace-nowrap text-left">
                  Status
                </th>
                <th className="p-2 whitespace-nowrap text-left">
                  Priority
                </th>
                <th className="p-2 whitespace-nowrap text-left">
                  Assignee
                </th>
                <th className="p-2 whitespace-nowrap text-left">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {initialTasks.slice(0, 3).map((task) => (
                <tr key={task.id} className="border-b border-gray-100">
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "Medium"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
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
                  <p className="text-sm text-gray-500">
                    Completed task: Fix navigation bug
                  </p>
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
                  <p className="text-sm text-gray-500">
                    Added new task: API integration
                  </p>
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
                  <p className="text-sm text-gray-500">
                    Updated task: Design login page
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;