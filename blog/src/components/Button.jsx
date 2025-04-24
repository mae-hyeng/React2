import "./Button.css";

const Button = ({ text, type, img }) => {
  return (
    <button className={`Button ${type}`}>
      <img src={img} />
      {text}
    </button>
  );
};

export default Button;
