import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise, getProductImageSrc, PLACEHOLDER_IMAGE } from "../../utils/helpers";
import Auth from "../../utils/auth";

function ProductItem(item) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [hasImage, setHasImage] = useState(true);

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  if (!hasImage) {
    // Hide products whose images fail to load
    return null;
  }

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={getProductImageSrc(image)}
          onError={(e) => {
            e.target.onerror = null;
            setHasImage(false);
          }}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      {Auth.loggedIn() ? (
        <button onClick={addToCart}>Add to cart</button>
      ) : (
        <Link to="/login" className="btn-link">Log in to add to cart</Link>
      )}
    </div>
  );
}

export default ProductItem;
