import React from 'react';
import { client } from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import SignupForm from './components/Register';
import '@shopify/polaris/build/esm/styles.css';
import {AppProvider} from '@shopify/polaris'

const App = () => {
  return (
    <div>
     <ApolloProvider client={client}>
     <AppProvider>
      {/* <Test/> */}
      <SignupForm/>
      </AppProvider>
     </ApolloProvider>
    
      
    </div>
  );
};

export default App;