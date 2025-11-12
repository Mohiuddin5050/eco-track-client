import ActiveChallenge from "../components/activeChallenge/activeChallenge";
import Banner from "../components/Banner/Banner";
import EventsTips from "../components/EventsTips/EventsTips";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import RecentTips from "../components/RecentTips/RecentTips";
import Statistics from "../components/Statistics/Statistics";
import WhyGoGreen from "../components/WhyGoGreen/WhyGoGreen";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <Statistics></Statistics>
      <ActiveChallenge></ActiveChallenge>
      <RecentTips />
      <EventsTips />
      <WhyGoGreen />
      <HowItWorks />
    </>
  );
};

export default HomePage;
