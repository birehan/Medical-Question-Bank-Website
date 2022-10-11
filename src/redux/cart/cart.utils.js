
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem =>cartItem.id === cartItemToAdd.id);

    if (existingCartItem){
        return cartItems.map(item => item.id === cartItemToAdd.id ? 
            {...item, quantity: item.quantity + 1} : item)
    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

export const decreseItemQuantity = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem =>cartItem.id === cartItemToAdd.id);

    if (existingCartItem && existingCartItem.quantity > 1){
        return cartItems.map(item => ((item.id === cartItemToAdd.id)) ? 
            {...item, quantity: item.quantity - 1} : item)
    }
    return removeItemFromCart(cartItems, cartItemToAdd);
}


export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    return cartItems.filter(item => item.id !== cartItemToRemove.id)
}

