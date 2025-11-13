import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Challenges from "../pages/Challenges";
import MyActivities from "../pages/MyActivities";
import ChallengeDetails from "../components/ChallengeDetails/ChallengeDetails";
import AddChallenge from "../pages/AddChallenge";
import JoinChallenge from "../components/JoinChallenge/JoinChallenge";
import PrivetRoute from "./PrivetRoute";
import Profile from "../pages/Profile";
import ForgetPassword from "../pages/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "challenges",
        element: <Challenges></Challenges>,
      },
      {
        path: "activities",
        element: (
          <PrivetRoute>
            <MyActivities></MyActivities>
          </PrivetRoute>
        ),
      },
      {
        path: "addChallenge",
        element: (
          <PrivetRoute>
            <AddChallenge />
          </PrivetRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivetRoute>
            <Profile />
          </PrivetRoute>
        ),
      },
      {
        path: "challenges/:id",
        element: <ChallengeDetails />,
      },
      {
        path: "joinChallenges/:id",
        element: <JoinChallenge />,
      },
      {
        path: "forgot_password",
        element: <ForgetPassword />,
      },
    ],
  },
]);

export default router;
