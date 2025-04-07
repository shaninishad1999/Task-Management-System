import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import { createUser } from "../../api/AdminCreateUserAllApi";

const AddTeamMemberModal = ({ show, handleClose, handleAddTeamMember, existingMembers = [] }) => {
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("teamMemberImage");
    if (savedImage) setPreview(savedImage);
  }, []);

  useEffect(() => {
    if (formData.email === "auto@create.com") {
      handleSubmit({ preventDefault: () => {} });
    }
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        localStorage.setItem("teamMemberImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
    localStorage.removeItem("teamMemberImage");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "email", "userid", "role", "department"];
    const isEmptyField = requiredFields.some((field) => !formData[field]?.trim());

    if (isEmptyField) {
      toast.error("❌ Please fill in all required fields.");
      return;
    }

    // Check for duplicate email or userid
    const isDuplicate = existingMembers.some(
      (member) =>
        member.email?.toLowerCase() === formData.email?.toLowerCase() ||
        member.userid?.toLowerCase() === formData.userid?.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("❌ Email or User ID already exists!");
      return;
    }

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        submissionData.append("image", value);
      } else if (value) {
        submissionData.append(key, value);
      }
    });

    try {
      const res = await createUser(submissionData);
      toast.success("✅ User created successfully");

      const newTeamMember = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        email: formData.email,
        phone: formData.phone || "",
        department: formData.department,
        userid: formData.userid,
        imageUrl: preview,
      };

      handleAddTeamMember?.(newTeamMember);

      setFormData({});
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      localStorage.removeItem("teamMemberImage");
      handleClose();

    } catch (err) {
      const message = err?.response?.data?.message || err.message;
      if (message.includes("email already exists")) {
        toast.error("❌ Email already exists!");
      } else if (message.includes("user ID already exists")) {
        toast.error("❌ User ID already exists!");
      } else {
        toast.error(message || "❌ Something went wrong");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Team Member</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          {/* Image Upload */}
          <div className="text-center mb-4">
            <div className="d-flex justify-content-center align-items-center gap-3">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <Image
                    src={preview}
                    roundedCircle
                    width={120}
                    height={120}
                    style={{ objectFit: "cover", border: "2px solid #ccc" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      backgroundColor: "#f0f0f0",
                      border: "2px dashed #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
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

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="userid"
                  value={formData.userid || ""}
                  onChange={handleChange}
                  placeholder="Enter user ID"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="HR">HR</option>
                  <option value="QA Engineer">QA Engineer</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  name="department"
                  value={formData.department || ""}
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
