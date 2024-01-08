import RootLayout from '../../components/Layout';
import DashboardLayout from '../../components/DashboardLayout';
import React from 'react';
import { useEffect, useState } from 'react';
import CourseCard from '../../components/CourseCard'
import { Course } from '../../types/types'

const allCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch courses from your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_courses'); // Update the API endpoint
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="courses-container">
      {courses.map((course) => (
        <CourseCard key={course.course_id} course={course} />
      ))}
    </div>
  );
};


allCourses.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default allCourses;
