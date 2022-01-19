import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./Modal.css"; 
import "../../Style/home.css"
import "../../Style/login.css"
const axios = require('axios');

export default function Modal() {
  
  const navigate = useNavigate();
  const [modal, setModal] = useState(false); //not show without button click
  const [formState, setFormState] = useState({ meetingname:"", meetingdate: "" });
  const [errors, setErrors] = useState({ meetingname: false});
  const [responseState, setResponseState] = useState({ message: "", code: "" });
  const toggleModal = () =>{
    setModal(!modal);
  }

  function handleKeyPress(e){
    var key = e.key;
    if(key == 'Enter')
    {
      console.log('Go to meeting');
      if (errors.meetingname) {
        alert("Meeting name can not be empty.");
        return;
      }
      e.preventDefault();
      axios.post('http://localhost:3000/home', {
        meetingname:formState.meetingname,
        meetingdate: Date.now
      })
      .then(function(response){
        if(response.data.status === 0){
          setResponseState({ message: response.data.message, code: 200 });
          navigate("/meeting");
        }
      })
      .catch(function (error) {
      })
    }
  }
   
  return(
    <> 
    <button onClick={toggleModal} className="app-button graybg">Create Instant Meeting</button>

    {modal && (
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <input onKeyPress={(e) => handleKeyPress(e)} 
            className="input-div" 
            id="meetingname" type="text" placeholder="meeting name"
            onChange={(e) => {
              if (!!e.target.value && e.target.value.length > 0)
                setErrors({ ...errors, meetingname: false });
              else
                setErrors({ ...errors, meetingname: true });
              setFormState({ ...formState, meetingname: e.target.value });
            }}
            ></input>
          </div>
      </div>
    )}
    </>
  );
}

