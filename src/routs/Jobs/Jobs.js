import { Route, Routes } from "react-router";
import NewJob from "../NewJob/NewJob";
import JobLists from "../JobList/JobLists";

export default function Jobs() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<JobLists />} />
        <Route path="/new" element={<NewJob />} />
        {/* <Route path="" element={</>} */}
      </Routes>
    </div>
  );
}
