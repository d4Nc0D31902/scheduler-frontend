import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SchedulerModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Learn More
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "10px" }}>
              <img
                src="/images/tupt_logo.png"
                style={{
                  width: "100px",
                  height: "100px",
                  display: "block",
                  margin: "0 auto",
                }}
                alt="Logo"
              />
            </div>
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              TUP Scheduler
            </div>
            <div
              style={{
                fontSize: "16px",
                fontStyle: "italic",
                color: "#6c757d",
              }}
            >
              Effortlessly manage your sports and activities
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            The TUP Scheduler is a powerful tool designed to help you manage
            your sports and activities effectively. With intuitive features and
            a user-friendly interface, you can easily schedule events, check
            availability, and stay organized.
          </p>
          <p>
            Whether you're a student, faculty member, or staff, the TUP
            Scheduler simplifies the process of coordinating activities and
            ensures that everyone stays informed.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SchedulerModal;
