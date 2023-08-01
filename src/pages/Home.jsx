import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banners/Banner.jsx";
import Milaninfobanner from "../components/Milaninfobanner";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { successCallback } from "../service/MilanApi.js";
import { showErrorToast, showSuccessToast } from "../utils/showToast.js";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleToken = async () => {
      const authData = await successCallback();

      if (authData?.status === 201) {
        showSuccessToast(authData?.data?.message);
        Cookies.remove("isLoginInitiated");
        Cookies.set("isLoggedIn", true, {
          expires: new Date(new Date().getTime() + 60 * 60 * 1000),
        });
      } else {
        showErrorToast(authData?.message);
      }
    };

    if (Cookies.get("isLoginInitiated")) {
      handleToken();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Helmet>
        <title>Milan | Home</title>
        <meta
          name="description"
          content="Welcome to the homepage of Milan, a hub for Users to collaborate with NGOs, Charities and more."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <Banner />
      <Milaninfobanner />
      <Footer />
    </>
  );
};

export default Home;
