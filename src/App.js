import React from 'react';
import { Routes, Route} from "react-router-dom";
import { client } from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import Register from './components/Register';
import '@shopify/polaris/build/esm/styles.css';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard';
import JobLists from './routs/JobLists';
import NewJob from './routs/NewJob';
const App = () => {
  return (
    <div>
     <ApolloProvider client={client}>
     <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Dashboard/>} />
          <Route path="JobLists" element={<JobLists/>} />
          <Route path="NewJob" element={<NewJob/>} />
    </Routes>
     </ApolloProvider>
    
      
    </div>
  );
};

export default App;