// ViewTeamMemberModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";

const ViewTeamMemberModal = ({ show, handleClose, member, updateMember }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: member?.name || "",
    email: member?.email || "",
    phone: member?.phone || "",
    role: member?.role || "",
    department: member?.department || "",
    imageUrl: member?.imageUrl || null
  });
  
  const [imagePreview, setImagePreview] = useState(member?.imageUrl || null);

  // Reset form data when member changes
  React.useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
        phone: member.phone || "",
        role: member.role || "",
        department: member.department || "",
        imageUrl: member.imageUrl || null
      });
      setImagePreview(member.imageUrl || null);
    }
    setEditMode(false);
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // In a real app, you would upload the file to a server
      // and get back a URL. Here we're just using the preview URL.
      setFormData({
        ...formData,
        imageUrl: previewUrl
      });
    }
  };

  const handleUpdate = () => {
    updateMember({
      ...member,
      ...formData
    });
    setEditMode(false);
  };

  if (!member) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Edit" : "View"} Team Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center mb-3">
            <div className="position-relative">
              {imagePreview ? (
                <Image 
                  src={imagePreview} 
                  roundedCircle 
                  style={{ width: "150px", height: "150px", objectFit: "cover" }} 
                />
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    backgroundColor: "#6c757d",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3rem",
                    margin: "0 auto"
                  }}
                >
                  {member.name.charAt(0)}
                </div>
              )}
              
              {editMode && (
                <div className="mt-3">
                  <Form.Group>
                    <Form.Label>Upload Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
          
          <Col md={8}>
            {editMode ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            ) : (
              <div>
                <h3>{member.name}</h3>
                <p><strong>Role:</strong> {member.role}</p>
                <p><strong>Department:</strong> {member.department}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Phone:</strong> {member.phone || "Not provided"}</p>
                <p><strong>Assigned Tasks:</strong> {member.tasks}</p>
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {editMode ? (
          <>
            <Button variant="secondary" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTeamMemberModal;