import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  ClubLogin,
  ClubProfile,
  ShopLanding,
  ClubRegister,
  ClubsPage,
  UserRegister,
  UserLogin,
  UserProfile,
  ContactPage,
  AboutUs,
  EventCreate,
  EventsPage,
  Donate,
} from "./pages";
import MilanState from "./context/MilanState";

const App = () => {
  return (
    <>
      <MilanState>
        <Router>
          <Routes>
            {/* //* Home routes */}

            <Route exact path="/" element={<Home />} />

            {/* //* Auth routes - USER*/}

            <Route exact path="/user/register" element={<UserRegister />} />
            <Route exact path="/user/login" element={<UserLogin />} />
            <Route exact path="/user/profile" element={<UserProfile />} />

            {/* //* Auth routes - CLUBS*/}

            <Route exact path="/clubs/login" element={<ClubLogin />} />
            <Route exact path="/clubs/register" element={<ClubRegister />} />
            <Route exact path="/clubs/profile" element={<ClubProfile />} />

            {/* //* Display Routes */}
            <Route exact path="/display/clubs" element={<ClubsPage />} />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route exact path="/about-us" element={<AboutUs />} />
            <Route exact path="/clubs/createevent" element={<EventCreate />} />
            <Route exact path="/display/events" element={<EventsPage />} />
            <Route exact path="/shops/shop" element={<ShopLanding />} />

            {/* //* Donations */}
            <Route exact path="/donateus" element={<Donate />} />
          </Routes>
        </Router>
      </MilanState>
    </>
  );
};

export default App;
