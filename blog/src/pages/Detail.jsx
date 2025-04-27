import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Contents from "../components/Contents";
import Comments from "../components/Comments";
import { useContext } from "react";
import { BlogStateContext } from "../App";

const Detail = () => {
  const params = useParams();
  const id = params.id;
  const { data, comments } = useContext(BlogStateContext);

  const blogData = data.find((item) => {
    return Number(item.id) === Number(id);
  });

  const blogDataComments = blogData ? comments[blogData.id] ?? [] : [];

  return (
    <div>
      <Header />
      <Banner />
      <div className="conm_wrapper">
        <Contents id={id} blogData={blogData} />
        <Comments id={id} blogDataComments={blogDataComments} />
      </div>
    </div>
  );
};

export default Detail;
