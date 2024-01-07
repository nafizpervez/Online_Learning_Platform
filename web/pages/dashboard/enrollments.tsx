import RootLayout from '../../components/Layout';
import DashboardLayout from '../../components/DashboardLayout';
import React from 'react';

const AllEnrollments = () => {
  return <div>All Enrollments screen</div>;
};

AllEnrollments.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default AllEnrollments;
