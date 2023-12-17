export const initialState = {
    basket: [],
    user: null,
    location: null
}

//Selector
export const getBasketTotal = (basket) => {
    return basket?.reduce((total, item)=>total+item.price,0)
}

const reducer = (state, action) => {
    let index, newBasket
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket:[]
            }

        case 'REMOVE_FROM_BASKET':
            index = action.index
            newBasket = [...state.basket]
            newBasket.splice(index,1)
            return {...state, basket: newBasket}

        case 'REDIRECT':
            return {
                ...state,
                location: action.location
            }

        case 'SET_USER':
            return {
                ...state, user: action.user
            }
        default:
            return state
    }
}

export default reducer