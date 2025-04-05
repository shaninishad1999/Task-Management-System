// TeamTab.jsx
import React, { useState } from "react";
import { Card, Button, Badge, Container, Row, Col } from "react-bootstrap";
import AddTeamMemberModal from "./teamtab/AddTeamMemberModal";
import ViewTeamMemberModal from "./teamtab/ViewTeamMemberModal";

// Sample data for teams
const initialTeamMembers = [
  { id: 1, name: "John Doe", role: "Frontend Developer", tasks: 2, email: "john@example.com", phone: "123-456-7890", department: "Development" },
  { id: 2, name: "Jane Smith", role: "Backend Developer", tasks: 1, email: "jane@example.com", phone: "123-456-7891", department: "Development" },
];

const TeamTab = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedMember(null);
  };
  
  const handleShowViewModal = (member) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

useEffect(() => {
    

}, []);

  const handleAddTeamMember = (newMember) => {
    // Add ID to new member - in a real app this might come from backend
    const newMemberWithId = {
      ...newMember,
      id: teamMembers.length + 1,
      tasks: 0,
    };
    
    setTeamMembers([...teamMembers, newMemberWithId]);
    handleCloseAddModal();
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };
  
  const handleUpdateMember = (updatedMember) => {
    setTeamMembers(
      teamMembers.map(member => 
        member.id === updatedMember.id ? updatedMember : member
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
            <Card key={member.id} className="mb-3">
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
                          objectFit: "cover"
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
                          fontSize: "1.2rem"
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
                        onClick={() => handleRemoveMember(member.id)}
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

      {/* Add Team Member Modal */}
      <AddTeamMemberModal 
        show={showAddModal} 
        handleClose={handleCloseAddModal} 
        handleAddTeamMember={handleAddTeamMember}
      />
      
      {/* View/Edit Team Member Modal */}
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