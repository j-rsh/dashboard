import React from 'react';
import {Page} from '@shopify/polaris'

const JobLists = () => {
    return (
        <div>
   <Page
      title="Jobs"
      primaryAction={{ content: "Create Job", url: "/jobs/new" }}
    ></Page>
        </div>
    );
};

export default JobLists;