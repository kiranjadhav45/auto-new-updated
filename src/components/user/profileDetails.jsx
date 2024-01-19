import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Upload from "../common/Upload";
import Layout from "../common/Layout";

const ProfileDetails = () => {
  const handleOnChangeImage = (message, file) => {
    console.log(message, "message");
    console.log(file, "file");
  };
  return (
    <Layout
    // currentActiveMenu={currentActiveMenu}
    // setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Body className="py-4">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              className=""
            >
              <img
                style={{
                  height: "70px",
                  width: "70px",
                  borderRadius: "50%",
                }}
                src="https://i.ibb.co/wCr26FB/Whats-App-Image-2024-01-18-at-2-38-53-PM.jpg"
                alt="Whats-App-Image-2024-01-18-at-2-36-47-PM"
                border="0"
              ></img>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Upload
                onChange={handleOnChangeImage}
                fileSize={2}
                fileType="image/jpeg"
                title="upload"
              />
            </div>
            <div style={{ maxWidth: "300px", margin: "auto" }}>
              <div className="my-4">
                <input
                  style={{ width: "100%" }}
                  className="p-2"
                  placeholder="name"
                  type="text"
                />
              </div>
              <div className="my-4">
                <input
                  style={{ width: "100%" }}
                  className="p-2"
                  placeholder="mobile"
                  type="text"
                />
              </div>
              <div className="my-4">
                <input
                  style={{ width: "100%" }}
                  className="p-2"
                  placeholder="identity"
                  type="text"
                />
              </div>
              <div className="my-4">
                <input
                  style={{ width: "100%" }}
                  className="p-2"
                  placeholder="businessName"
                  type="text"
                />
              </div>
              <div className="my-4">
                <input
                  style={{ width: "100%" }}
                  className="p-2"
                  placeholder="businessMobile"
                  type="text"
                />
              </div>
              <div className="my-4">
                <input
                  style={{ width: "100%" }}
                  className="p-2"
                  placeholder="businessEmail"
                  type="text"
                />
              </div>
              <div className="my-4">
                <input
                  style={{ width: "100%" }}
                  className="p-2"
                  placeholder="businessAddress"
                  type="text"
                />
              </div>
            </div>
            <div
              style={{ maxWidth: "300px", margin: "auto" }}
              className="d-grid gap-2"
            >
              <Button size="sm">submit</Button>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </Layout>
  );
};

export default ProfileDetails;
