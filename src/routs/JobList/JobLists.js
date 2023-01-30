import {
  Card,
  ResourceList,
  Avatar,
  Frame,
  ResourceItem,
  Text,
  Loading,
  Page,
  Layout,
  Pagination,
  Filters,
  AppProvider,
  Modal
} from "@shopify/polaris";
import React, { useState, useCallback, useMemo } from "react";
import { jobsQuery, SEARCHJOB_QUERY } from "../../graphql/query";
import { useQuery } from "@apollo/client";
import {DeleteJob} from "../../graphql/mutation"

export default function JobLists() {
  const [deleteJob] = useMutation(DeleteJob);
  const [queryValue, setQueryValue] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [sortValue, setSortValue] = useState("DESC");
  const [active, setActive] = useState(null);
  // console.log(active);
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
  // console.log(data);

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

  // console.log(data);
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
        console.log(active);
        // console.log(data.jobs.deleteJob.status);
      }
    } catch (error) {
      // console.log(error);
    }
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
      <Page title="Jobs"
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
                  // console.log(`Sort option changed to ${selected}.`);
                }}
                resourceName={{ singular: "job", plural: "jobs" }}
                items={jobData || []}
                renderItem={(item) => {
                  const { title, description } = item;
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
                        {description}
                      </Text>
                      <p>{title}</p>
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
