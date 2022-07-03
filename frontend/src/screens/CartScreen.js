import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Componentes
import CartItem from "../components/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  /* Asi se resuelve sin descuento alguno
   const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };
  */
  
   //Intento del descuento con IF
  // const getCartSubTotal = () => {
  //   let penTotal = 0;
  //   let shirtTotal = 0;
  //   let mugTotal = 0;
  //   let subTotal = 0;

  //   return cartItems.map((item) => {
  //     if (item.name === "Kalyptio-Pen") {
  //       // aplicar descuento 3*2
  //       if (item.qty >= 3) {
  //         penTotal = (item.qty - 1) * item.price;
  //       } else {
  //         penTotal = item.qty * item.price;
  //       }
  //     }
  //     if (item.name === "Kalypto-T-shirt") {
  //       // aplicar descuento 25% a partir de 3 T-shirts
  //       if (item.qty >= 3) {
  //         shirtTotal = item.qty * item.price * 0.75;
  //       } else {
  //         shirtTotal = item.qty * item.price;
  //       }
  //     }
  //     if (item.name === "Kalyptio-Coffee-Mug") {
  //       mugTotal = item.qty * item.price;
  //     }

  //     subTotal = penTotal + shirtTotal + mugTotal;
  //     return subTotal;
  //   });
  // };

  const getCartSubTotal = () => {
    let penTotal = 0;
    let shirtTotal = 0;
    let mugTotal = 0;
    let subTotal = 0;
    return cartItems.map((item) => {
      switch (item.name) {
        case "Kalyptio-Pen":
          // aplicar descuento 3*2
          if (item.qty >= 3) {
            penTotal = (item.qty - 1) * item.price;
          } else {
            penTotal = item.qty * item.price;
          }
          break;

        case "Kalypto-T-shirt":
          // aplicar descuento 3*2
          if (item.qty >= 3) {
            shirtTotal = item.qty * item.price * 0.75;
          } else {
            shirtTotal = item.qty * item.price;
          }
          break;
        case "Kalyptio-Coffee-Mug":
          mugTotal = item.qty * item.price;
          break;

        default:
          break;
      }
      subTotal = (penTotal + shirtTotal + mugTotal);
      return subTotal;
    });
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
