import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/home.css";
import Modal from "./components/Modal"
const axios = require('axios');

const Home = () => {

    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const logout = () => {
        setLoggingOut(true);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    /* let meetings;
    axios.get("http://localhost:3000/getMeetings")
        .then(function (response) {
            if (response.data.status === 0) {
                meetings = response.data.meetingList;
            }

        })
        .catch(function (error) {
        }) */

    return (
        <div className="home-wrapper">
            <div>
                <img src="https://imgyukle.com/f/2022/01/06/oT8TZc.png" className="logo" alt="logo" />
            </div>
            <div className="display-wrapper">
                {loggingOut && <div className="failure-label">Logged out successfully</div>}
                <div>
                    <><Modal/></>
                </div>
                <div className="meetings-list">
                    <h2>My Meetings</h2>
                    <div className="table-box">
                        <table>
                            <tbody>
                                 <tr>
                                <th>Meeting Name</th>
                                <th>Creation Date</th>
                                <th>Direct Link</th>
                            </tr>
                            <tr>
                                <td>WebGL Seminar</td>
                                <td>14.02.2022 - 17.54</td>
                                <td>
                                    <a href="#">Link</a>
                                </td>
                            </tr>
                            <tr>
                                <td>CSS Training</td>
                                <td>17.02.2022 - 18.12</td>
                                <td>
                                    <a href="#">Link</a>
                                </td>
                            </tr>
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
