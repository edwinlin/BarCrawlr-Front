
const initialState = {
  user: {}
}

const reducer = (state = initialState, action) =>{
  switch(action.type){

    case "CREATE_USER":
      console.log(action.payload);
      localStorage.setItem('token', action.payload.jwt);
      return {...state, user: action.payload.user};

    case "LOG_IN":
      localStorage.setItem("token", action.payload.jwt);
      return {...state, user: action.payload.user};

    default:
      return state
  }
}

export default reducer
