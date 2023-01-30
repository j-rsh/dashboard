import React, { useCallback , useState } from "react";
import { Page, FormLayout, ContextualSaveBar, Frame , Modal } from "@shopify/polaris";
import { Form, Formik, Field } from "formik";
import { Select, TextField } from "@satel/formik-polaris";
import { Job } from "../../graphql/query";
import { DeleteJob , UpdateJob } from "../../graphql/mutation";
import * as Yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router";
import { Skill } from "../../components/Skill";

export default function EditJob() {
  const { id } = useParams();
  const editJob = parseInt(id);
  const { data, loading } = useQuery(Job, {
    variables: { id: editJob },
  });
  const [deleteJobId, setdeleteJobId] = useState(null);
  const [updateJob, { error }] = useMutation(UpdateJob);
  const [deleteJob] = useMutation(DeleteJob);


  const cityOptions = [
    { label: "Tehran", value: "Tehran" },
    { label: "Rasht", value: "Rasht" },
    { label: "Qazvin", value: "Qazvin" },
  ];

  const navigate = useNavigate();
  const handleChange = useCallback(
    () => setdeleteJobId(!deleteJobId),
    [deleteJobId],
  );

  const handleSubmit = useCallback(
    async (value) => {
      try {
        const { data } = await updateJob({
          variables: {
            id: editJob,
            title: value.title,
            description: value.description,
            city: value.city,
            skills: value.skills,
          },
        });
        if (data.updateJob.status) {
          navigate("/jobs");
        }
      } catch {
        console.log(error);
      }
    },
    [updateJob, error],
  );

  const handleOnAction = useCallback(async () => {
    try {
      const data = await deleteJob({
        variables: { id: editJob },
      });
      if (data.data.deleteJob.status) {
        navigate("/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  }, [deleteJob]);
  // let skillTitle = [];
  // data
  //   ? data.job.job.skills.map((skill) => {
  //       return skillTitle.push(skill.title);
  //     })
  //   : null;

  const initialValues = {
    title: data ? data.job.job.title : "",
    description: data ? data.job.job.description : "",
    city: data ? data.job.job.city : "",
    skills:  [],
    // skillTitle ? skillTitle :
  };
  if (loading) {
    return <div>loading</div>;
  }
  const modal = (
    <Modal
      open={true}
      onClose={handleChange}
      title="Are you sure you want to Delete this Job ?"
      primaryAction={{
        content: "Yes",
        onAction: handleOnAction,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    />
  );

  return (
    <div style={{ marginTop: 100 }}>
      <Page narrowWidth
       title="Edit Job"
      primaryAction={{
        content: "Delete Job",
        onAction: () => {
          setdeleteJobId(true);
        },
      }}>
        <Frame>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              title: Yup.string().required(" title is required !"),
              description: Yup.string().required("description is required !"),
              city: Yup.string().ensure().required("city is required !"),
            })}
          >
            {({ handleSubmit }) => (
              <Form>
                <ContextualSaveBar
                  discardAction={{
                    onAction: () => {
                      navigate("/jobs");
                    },
                  }}
                  saveAction={{
                    loading: false,
                    disabled: false,
                    onAction: handleSubmit,
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
        {deleteJobId ? modal : null}
      </Page>
    </div>
  );
}
