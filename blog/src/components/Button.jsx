import "./Button.css";

const Button = ({ onClick, text, type, img }) => {
  return (
    <button onClick={onClick} className={`Button ${type}`}>
      <img src={img} />
      {text}
    </button>
  );
};

export default Button;
