import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/home.css";
import Modal from "./components/Modal"
const axios = require('axios');

const Home = () => {

    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    const [refreshMeetings, setRefreshMeetings] = useState(false);
    const logout = () => {
        setLoggingOut(true);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    const [meetings, setMeetings] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/getMeetings")
        .then(function (response) {
            if (response.data.status === 0) {
                setMeetings(response.data.meetings);
            }

        })
        .catch(function (error) {
        })
    }, [refreshMeetings]);

    return (
        <div className="home-wrapper">
            <div>
                <img src="https://imgyukle.com/f/2022/01/06/oT8TZc.png" className="logo" alt="logo" />
            </div>
            <div className="display-wrapper">
                {loggingOut && <div className="failure-label">Logged out successfully</div>}
                <div>
                    <><Modal refreshMeetings={refreshMeetings} setRefreshMeetings={setRefreshMeetings} /></>
                </div>
                <div className="meetings-list">
                    <h2>My Meetings</h2>
                    <div className="table-box">
                        <table>
                            <thead>
                                <tr>
                                    <th>Meeting Name</th>
                                    <th>Creation Date</th>
                                    <th>Direct Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meetings.length > 0 && meetings.map(meeting => {
                                    return (
                                        <tr key ={meeting.meetingDate}>
                                            <td>{meeting.meetingName}</td>
                                            <td>{meeting.meetingDate}</td>
                                            <td><a href="#"> Link </a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button className="app-button graybg" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Home;
