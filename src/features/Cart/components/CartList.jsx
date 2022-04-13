import React from 'react'
import CartItem from './CartItem'

const CartList = ({ cartItems }) => {
    return (
        cartItems.map(item => (

            <CartItem key={item.id} item={item} />
        ))
    )
}

export default CartList