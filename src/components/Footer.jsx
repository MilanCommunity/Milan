import React from "react";
import { ReportProblem } from "../service/MilanApi";
import "../styles/Footer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import SocialIcons from "./SocialIcons";
import Cookies from "js-cookie";

const Footer = () => {
  const [reportModal, setReportModal] = React.useState(false);
  const [reportEmail, setReportEmail] = React.useState("");
  const [reportFirstName, setReportFirstName] = React.useState("");
  const [reportLastName, setReportLastName] = React.useState("");
  const [reportIssue, setReportIssue] = React.useState("");

  const handleReportModalOpen = () => {
    document.previousTitle = document.title;
    document.title = "Milan | Report an issue";
    setReportModal(true);
  };
  const handleReportModalClose = () => {
    document.title = document.previousTitle;
    document.previousTitle = undefined;
    setReportEmail("");
    setReportFirstName("");
    setReportLastName("");
    setReportIssue("");
    setReportModal(false);
  };

  React.useEffect(() => {
    if(reportModal){
      const closeEvent = (e) => {
        if(e.key === 'Escape'){
          handleReportModalClose();
        }
      }
      window.addEventListener('keydown', closeEvent);
      return () => window.removeEventListener('keydown', closeEvent);
    }
  },[reportModal])

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!Cookies.get("token")) {
      toast.error("You must be logged in to report an issue");
      return;
    }
    if (
      reportFirstName === "" ||
      reportLastName === "" ||
      reportEmail === "" ||
      reportIssue === ""
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    const success = await ReportProblem({
      firstname: reportFirstName,
      lastname: reportLastName,
      email: reportEmail,
      reportmessage: reportIssue,
    });

    if (success === true) {
      toast.success("Report submitted successfully");
    } else if (success === "tryagain") {
      toast.error("You can only submit once in 2 hours");
    } else {
      toast.error("Some error occured");
    }
    setTimeout(() => {
      handleReportModalClose();
    }, 2000);
  };

  React.useEffect(() => {
    reportModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [reportModal]);

  return (
    <footer className="bg-white m-0">
      <ToastContainer />

      {/* Report modal starts here  */}

      {reportModal && (
        <div className="reportModal">
          <div className="reportModalContent">
            <div className="reportModalHeader">
              <h1>REPORT A PROBLEM</h1>

              <button
                type="button"
                className="btn-close crossButton"
                aria-label="Close"
                onClick={handleReportModalClose}
              ></button>
            </div>

            <h2>
              We are trying our best. We give in the best shot and hope for the
              best.
            </h2>
            <br />

            {/* Report form  */}

            <form id="reportForm">
              <div className="form-group">
                <input
                  required
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email*"
                  value={reportEmail}
                  onChange={(e) => setReportEmail(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group d-flex">
                <input
                  required
                  type="text"
                  className="form-control "
                  placeholder="First Name*"
                  value={reportFirstName}
                  onChange={(e) => setReportFirstName(e.target.value)}
                />
                <input
                  required
                  type="text"
                  className="form-control ml-1"
                  placeholder="Last Name*"
                  value={reportLastName}
                  onChange={(e) => setReportLastName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <textarea
                  required
                  type="text"
                  className="form-control"
                  placeholder="Brief the issue that you are facing*"
                  rows={6}
                  value={reportIssue}
                  onChange={(e) => setReportIssue(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button className="btn-hover" onClick={handleReportSubmit}>
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="px-5 py-2 rounded" style={{ backgroundColor: "#424141" }}>
        <div className="row py-4">
          <div className="col-lg-6 col-md-6 mb-4 mb-lg-0 px-5">
            <img src="img/logo.png" alt="" width="180" className="mb-3" />
            {/* <p className="font-italic text-light text-center"> */}
            <p className="footer-text font-italic text-light text-left">
              With Milan we aim at bringing all the various NGOs and donors
              under one single roof to ease the burden of going to find their
              appropriate donors and the appropriate communities to donate to.
              With the help of our search filters and ask platform, it becomes
              easier for the people to find their right community to serve.
            </p>
            <div className="social-icons-desktop">
              <SocialIcons className="social-icons-desktop" />
            </div>
          </div>

          <div className="join-us col-lg-2 col-md-6 mb-4 mb-lg-0 px-5">
            <div className="social-icons-mobile">
              <SocialIcons />
            </div>

            <div>
              <h1 className="h6 join-us text-uppercase text-light font-weight-bold mb-4">
                Join Us!
              </h1>
              <ul className="join-us-list list-unstyled mb-0">
                <li className="mb-2">
                  <Link
                    to="user/register"
                    className="text-decoration-none footer_auth_text"
                  >
                    Login
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="user/register"
                    className="text-decoration-none footer_auth_text"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-lg-0">
            <h1 className="h6 text-uppercase text-light font-weight-bold mb-4 text-center">
              Got something to report ?
            </h1>
            <p className="text-light text-center mb-4">
              You can submit a report to us by filling a form below !
            </p>
            <div className="d-flex justify-content-center rounded mx-auto">
              <button
                onClick={handleReportModalOpen}
                className="btn btn-outline-danger p-3 d-flex align-items-center bg-light bg-opacity-25 text-black"
              >
                <img
                  className="bottom-img"
                  width="12px"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAsCAYAAAAacYo8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJqSURBVHgB7ZlNaxNBHMafJq0kKJoUwVpoHasH6SlQj4Jb6FWsh3ptTnqtnyDpJ9CjeEn6CfRaCKRfoNirB+16Ml6SghVKUNp59iVMp7N5adPZDewPnmTnZZdn/vvfmWV2CuNDSJWkCsFxyFEgV+ogOI4VGixL1aQ6UqdD6mtwzjos40h9HtFslA7hD0LgGhFSTVzdbJRGGsDUkP0qUtV+HbK5AmaKAvn5ErL5glcm/0+O0G276HZcnPw6wABcqW2p+qCOg4wL+JFwTI05afLO8kvcWnI8DcPxjz2093fwV/5zMBF8kHrX7zr9jAv4qSH0hptLDubWKkObjaK9X8fvxnbUAHh7VhExC0UZFzCYviFTYWGjdmXDOq1G1RuAgUjzJuMCBtO3l9ex+LrWy91xw6h//7Rqiv4efPPnyBquQdNP1Ip7Mi0WXn1EZjqH64IP9OzTMv5828W/45baJOCvGbtqZUY7n7NHSa2g6bm1KmzAu/nobRP5+yW9aQvaBKGmioC/IPTgQ/j4TRO2iUgbFh6GBTXiFbUXH8TFjRriIJwENAT8VwyPrFJZV3vNv3g/9tljFGi+2/mpL1rM9R0ehBF39JNmV8qIG64VGk6gnvFNtfXusy0kAQbQcNe9CmPEuYwnheLKpl71nD807qi1HCWVFAwR9+ZKGj+3FM4kyDRhELXVmoUHF4wnKdohBk9FGhcDOsUOXwc0ChlMKKlx26TGbZMat01q3Dapcdukxm2TGrdNatw2E2t8Wq/gl4JWA4nCtPF/wTg/dVBJh6kS+wfTy8INltMJ0iFNh/vjAsoWboJhdnyRcs8A1PDl9IzPLdoAAAAASUVORK5CYII="
                  alt="blue-siren"
                />
                Report!
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
