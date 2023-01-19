import React from "react";
import { Form, FormikProps, Formik } from "formik";
import { Skill } from "./Skill";

export const New = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{
        email: "",
        firstName: "red",
        lastName: "",
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {
        <Form>
          <Skill name="firstName" type="text" label="First Name" />
          {/* <MyTextField name="lastName" type="text" label="Last Name" />
          <MyTextField name="email" type="email" label="Email" /> */}
          <button type="submit">Submit</button>
        </Form>
      }
    </Formik>
  </div>
);
