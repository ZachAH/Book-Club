import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//importing the apollo libraries
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
//establishes new connection to graphql sever
const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      header: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  uri: '/graphql',
});


function App() {
  return (
    //passing client variable through client prop then wrapping entire jsx with apolloProvider to give accsess to the servers api data through client
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
