import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
};

export default Home;
