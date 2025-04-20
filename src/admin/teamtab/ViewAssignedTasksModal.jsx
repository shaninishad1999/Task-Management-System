import React, { useEffect, useState } from "react";
import { Modal, Button, ListGroup, Spinner } from "react-bootstrap";
import { getUserTasks } from "../../api/taskapi";

const ViewAssignedTasksModal = ({ show, handleClose, user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && user) {
      fetchUserTasks();
    }
  }, [show, user]);

  const fetchUserTasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // API call to get tasks for the specific user
      const userTasks = await getUserTasks(user._id);
      setTasks(userTasks);
    } catch (err) {
      console.error("Error fetching user tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Tasks Assigned to {user?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : tasks.length === 0 ? (
          <div className="text-center my-3">
            <p>No tasks assigned to this user yet.</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {tasks.map((task) => (
              <ListGroup.Item key={task._id} className="border-bottom py-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-1">{task.title}</h6>
                    <p className="mb-1 text-muted small">{task.description}</p>
                    <div className="d-flex mt-2 gap-3">
                      <small className="text-muted">
                        <strong>Priority:</strong>{" "}
                        <span className={`text-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
                          {task.priority || "Normal"}
                        </span>
                      </small>
                      <small className="text-muted">
                        <strong>Status:</strong>{" "}
                        <span className={`text-${task.status === "Completed" ? "success" : task.status === "In Progress" ? "primary" : "secondary"}`}>
                          {task.status || "Pending"}
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="text-end">
                    <small className="text-muted d-block">Due: {formatDate(task.dueDate)}</small>
                    <small className="text-muted d-block">Created: {formatDate(task.createdAt)}</small>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewAssignedTasksModal;