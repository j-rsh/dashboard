import {
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
  Page,
  Layout,
  Pagination,
  Filters,
  Modal,
} from "@shopify/polaris";
import React, { useState, useCallback, useMemo } from "react";
import { jobsQuery, SEARCHJOB_QUERY } from "../../graphql/query";
import { useQuery, useMutation } from "@apollo/client";
import { DeleteJob } from "../../graphql/mutation";

export default function JobLists() {
  const [deleteJob] = useMutation(DeleteJob);
  const [queryValue, setQueryValue] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [sortValue, setSortValue] = useState("DESC");
  const [active, setActive] = useState(null);
  // jobs Id
  const handleChange = useCallback(() => setActive(!active), [active]);
  const { data, loading } = useQuery(jobsQuery, {
    skip: queryValue.length > 0 ? true : false,
    variables: {
      page: pageValue,
      pageSize: 3,
      sort: sortValue,
    },
  });
  const { data: searchJob, loading: searchJobLoading } = useQuery(
    SEARCHJOB_QUERY,
    {
      skip: queryValue.length > 0 ? false : true,
      variables: {
        page: pageValue,
        limit: 3,
        name: queryValue,
        sort: sortValue,
      },
    }
  );

  const jobData = useMemo(() => {
    if (queryValue.length > 0) {
      return searchJob?.searchJob?.jobs;
    }

    return data?.jobs?.jobs;
  }, [queryValue, data, searchJob]);
  const onNextHandler = useCallback(() => {
    setPageValue((current) => current + 1);
  }, [setPageValue]);

  const onPreviousHandler = useCallback(() => {
    setPageValue((current) => current - 1);
  }, [setPageValue]);

  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    [setQueryValue]
  );
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);

  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={[]}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    />
  );
  const totalPage = data ? data.jobs.totalPage : 0;

  const MaodalHandler = useCallback(async () => {
    try {
      const data = await deleteJob({
        variables: { id: active },
        // refetchQueries: [data ? jobsQuery : SEARCHJOB_QUERY],
        // ???
      });
      if (data.data.deleteJob.status) {
        setActive(null);
      }
    } catch (error) {}
  }, [active, deleteJob]);
  const modal = (
    <Modal
      open={active === null ? false : true}
      onClose={handleChange}
      title="Do you want to delete job?"
      primaryAction={{
        content: "Yes",
        onAction: MaodalHandler,
      }}
      secondaryActions={[
        {
          content: "cancel",
          onAction: handleChange,
        },
      ]}
    ></Modal>
  );
  return (
    <div style={{ height: "250px" }}>
      {" "}
      <Page
        title="Jobs"
        primaryAction={{
          content: "Create Job",
          url: "/new",
        }}
      >
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <ResourceList
                loading={loading || searchJobLoading}
                filterControl={filterControl}
                sortValue={sortValue}
                sortOptions={[
                  { label: "Newest update", value: "DESC" },
                  { label: "Oldest update", value: "ASC" },
                ]}
                onSortChange={(selected) => {
                  setSortValue(selected);
                }}
                resourceName={{ singular: "job", plural: "jobs" }}
                items={jobData || []}
                renderItem={(item) => {
                  const { title, description, city, skills } = item;
                  const shortcutActionHandler = () => {
                    setActive(item.id);
                  };
                  const shortcutActions = [
                    {
                      content: "Delete",
                      onAction: shortcutActionHandler,
                    },
                  ];
                  return (
                    <ResourceItem
                      id={item.id}
                      media={<Avatar launche size="medium" />}
                      shortcutActions={shortcutActions}
                      url={`/edit/job/${item.id}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {title}
                      </Text>
                      <h2>{description}</h2>
                      <p>{city}</p>
                      {skills.map((skill, id) => {
                        return <p key={id}>{skill.title}</p>;
                      })}
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          </Layout.Section>
        </Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em",
          }}
        >
          <Pagination
            label={pageValue}
            hasNext={pageValue < totalPage}
            onNext={onNextHandler}
            hasPrevious={pageValue > 1}
            onPrevious={onPreviousHandler}
          />
        </div>
        {active ? modal : null}
      </Page>
    </div>
  );
}
