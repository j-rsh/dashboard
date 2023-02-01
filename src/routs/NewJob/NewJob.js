import React, { useCallback } from "react";
import { Page, FormLayout, ContextualSaveBar, Frame } from "@shopify/polaris";
import { Form, Formik, Field } from "formik";
import { Select, TextField } from "@satel/formik-polaris";
import { CREATE_JOB } from "../../graphql/mutation";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Skill } from "../../components/Skill";

export default function NewJob() {
  const cityOptions = [
    { label: "Tehran", value: "Tehran" },
    { label: "Rasht", value: "Rasht" },
    { label: "Qazvin", value: "Qazvin" },
  ];

  const navigate = useNavigate();
  const [createJob] = useMutation(CREATE_JOB);
  const handleOnSubmit = useCallback(
    async ({ title, description, city, skills }) => {
      try {
        const { data } = await createJob({
          variables: {
            title,
            description,
            city,
            skills,
          },
        });

        if (data.createJob.status) {
          navigate("/jobs");
        }
      } catch (err) {
        console.log(err);
      }
    },
    [createJob, navigate]
  );
  return (
    <div>
      <Page narrowWidth title="New Job">
        <Frame>
          <Formik
            initialValues={{ title: "", description: "", city: "", skills: [] }}
            onSubmit={handleOnSubmit}
            validationSchema={Yup.object().shape({
              title: Yup.string().required(" title is required !"),
              description: Yup.string().required("description is required !"),
              city: Yup.string().ensure().required("city is required !"),
            })}
          >
            {({ submitForm }) => (
              <Form>
                <ContextualSaveBar
                  discardAction={{
                    onAction: () => {
                      navigate("/jobs");
                    },
                  }}
                  saveAction={{
                    onAction: submitForm,
                  }}
                />

                <FormLayout>
                  <TextField
                    type="text"
                    label="Title"
                    name="title"
                    id="title"
                  />
                  <TextField
                    type="text"
                    label="Description"
                    name="description"
                    id="description"
                    multiline={4}
                  />

                  <Select
                    placeholder="Select"
                    label="City"
                    name="city"
                    options={cityOptions}
                  />
                  <Field label="Skills" name="skills" as={Skill} />
                </FormLayout>
              </Form>
            )}
          </Formik>
        </Frame>
      </Page>
    </div>
  );
}
