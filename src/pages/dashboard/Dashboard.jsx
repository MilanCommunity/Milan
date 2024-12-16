import { userEndpoints } from "@/integrations/ApiEndpoints";
import TrackSection from "@components/private/dashboard/TrackSection";
import { updateUserData } from "@redux/slice/userSlice";
import fetcher from "@utils/Fetcher";
import { showErrorToast } from "@utils/Toasts";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Navbar, ProfileCompletion } from "../../components/shared";
import "./Dashboard.scss";

const Dashboard = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();

  const { data: profileData, mutate: refreshProfileData } = useSWR(
    userEndpoints.profile,
    fetcher,
    {
      onSuccess: (data) => {
        dispatch(updateUserData(data?.user));
      },
      onError: (error) => {
        showErrorToast(error?.response?.data?.message);
      },
    },
  );

  return (
    <>
      <Navbar />
      <div className="dashboard_parent">
        <div className="profile_header">
          <div className="profileSection_container">
            <img
              src="https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?cs=srgb&dl=pexels-codioful-7130555.jpg&fm=jpg"
              alt=""
              srcSet=""
              className="profile_Coverpicture"
            />

            <img
              src="https://t3.ftcdn.net/jpg/04/56/00/16/360_F_456001627_vYt7ZFjxEQ1sshme67JAXorKRPo8gsfN.jpg"
              alt=""
              className="profile_picture"
            />

            <div className="profile_numbers">
              <p className="counts followersCount">
                <span>1.25k</span> Followers
              </p>

              <p className="counts EventsCount">
                <span>231</span> Hosted Events
              </p>
            </div>

            <button
              onClick={() => {
                setShowEditModal(true);
              }}
            >
              Edit Profile
            </button>

            <div className="profile_details">
              <h2>{profileData?.user?.name}</h2>
              <p>{profileData?.user?.description}</p>
            </div>
          </div>

          <div className="dashboard_track">
            <p className="dashboard_track_p">
              <span> Real time Analytics</span> <br />
              <span>Coming Soon</span>
            </p>
            <TrackSection />
          </div>
        </div>
      </div>

      {(profileData?.user?.config?.hasCompletedProfile === false ||
        showEditModal === true) && (
        <ProfileCompletion
          edit={showEditModal}
          setShowEditModal={setShowEditModal}
          refreshProfileData={refreshProfileData}
        />
      )}
    </>
  );
};

export default Dashboard;
