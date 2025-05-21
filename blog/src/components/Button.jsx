import "./Button.css";

const Button = ({ onClick, text, type, img, disabled }) => {
  return (
    <button onClick={onClick} className={`Button ${type}`} disabled={disabled}>
      {img ? <img src={img} /> : ""}
      {text}
    </button>
  );
};

export default Button;
