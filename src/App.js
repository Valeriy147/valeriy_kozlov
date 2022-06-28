import './App.css';
import PagesContainer from './components/Pages/PagesContainer';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import { Route, Routes } from 'react-router-dom';
import SelectItemContainer from './components/SelectItem/SelectItemContainer';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import BagContainer from './components/Bag/BagContainer';

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: 'http://localhost:4000/graphql' })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-wrapper">
        <div className="header">
          <HeaderContainer className="header" />
        </div>
        <div className="contain">
          <Routes>
            <Route path="/" element={<PagesContainer type="all" />} />
            <Route path="/tech" element={<PagesContainer type="tech" />} />
            <Route path="/clothes" element={<PagesContainer type="clothes" />} />
            <Route path="/bag" element={<BagContainer />} />
            <Route path="/item/*" element={<SelectItemContainer />} />
          </Routes>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
