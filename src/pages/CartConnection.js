import { useState } from "react";
import { useCartConnectionContext } from "../context/CartContext";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const CartConnection = () => {
  const carts = ['cart1'];
  const { dispatch } = useCartConnectionContext();
  const [connectionURL, setConnectionURL] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    if (carts.includes(connectionURL)) {
      const payload = { connectionURL };
      localStorage.setItem('cart', JSON.stringify(payload));
      dispatch({ type: 'connect-cart', payload: payload });
      navigate('/'); 
      window.location.reload(false);
    } else {
      setErrors("Invalid string blud");
      setConnectionURL("");
    }
  };

  return (
    <form >
    <div className="cart-string-form">
      <input
        className="custom-input form-control cart-string-input"
        placeholder="Cart Connection String"
        onChange={(e) => setConnectionURL(e.target.value)}
        value={connectionURL}
      />
      </div>
      <button className="btn btn-lg custom-button cart-string-button" onClick={handleSubmit}>
        Submit
      </button>
      {errors}
      
    </form>
  );
};

export default CartConnection;
