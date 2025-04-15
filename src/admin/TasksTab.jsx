import React, { useState, useEffect } from "react";
import TaskEditModal from "./task/TaskEditModal";
import NewTask from "./task/NewTask";
import { getAllTasks, deleteTask } from "../api/taskapi";

const TasksTab = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  const refreshTasks = async () => {
    try {
      const data = await getAllTasks();
      console.log("Fetched tasks from API:", data);
      const assignedTasks = data.filter((task) => task.assignee);
      console.log("Filtered Assigned Tasks:", assignedTasks);
      setTasks(assignedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(selectedTask._id);
      setShowDeleteModal(false);
      await refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    // Update the tasks list with the updated task
    setTasks(
      tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    // Refresh tasks from server to ensure data consistency
    await refreshTasks();
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
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Tasks List</h3>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500">
              <tr>
                <th className="p-2 text-left">Task Title</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Priority</th>
                <th className="p-2 text-left">Assignee</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Due Date</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTasks.map((task) => (
                <tr key={task._id} className="border-b border-gray-100">
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        task.status === "Completed"
                          ? "bg-green-100 border-green-200"
                          : task.status === "In Progress"
                          ? "bg-blue-100 border-blue-200"
                          : "bg-yellow-100 border-yellow-200"
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
                  <td className="p-2">
                    {task.assignee ? (
                      <>
                        <div className="font-semibold">
                          {task.assignee.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {task.assignee.userid}
                        </div>
                      </>
                    ) : (
                      "Unassigned"
                    )}
                  </td>

                  <td className="p-2">{task.description}</td>
                  <td className="p-2">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditClick(task)}
                      >
                        ✏️
                      </button>
                      <button
                        className="p-1 text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(task)}
                      >
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

      {/* New Task Modal */}
      <NewTask
        show={isModalOpen}
        handleClose={closeModal}
        user={selectedUser || { name: "Team Member", _id: "" }}
        onTaskAssigned={refreshTasks}
      />

      {/* Edit Task Modal */}
      <TaskEditModal
        isOpen={showEditModal}
        task={selectedTask}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleTaskUpdate}
      />

      {/* Delete Task Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">Delete Task</h2>
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTab;