import React from 'react'
import { useNavigate } from 'react-router-dom'
import comingsoon from '../../assets/pictures/comingsoon.svg'
import Navbar from '../../components/Navbar'


const ClubProfile = () => {
    const Navigate = useNavigate()

    const handleLogout = () => {
        window.alert("Logout successful !")
        sessionStorage.removeItem("club")
        Navigate("/clubs/login")

    }


    return (
        <>
            <Navbar />

            <div className="container" style={{ textAlign: "center", marginTop: "2rem" }}>
                <img src={comingsoon} alt="" style={{ width: "60%" }} />
                <h1 style={{ marginTop: "1rem" }}>Coming Soon 🚀</h1>

                <button onClick={handleLogout} className="btn btn-lg btn-block" style={{ backgroundColor: "#89b5f7", marginTop: "1.5rem" }}>
                    Logout
                </button>


            </div>

        </>
    )
}

export default ClubProfile