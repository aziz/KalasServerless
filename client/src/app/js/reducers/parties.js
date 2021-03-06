import { GET_PARTIES, GET_PARTY,THEME_PARTY,LOGOUT_USER} from '../actions/constants';


const INITIAL_STATE = { all: [], party: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_PARTIES:
      return { ...state, all: action.payload.data.users_parties };
    case GET_PARTY:
      return { ...state, party: action.payload.data.party };
    case THEME_PARTY:
      return { ...state,party: Object.assign({}, state.party, {
        theme: action.theme
      })};
    case LOGOUT_USER:
      return { ...state, INITIAL_STATE };
    default:
      return state;
  }
}
