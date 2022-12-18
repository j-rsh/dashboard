import React from 'react';
import { Routes, Route} from "react-router-dom";
import { client } from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import Register from './components/Register';
import '@shopify/polaris/build/esm/styles.css';
import Login from './components/Login'; 

const App = () => {
  return (
    <div>
     <ApolloProvider client={client}>
     <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
    </Routes>
     </ApolloProvider>
    
      
    </div>
  );
};

export default App;