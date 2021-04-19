import React from 'react';

//firebase context
const FirebaseContext = React.createContext(null);

//higher order component that gives access to firebase api
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;