import orderTypes from "./order.types"

const INITIAL_STATE = {
    orders: [],
    totalQuantity: 0,
    totalPrice: 0
}

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case orderTypes.ADD_TO_ORDER: {
            let is_order_exist = false;
            for(let i=0; i< state.orders.length; i++){
                if(state.orders[i].id === action.payload.id){
                    is_order_exist = true;
                    state.orders[i].quantity += 1;
                    break;
                }
            }
            return {
                ...state,
                orders: is_order_exist ? [...state.orders] : [...state.orders, action.payload],
                totalQuantity: state.totalQuantity +  1,
                totalPrice: state.totalPrice + action.payload.price

            }
        }
        default:
            return state;
    }
}

export default orderReducer;