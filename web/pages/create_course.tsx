import RootLayout from '../components/Layout';

import React from 'react';
import { useState } from "react";



const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: 0,
    price: 0.0,
    course_id: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/create_courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const createdCourse = await response.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          course_id: createdCourse.course_id, // Assuming the response has course_id property
        }));
        console.log('Course successfully created');
        setIsSubmitted(true);
        setLoading(false);

      } else {
        const errorData = await response.json();
        if (response.status === 400 && errorData.detail === 'Course Alredy Exists.') {
          setError('Course Alredy Exists.');
        } else {
          setError(errorData.detail || 'Course Alredy Exists.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value,
    }));
    setError(null); // Clear error when the user starts typing
    setIsSubmitted(false); // Reset submission state when user modifies the form
  };

  return (
    <div>
      <h3 className=" text-center text-3xl md:text-4xl font-bold text-gray-900 mt-1 !leading-[1]">
        Create New Course
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800 "
            htmlFor="title"
          ></label>
          <input
            name="title"
            minLength={3}
            maxLength={150}
            required
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
            id="title"
          />
        </div>

        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800"
            htmlFor="description"
          ></label>
          <textarea
            name="description"
            placeholder="Course Description"
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
            value={formData.description}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={500}
          />
        </div>

        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800"
            htmlFor="instructor"
          ></label>
          <input
            name="instructor"
            type="text"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Course Instructor"
            id="instructor"
            minLength={3}
            maxLength={150}
            required
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800"
            htmlFor="duration"
          ></label>
          <input
            id="duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            step="5"
            required
            placeholder="Course Duration"
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800"
            htmlFor="price"
          ></label>
          <input
            name="price"
            id="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.1"
            placeholder="Course Price"
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>
        <div className=" text flex flex-col my-4">
          <button
            type="submit"
            disabled={loading}
            className="block mt-6 h-14 w-full px-6 py-3 leading-none font-semibold disabled:bg-gray-400 disabled:text-gray-100 rounded-lg text-white bg-gray-900 focus:outline-none"
          >
            Create Course
          </button>
        </div>
      </form >
      {
        isSubmitted && (
          <div className='preview-section'>
            <h2>Preview:</h2>
            <p>Title: {formData.title}</p>
            <p>Description: {formData.description}</p>
            <p>Instructor: {formData.instructor}</p>
            <p>Duration: {formData.duration}</p>
            <p>Price: {formData.price}</p>
            <p>Course ID: {formData.course_id}</p>
          </div>
        )
      }
      {error && (
        <div className="error-section" style={{ color: 'red', marginTop: '10px' }}>
          <p>Error Type: {error.type}</p>
          <p>Message: {error.msg}</p>
          {/* Display other relevant properties as needed */}
        </div>
      )}
    </div >
  );
}
CreateCourseForm.getLayout = (page) => (
  <RootLayout>
    {page}
  </RootLayout>
);

export default CreateCourseForm;







