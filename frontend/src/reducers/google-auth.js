
import { SIGN_IN } from '../actions/google-auth-action';

const initialState = {

  token: {}

}


export default function googleAuth(state = initialState, action) {

  switch (action.type) {

    case SIGN_IN:
      return { ...state, token: action.payload }


    default:
      return state
  }
}

