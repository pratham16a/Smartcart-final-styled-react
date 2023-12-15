import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Item from '../components/Item.js';
import { useCartConnectionContext } from "../context/CartContext"; 
import Filetab from './Filetab';
import CartResult from './CartResult'

const Home = () => {
    const { user } = useAuthContext();
    const { dispatch } = useCartConnectionContext(); 
    const [items, setItems] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [connectionURL, setConnectionURL] = useState("");

    const handleDisconnect = (e) => {
        e.preventDefault();
        disconnectCart(dispatch); 
    }

    useEffect(() => {
        let intervalId;

        const getItems = async () => {
            const response = await fetch(`http://localhost:3500/items/${connectionURL}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            setItems(json);
        }


        if (user) {
            getItems();
            intervalId = setInterval(getItems, 2000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId); 
            }
        };
    }, [user, connectionURL]);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if (cartData && cartData.connectionURL) {
            setConnectionURL(cartData.connectionURL);
        }
    }, []);

    useEffect(() => {
        const getRecommendations = async() =>{
            const response = await fetch('http://localhost:3500/items/recommended', {
                method: 'POST',
                body: {
                    'items': JSON.stringify(items)
                },
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            setRecommended(json);
        }
        if(user.wow != null){
            getRecommendations();
        }
    }, [items, user]);

    function subtotal(cartItems){
        let price = 0;
        cartItems.forEach(element => {
          price = price + element.price * element.quantity  
        });
        return price;
      }
      
      function totalWeightFun(cartItems){
        let weight = 0;
        cartItems.forEach(element => {
          weight = weight + element.weight * element.quantity;
        });
        return weight;
      }

    return (
        <div>
            {connectionURL ? (
                <button className="btn btn-lg custom-button mt-3 mb-3" onClick={handleDisconnect}>Disconnect Cart</button>
            ): (
                <>
                </>
            )}
            <div>
            <Filetab icon="fa-solid fa-cart-shopping" text="Shopping Cart"/>
                <div className="shopping-cart">
                    <div className="shopping-cart-only-items">
                        <div className="cart-items">
                        {items?.map((item) => (
                            <div key={item._id}><Item item={item} /></div>
                        ))}
                        </div>
                        <CartResult subTotal = {subtotal(items)} totalWeight={totalWeightFun(items)} />
                    </div>
                </div>
            </div>
            <div className="recommended-items">
            {recommended?.map((item) => (
                <div key={item._id}><Item item={item}/></div>
            ))}
            </div>
        </div>
    );
}

export default Home;

const disconnectCart = (dispatch) => {
    dispatch({ type: 'disconnect-cart' });
    localStorage.removeItem('cart');
    window.location.reload(false);
}
