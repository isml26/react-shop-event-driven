import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import "./checkout.styles.scss";

function Checkout() {
  const { cartItems,addItemToCart } = useContext(CartContext);

  return (
    <div>
      <h1>Checkout Bro</h1>
      <div>
        {cartItems.map((item) => {
          const { id, name, quantity } = item;
          return (
            <div key={id}>
              <h2> {name} </h2>
              <span> {quantity} </span>
              <br />
              <span>decrement</span>
              <br />

              <span onClick={()=>addItemToCart(item)} >increment</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Checkout;
