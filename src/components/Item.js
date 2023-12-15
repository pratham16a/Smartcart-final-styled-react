const Item = (props) => {
    return (
        <div className="shopping-cart-item" id={props.item.name.split(' ')[0]}>
        <table className="cart-table">
            <tbody>
            <tr>
                <td colSpan="3">
                    <div>
                        <h4>{props.item.name}</h4>
                        <p>{props.item.weight} g</p>
                        <p id="quantity">x {props.item.quantity}</p>
                        <p>₹ {props.item.price}</p>
                        <hr className="shopping-cart-hr" />
                    </div>
                </td>
                <td>
                    <div id="delete-item">
                        <form method="post">
                            <input type="hidden" name="deleteItemID" value={props._id} />
                            <button type="submit" className="btn btn-lg delete-button"><i className="fa-solid fa-trash"></i></button>
                        </form>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
        // <>
        // <div>
        //     {props.item.name}
        // </div>
        // <div>{props.item.quantity}</div>
        // </>
    )
}

export default Item;