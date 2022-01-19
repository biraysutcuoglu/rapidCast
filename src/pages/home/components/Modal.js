import React, { useState } from 'react';
import "../../Style/modal.css";
import "../../Style/home.css"
import "../../Style/login.css"
import axios from 'axios';

export default function Modal( {refreshMeetings, setRefreshMeetings, ...rest}) {

  const [modal, setModal] = useState(false); //not show without button click
  const [formState, setFormState] = useState({ meetingName: "", meetingDate: "" });
  const [errors, setErrors] = useState({ meetingname: false });
  const [responseState, setResponseState] = useState({ message: "", code: "" });
  const toggleModal = () => {
    setModal(!modal);
  }

  const handleSubmit = () => {
    if (errors.meetingname) {
      alert("Meeting name can't be empty");
      return;
    }
    else {
      var today = new Date();

      axios.post("http://localhost:3000/createMeeting", {
        meetingName: formState.meetingName,
        meetingDate: today.toUTCString()
      }).then(function (response) {
        setResponseState({message: response.message, code: response.code});
        setRefreshMeetings(true);
        toggleModal();
      }).catch(function (error){

      })
    }
  };

  return (
    <>
      <button onClick={toggleModal} className="app-button graybg">Create Instant Meeting</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <input
              value={formState.meetingName}
              className="input-div"
              id="meetingname" type="text" placeholder="meeting name"
              onChange={(e) => {
                if (!!e.target.value && e.target.value.length > 0)
                  setErrors({ ...errors, meetingname: false });
                else
                  setErrors({ ...errors, meetingname: true });
                setFormState({ ...formState, meetingName: e.target.value });
              }}
            ></input>
            <button onClick={handleSubmit}>Create Meeting</button>
          </div>
        </div>
      )}
    </>
  );
}

