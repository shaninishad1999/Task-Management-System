import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
// import   createUser from "../../api/AdminCreateUserAllApi";

const AddTeamMemberModal = ({ show, handleClose, handleAddTeamMember }) => {
  const [formData, setFormData] = useState({});

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Load preview image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("teamMemberImage");
    if (savedImage) {
      setPreview(savedImage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        localStorage.setItem("teamMemberImage", reader.result); // Save base64 to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setPreview(null);
    fileInputRef.current.value = null;
    localStorage.removeItem("teamMemberImage"); // Remove from localStorage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object
    const submissionData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(formData).forEach(key => {
      if (key !== 'image') { // Handle image separately
        submissionData.append(key, formData[key]);
      }
    });
    
    // Add image if it exists
    if (formData.image) {
      submissionData.append("image", formData.image);
    }
  
    try {
      const res = await createUser(submissionData);
      console.log("✅ User created successfully", res);
      
      // Format the response data to match the team member structure
      const newTeamMember = {
        id: Date.now(), // Generate a temporary ID if not provided by API
        name: formData.name,
        role: formData.role,
        email: formData.email,
        phone: formData.phone || '',
        department: formData.department,
        userid: formData.userid,
        tasks: 0,  // New members start with 0 tasks
        imageUrl: preview // Use the preview image as imageUrl
      };
      
      // Call the parent component's handler with formatted data
      if (handleAddTeamMember) {
        handleAddTeamMember(newTeamMember);
      }
  
      // Clear form data
      setFormData({});
      setPreview(null);
      fileInputRef.current.value = null;
      localStorage.removeItem("teamMemberImage");
  
      // Show success message
      alert("User created successfully");
      
      // Close modal
      handleClose();
    } catch (err) {
      console.error("❌ Error creating user", err.message);
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Team Member</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <div className="text-center mb-3">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {preview ? (
                  <Image
                    src={preview}
                    alt="Profile Preview"
                    roundedCircle
                    width={120}
                    height={120}
                    style={{
                      objectFit: "cover",
                      border: "2px solid #ccc",
                      transition: "0.3s",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      color: "#888",
                      border: "2px dashed #ccc",
                    }}
                  >
                    Click to Upload
                  </div>
                )}
              </div>

              {preview && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleImageRemove}
                >
                  Remove Image
                </Button>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Two-column layout */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </Form.Group>
             

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>User Id</Form.Label>
                <Form.Control
                  type="text"
                  name="userid"
                  value={formData.userid || ''}
                  onChange={handleChange}
                  required
                  placeholder="Enter user id"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={formData.role || ''}
                  onChange={handleChange}
                  required
                  placeholder="Enter role (e.g. Developer)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  name="department"
                  value={formData.department || ''}
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
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Member
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTeamMemberModal;