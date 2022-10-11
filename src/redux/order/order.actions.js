import orderTypes from "./order.types"

const addToOrder = (item) => ({
    type: orderTypes.ADD_TO_ORDER,
    payload: {
        ...item,
        quantity: 1
    }})

export default addToOrder;