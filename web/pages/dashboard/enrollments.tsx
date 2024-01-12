import RootLayout from '../../components/Layout';
import DashboardLayout from '../../components/DashboardLayout';
import React from 'react';
import { useEffect, useState } from 'react';
import { Enrollment } from '../../types/types';
import EnrollmentCard from '../../components/EnrollmentCard';

const AllEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    // Fetch courses from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_enrollments'); // Update the API endpoint
        const data = await response.json();
        setEnrollments(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="courses-container">
      {enrollments.map((enrollment) => (
        <EnrollmentCard key={enrollment.course_id} enrollment={enrollment} />
      ))}
    </div>
  )
};

AllEnrollments.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default AllEnrollments;
