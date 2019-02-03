import { NavigationActions } from 'react-navigation';

let container;

const setContainer = (c) => {
  container = c;
};

const navigate = (routeName, params = undefined) => {
  container.dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    }),
  );
};

export default {
  setContainer,
  navigate,
};
