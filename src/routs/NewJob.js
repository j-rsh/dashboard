import React , {useCallback} from 'react';
import {Page , FormLayout , ContextualSaveBar , Frame} from '@shopify/polaris';
import { Form, Formik } from "formik";
import { Select, TextField } from "@satel/formik-polaris";
import {CREATE_JOB_MUTATION} from "../graphql/mutation"
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const NewJob = () => {
  const cityOptions = [{label:"Tehran" , value:"Tehran"},
                         {label:"Rasht" , value:"Rasht"},
                         {label:"Qazvin" , value:"Qazvin"}];

    const navigate = useNavigate();                   
    const [createJob] = useMutation(CREATE_JOB_MUTATION);
    const handleOnSubmit = useCallback(
    async ({ title, description, city }) => {
        try {
        const { data } = await createJob({
            variables: {
            title,
            description,
            city,
            },
        });

        if (data.createJob.status) {
            navigate("/");
        }
        } catch (err) {
        console.log(err);
        }
    },
    [createJob , navigate]
    );
    return (
    <div>
           <Page narrowWidth title="New Job">
            <Frame>
         <Formik
                initialValues={{ title: "", description: "", city: ""}}
                onSubmit={handleOnSubmit}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required(" title is required !"),
                    description: Yup.string().required("description is required !"),
                    city: Yup.string().ensure().required("city is required !"),
                  })
                  }
              >
                 {({ submitForm }) => (
        <Form>
     
           
        <ContextualSaveBar
                      discardAction={{
                        onAction: () => {
                          navigate("/");
                        },
                      }}
                      saveAction={{
                        loading: false,
                        disabled: false,
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
            </FormLayout>
            
        </Form>
         )}
        </Formik>
        </Frame>
        </Page>
    </div>
    );
};

export default NewJob;