import React, { useEffect, useState } from "react";
import "../../styles/ClubsPage.css";
import { Navbar, Footer, SingleEvent } from "../../components";
import { GetAllEvents } from "../../service/MilanApi";
import Eventspic from "../../assets/pictures/EventsPagefloating.svg";
import "../../styles/EventsPage.css";

const LoaderSpinner = () => {
  return (
    <div id="spinner-wrapper" className="w-100 text-center">
      <div
        id="spinner"
        className="spinner-border text-primary m-5"
        role="status"
      ></div>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

const EventsPage = () => {
  document.title = "Milan | Events";
  const [clubData, setClubData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchClubData = async () => {
      setLoading(true);
      const response = await GetAllEvents();
      setClubData(response);
      setLoading(false);
    };
    fetchClubData();
  }, []);

  return (
    <>
      <Navbar />

      {/* Banner Portion Code  */}

      <div
        id="event_banner"
        className="container d-flex flex-column flex-lg-row text-center text-lg-start"
      >
        <div id="eventCol_2" className="d-none d-sm-block">
          <img src={Eventspic} alt="" className="event_image" />
        </div>

        <div
          id="eventCol_1"
          className="d-flex flex-column justify-content-center me-lg-5 ms-lg-3"
        >
          <h1 className="mb-4">Welcome to the events page !!</h1>
          <p>
            All our partnered NGOs , hosts various events be it educational,
            cleaning mother earth, funding events, health camps and many more !!
          </p>
          <p>Join us at the events, and help the community !</p>
        </div>
      </div>

      <hr className="container" />

      <div className="cards justify-content-center">
        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            {" "}
            {clubData.map((club) => {
              return <SingleEvent key={club._id} club={club} />;
            })}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
