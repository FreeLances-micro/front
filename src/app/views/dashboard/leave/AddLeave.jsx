import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export const getUserName = (e)=>{
  return `${e.firstName} ${e.lastName} ${e.jobTitle}`
}

const AddSalary = ({ setAddShow }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datatosend, setDatatosend] = useState({
  });
  useEffect(() => {
    fetchEmployee();
  }, []);
  const fetchEmployee = async () => {
    const data = await axios.get("http://localhost:8093/leave/employee/all");
    setEmployees([{userId: 0, firstName: "", lastName:"", jobTitle: ""}, ...data.data]);
  };
  const onChangeForm = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, [e.target.name]: e.target.value });
    console.log(datatosend);
  };
  const onChangeSelect = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, userId: e.target.value });
  };

  const onChangeType = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, type: e.target.value });
  };
  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const send = await axios.post(
        "http://localhost:8091/leave/leave/add",
        {...datatosend, payed: datatosend.payed === "yes" ?true: false
        }
      );
      setAddShow(false);
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
          <h2>Add salary : </h2>
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
            <label>*Employee :</label>
            <select
              style={{ marginBottom: "24px" }}
              onChange={(e) => onChangeSelect(e)}
            >
              {employees &&
                employees.map((e) => <option value={e.id}>{getUserName(e)}</option>)}
            </select>
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*start_date:</label>
            <input
              type="date"
              name="start_date"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>   <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*end_date:</label>
            <input
              type="date"
              name="end_date"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*payed:</label>
            <input
              type="text"
              name="payed"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>*type: </label>
           
            <select
              style={{ marginBottom: "24px" }}
              onChange={(e) => onChangeType(e)}
            >
               <option value={"sick"}>sick</option>
               <option value={"leave"}>leave</option>
               <option value={"maternity"}>maternity</option>
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

export default AddSalary;
