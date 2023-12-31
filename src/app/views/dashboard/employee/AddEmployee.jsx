import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddEmployee = ({ setAddShow }) => {
  const [dep, setDep] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datatosend, setDatatosend] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    phone: "",
    department: "",
  });
  useEffect(() => {
    fetchDep();
  }, []);
  const fetchDep = async () => {
    const data = await axios.get("http://localhost:3001/departments/all");
    setDep(data.data);
  };
  const onChangeForm = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, [e.target.name]: e.target.value });
    console.log(datatosend);
  };
  const onChangeSelect = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, department: e.target.value });
  };
  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const send = await axios.post(
        "http://localhost:8093/leave/employee/add",
        datatosend
      );
      console.log(send);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div
      className="addEmpWrapper"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: "10000000000",
      }}
    >
      <div
        className="addEmpContainer"
        style={{
          padding: "15px 30px",
          backgroundColor: "white",
          borderRadius: "8px",
          minWidth: "350px",
        }}
      >
        <div
          className="addEmpFirst"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Add Employee : </h2>
          <CloseIcon
            onClick={() => setAddShow(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Role:</label>
            <input
              type="text"
              name="jobTitle"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Department :</label>
            <select
              style={{ marginBottom: "24px" }}
              onChange={(e) => onChangeSelect(e)}
            >
              {dep &&
                dep.map((e) => <option value={e.value}>{e.title}</option>)}
            </select>
          </div>

          <button
            type="submit"
            onClick={(e) => sendData(e)}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              padding: "8px",
              color: "white",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
