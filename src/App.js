import React from "react";
import { Routes, Route } from "react-router-dom";
import { client } from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import Register from "./routs/Register/Register";
import "@shopify/polaris/build/esm/styles.css";
import Login from "./routs/Login/Login";
import Dashboard from "./routs/Dashboard/Dashboard";
import NewJob from "./routs/NewJob/NewJob";
import EditJob from "./routs/EditJob/EditJob";

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Dashboard />} />
          <Route path="/new" element={<NewJob />} />
          <Route path="/edit/job/:id" element={<EditJob />} />
        </Routes>
      </ApolloProvider>
    </div>
  );
};

export default App;
