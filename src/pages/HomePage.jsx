import ActiveChallenge from "../components/activeChallenge/activeChallenge";
import Banner from "../components/Banner/Banner";
import EventsTips from "../components/EventsTips/EventsTips";
import RecentTips from "../components/RecentTips/RecentTips";
import Statistics from "../components/Statistics/Statistics";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <Statistics></Statistics>
      <ActiveChallenge></ActiveChallenge>
      <RecentTips />
      <EventsTips />
      
    </>
  );
};

export default HomePage;
