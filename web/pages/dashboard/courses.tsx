import RootLayout from '../../components/Layout';
import DashboardLayout from '../../components/DashboardLayout';
import React from 'react';

const AllCourses = () => {
  return <div>All Courses here...</div>;
};

AllCourses.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default AllCourses;
