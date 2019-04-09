//dispatch
export const createUser = userObj => {
  return { type: "CREATE_USER", payload: userObj };
}

export const logInUser = userObj => {
  return { type: "LOG_IN", payload: userObj };
};

//thunk
export const createUser = (userInfo) => {
  console.log(userInfo)
  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify({ user: userInfo })
  })
    .then(resp => resp.json())
    .then(userData => {
      if(userData.error){
        // this.props.history.push("/")
        alert("username already exists")
      }else{
        dispatch(createUser(userData))
      }
    });
};

export const loginUser = userInfo => {
  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify({ user: userInfo })
  })
    .then(resp => resp.json())
    .then(userData => {
      if(userData.error){
        // this.props.history.push("/")
        alert("username already exists")
      }else{
        dispatch(loginUser(userData))
      }
    });
};
