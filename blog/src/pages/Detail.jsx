import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Contents from "../components/Contents";

const Detail = () => {
  const params = useParams();
  // console.log(params);
  return (
    <div>
      <Header />
      <Banner />
      <Contents />
    </div>
  );
};

export default Detail;
