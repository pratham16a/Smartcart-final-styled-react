import React from 'react';

function CartResult(props){
    return(
        <div>
        <div className="cart-results">
            <p>Sub Total : <span>₹ {props.subTotal}</span></p>
            <p>Total Weight: <span id="total-weight">{props.totalWeight} g</span></p>
        </div>
        <button className="btn btn-lg custom-button mt-3">Checkout  <i className="fa-solid fa-arrow-right fa-fade"></i></button>
        </div>
    );
}

export default CartResult;