import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { TextField } from "@satel/formik-polaris";
import {
  Banner,
  Button,
  Card,
  FormLayout,
  Layout,
  Page,
} from "@shopify/polaris";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutation";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser] = useMutation(LOGIN_MUTATION);
  const handleOnSubmit = useCallback(
    async ({ email, password }) => {
      try {
        const { data } = await loginUser({
          variables: { email, password },
        });

        if (data.login.status) {
          localStorage.setItem("token", data.login.token);
          localStorage.setItem("user", data.data.login.user.email);

          navigate("/");
        }

        setErrorMessage(data.login.message);
      } catch (err) {
        console.log(err);
      }
    },
    [loginUser, navigate]
  );
  return (
    <Page
      narrowWidth
      breadcrumbs={[{ content: "Register", url: "/register" }]}
      title="Login"
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Required"),
                password: Yup.string()
                  .required("No password provided.")
                  .min(8, "Password is too short - should be 8 chars minimum.")
                  .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                  ),
              })}
              onSubmit={handleOnSubmit}
            >
              <Form>
                <FormLayout>
                  <TextField
                    onClearButtonClick
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
                  <Button submit primary>
                    Login
                  </Button>
                </FormLayout>
              </Form>
            </Formik>
          </Card>
          <br />
          {errorMessage ? (
            <Banner title={errorMessage} status="critical" />
          ) : null}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
const initialValues = { email: "", password: "" };
