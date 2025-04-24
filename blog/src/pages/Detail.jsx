import { useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();
  console.log(params);
  return <div>hi{params.id}</div>;
};

export default Detail;
