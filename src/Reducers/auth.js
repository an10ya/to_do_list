//Reducers takes the intial state and the action and returns the modified state accordingly

const reducers = (state = { authData: null }, action) => {
    switch(action.type) {
        case 'REGISTER_USER':
            return {...state, authData: action?.payload }
        case 'LOGIN_USER':
            return {...state, authData: action?.payload }
        default:
            return state;
    }
}

export default reducers;