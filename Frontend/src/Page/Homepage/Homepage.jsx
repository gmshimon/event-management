import  { useEffect } from "react";
import HeroBanner from "../../Component/HeroBanner/HeroBanner";
import UpcomingEvents from "../../Component/UpcomingEvents/UpcomingEvents";
import HowItWorks from "../../Component/HowItWorks/HowItWorks";
import CallToActionStrip from "../../Component/CallToActionStrip/CallToActionStrip";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "../../Redux/Slice/AuthSlice";
import { showToastMessage } from "../../Utils/toastMessage";

const Homepage = () => {
  const { error, isLoginSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoginSuccess) {
      showToastMessage("Login Successfully", "success");
      dispatch(resetStatus());
    }
  }, [dispatch, error, isLoginSuccess]);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroBanner />

      {/* Upcoming Events Section */}
      <UpcomingEvents />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Call to Action Section */}
      <CallToActionStrip />
    </div>
  );
};

export default Homepage;
