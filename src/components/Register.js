import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from "@satel/formik-polaris";
import { useMutation } from "@apollo/client";
import {CREATE_USER_MUTATION} from '../graphql/mutation'

const SignupForm = () => {
    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const handleOnSubmit = (({ email, password })=>{
        createUser({
            variables: {
              email:email,
              password:password
            }, 
          });
          console.log(email);
    }
   
    )
  return (
   
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <TextField name="firstName" type="text" />
        <ErrorMessage name="firstName" />

        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" />

        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

        <button type="submit" >Submit</button>
      </Form>
    </Formik>
  );
};
export default SignupForm