import csrfFetch from "./csrf";

// ACTION TYPES
const RECEIVE_SESSION = 'session/RECEIVE_SESSION';
const REMOVE_SESSION = 'session/REMOVE_SESSION';

// THUNK
export const loginUser = ({ credential, password }) => async dispatch => {
  const res = await csrfFetch('api/session', {
    method: "POST",
    body: JSON.stringify({credential, password})
  });
  let data = await res.json();
  storeCurrentUser(data.user);
  dispatch(receiveSession(data.user));
  return data;
};

export const logoutUser = () => async dispatch => {
  await csrfFetch('api/session', {
    method: "DELETE"
  });

  dispatch(removeSession());
  storeCurrentUser(null);
};

export const signupUser = ({ username, email, password }) => async dispatch => {
  const res = await csrfFetch('api/users', {
    method: "POST",
    body: JSON.stringify({username, email, password})
  });
  const data = await res.json();
  dispatch(receiveSession(data.user));
  storeCurrentUser(data.user);
  return data;
};

export const restoreSession = () => async dispatch => {
  const res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(receiveSession(data.user));
  return res;
};


// HELPER METHODS
const storeCurrentUser = user => { 
  if (user) sessionStorage.setItem('currentUser', JSON.stringify(user));
  else sessionStorage.removeItem('currentUser');
}

function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}


// ACTION CREATORS
export const receiveSession = user => {
  return {
    type: RECEIVE_SESSION,
    payload: user
  };
};

export const removeSession = () => {
  return {
    type: REMOVE_SESSION,
    payload: null
  };
};

// REDUCER
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
const initialState = { user: currentUser }
const sessionReducer = (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_SESSION:
      return { ...nextState, user: action.payload};
    case REMOVE_SESSION:
      return { ...nextState, user: action.payload};
    default:
      return state;
  }
}

export default sessionReducer;