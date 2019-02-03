import NavigatorService from '../../navigator';

const initialState = {
  uri: '../assets/images/rricon.png',
};

const toggleCameraPicture = (state = initialState, action) => {
  let nextState = {
    ...state,
  };

  switch (action.type) {
    case 'PICTURE_TAKEN':
      nextState = {
        ...state,
        uri: action.value.uri,
      };

      NavigatorService.navigate('Home');
      return nextState;
    default: return state;
  }
};

export default toggleCameraPicture;
