import React, { useState } from "react";

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

const TasksTab = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter tasks based on status
  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  // Handle task status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
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
                <th className="p-2 whitespace-nowrap text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-100">
                  <td className="p-2">{task.id}</td>
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">
                    <select
                      className={`border px-2 py-1 rounded ${
                        task.status === "Completed"
                          ? "bg-green-100 border-green-200"
                          : task.status === "In Progress"
                          ? "bg-blue-100 border-blue-200"
                          : "bg-yellow-100 border-yellow-200"
                      }`}
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
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
  );
};

export default TasksTab;