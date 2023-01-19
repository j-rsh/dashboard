import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@satel/formik-polaris";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../graphql/mutation";
import {
  Banner,
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
} from "@shopify/polaris";

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const handleOnSubmit = useCallback(
    async ({ email, password }) => {
      try {
        const { data } = await createUser({
          variables: {
            email,
            password,
          },
        });

        if (data.createUser.status) {
          navigate("/");
          console.log(data);
        }

        setErrorMessage(data.createUser.message);
      } catch (err) {
        console.log(err);
      }
    },
    [createUser, navigate]
  );

  return (
    <Page
      narrowWidth
      breadcrumbs={[{ content: "Login", url: "/login" }]}
      title="Sign Up"
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Formik
              initialValues={{ password: "", email: "" }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Required"),
                password: Yup.string()
                  .required("No password provided.")
                  .min(8, "Password is too short - should be 8 chars minimum.")
                  .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                  ),
                passwordConfirm: Yup.string().oneOf(
                  [Yup.ref("password"), null],
                  "Passwords must match"
                ),
              })}
              onSubmit={handleOnSubmit}
            >
              <Form>
                <FormLayout>
                  <TextField
                    type="email"
                    label="Email"
                    name="email"
                    id="email"
                  />
                  <TextField
                    type="password"
                    label="Password"
                    name="password"
                    id="password"
                  />
                  <TextField
                    type="password"
                    label="Password Confirm"
                    name="passwordConfirm"
                    id="passwordConfirm"
                  />
                  <Button submit primary>
                    Sign Up
                  </Button>
                </FormLayout>
              </Form>
            </Formik>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
const initialValues = { email: "", password: "" };
