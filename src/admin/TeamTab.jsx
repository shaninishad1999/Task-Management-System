import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Container, Row, Col } from "react-bootstrap";
import AddTeamMemberModal from "./teamtab/AddTeamMemberModal";
import ViewTeamMemberModal from "./teamtab/ViewTeamMemberModal";
import { userDisplay, userDelete } from "../api/AdminCreateUserAllApi";
import  {toast}  from "react-toastify";

const TeamTab = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        console.log("Fetching users from backend...");
        const users = await userDisplay();
        console.log("Fetched users from API:", users);

        if (!Array.isArray(users)) {
          console.warn("Fetched users is not an array:", users);
          return;
        }

        const formattedUsers = users.map((user, index) => ({
          _id: user._id,
          id: index + 1,
          name: user.name || "No Name",
          role: user.role || "No Role",
          email: user.email || "No Email",
          phone: user.phone || "N/A",
          department: user.department || "N/A",
          userid: user.userid || "No ID",
          imageUrl: user.imageUrl || "",
          tasks: 0,
        }));

        console.log("Formatted users:", formattedUsers);
        setTeamMembers(formattedUsers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedMember(null);
  };

  const handleShowViewModal = (member) => {
    console.log("Viewing member:", member);
    setSelectedMember(member);
    setShowViewModal(true);
  };

  const handleAddTeamMember = (newMember) => {
    const newMemberWithId = {
      ...newMember,
      id: teamMembers.length + 1,
      tasks: 0,
    };

    console.log("Adding new member:", newMemberWithId);
    setTeamMembers([...teamMembers, newMemberWithId]);
    handleCloseAddModal();
  };

  const handleRemoveMember = async (_id) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove user with ID: ${_id}?`);
    if (!confirmDelete) return;
  
    try {
      console.log("🛠️ Attempting to delete user with ID:", _id);
      toast.info(`Deleting user with ID: ${_id}...`);
  
      await userDelete(_id); // This must accept _id as per your API
      setTeamMembers(teamMembers.filter(member => member._id !== _id));
  
      toast.success("🗑️ User deleted successfully");
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "❌ Failed to delete user";
      console.error("❌ Delete Error:", message);
      toast.error(message);
    }
  };
  

  const handleUpdateMember = (updatedMember) => {
    console.log("Updating member:", updatedMember);
    setTeamMembers(
      teamMembers.map(member =>
        member._id === updatedMember._id ? updatedMember : member
      )
    );
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Team Management</h5>
          <Button variant="light" size="sm" onClick={handleShowAddModal}>
            + Add Team Member
          </Button>
        </Card.Header>
        <Card.Body>
          {teamMembers.map((member) => (
            <Card key={member._id} className="mb-3">
              <Card.Body>
                <Row>
                  <Col md={1} className="d-flex align-items-center justify-content-center">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#6c757d",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem",
                        }}
                      >
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </Col>
                  <Col md={8}>
                    <h5>{member.name}</h5>
                    <p className="text-muted mb-0">{member.role}</p>
                  </Col>
                  <Col md={3} className="d-flex align-items-center justify-content-end">
                    <div>
                      <Badge bg="info" className="me-2">
                        Assigned Tasks: {member.tasks}
                      </Badge>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowViewModal(member)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveMember(member._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      <AddTeamMemberModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleAddTeamMember={handleAddTeamMember}
      />

      {selectedMember && (
        <ViewTeamMemberModal
          show={showViewModal}
          handleClose={handleCloseViewModal}
          member={selectedMember}
          updateMember={handleUpdateMember}
        />
      )}
    </Container>
  );
};

export default TeamTab;
