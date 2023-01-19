import React from "react";
import { Routes, Route } from "react-router-dom";
import { client } from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import Register from "./routs/Register/Register";
import "@shopify/polaris/build/esm/styles.css";
import Login from "./routs/Login/Login";
import Dashboard from "./routs/Dashboard/Dashboard";
import JobLists from "./routs/JobList/JobLists";
import NewJob from "./routs/NewJob/NewJob";
import Example from "./routs/Examples/Example";
import { Skill } from "./components/Skill";
import { New } from "./components/New";

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Dashboard />} />
          <Route path="/test*" element={<Example />} />
          <Route path="/new" element={<NewJob />} />
          <Route path="/example*" element={<Skill />} />
          <Route path="/create" element={<New />} />
        </Routes>
      </ApolloProvider>
    </div>
  );
};

export default App;
