import * as gb from '../services/globals';

const initialState = {
  boards: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type){
      case gb.LOAD_BOARDS: {
        return {...state, boards: action.payload};
      }

      default: {
        return state;
      }
    }
}

export default reducer;