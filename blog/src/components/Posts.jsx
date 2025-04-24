import "./Posts.css";
import About from "./About";
import Post from "./Post";

const Posts = () => {
  return (
    <div className="Posts-wrapper">
      <div className="max-width">
        <h2 className="a11y-hidden">Post</h2>
        <Post />
        {/* <About /> */}
      </div>
    </div>
  );
};

export default Posts;
