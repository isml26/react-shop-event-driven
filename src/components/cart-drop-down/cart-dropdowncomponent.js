import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../cart-item/cart-item-component";
import Button from "../button/button-component";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./cart-dropdown.styles.scss";

function CartDropDown() {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckout}>Checkout</Button>
    </div>
  );
}

export default CartDropDown;
