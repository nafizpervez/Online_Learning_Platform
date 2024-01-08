import RootLayout from '../components/Layout';
import React, { useEffect, useState } from 'react';

const CreateEnrollmentForm = () => {
  const [formData, setFormData] = useState({
    course_id: 11,
    studentName: '',
    enrollmentDate: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courseIds, setCourseIds] = useState([]);


  useEffect(() => {
    // Fetch available course IDs when the component mounts
    const fetchCourseIds = async () => {
      try {
        const response = await fetch('http://localhost:8000/all_course_ids_only');
        if (response.ok) {
          const data = await response.json();
          setCourseIds(data);
        } else {
          console.error('Failed to fetch available course IDs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourseIds();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/enroll_student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const createEnrollment = await response.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
        }));
        console.log('Course successfully created');
        setIsSubmitted(true);
        setLoading(false);
      } else {
        const errorData = await response.json(); // Try to parse error response
        setError(errorData.message || 'Failed to create enrollment');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'course_id' ? parseInt(value, 10) : value,
      [name]: type === 'date' ? String(value) : value
    }));

    setError(null); // Clear error when the user starts typing
    setIsSubmitted(false); // Reset submission state when user modifies the form
  };


  return (
    <div>
      <h3 className=" text-center text-3xl md:text-4xl font-bold text-gray-900 mt-1 !leading-[1]">
        Enroll a Student
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="text flex flex-col my-4">
          <label className="font-bold text-gray-800" htmlFor="course_id">
          </label>
          <select
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="block h-14 mt-2 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          >
            <option value="">Available Course ID</option>
            {courseIds.map((course_id) => (
              <option key={course_id} value={course_id}>
                {course_id}
              </option>
            ))}
          </select>
        </div>

        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800"
            htmlFor="course_id"
          ></label>
          <input
            type="number"
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            placeholder="Selected Course ID"
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>


        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800"
            htmlFor="studentName"
          ></label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter Student Name"
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="text flex flex-col my-4">
          <label
            className="font-bold text-gray-800"
            htmlFor="enrollmentDate"
          ></label>
          <input
            type="date"
            id="enrollmentDate"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            placeholder="Enter Enrollment Date"
            className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className=" text flex flex-col my-4">
          <button
            type="submit"
            disabled={loading}
            className="block mt-6 h-14 w-full px-6 py-3 leading-none font-semibold disabled:bg-gray-400 disabled:text-gray-100 rounded-lg text-white bg-gray-900 focus:outline-none"
          >
            Enroll into Course
          </button>
        </div>
      </form >


      {isSubmitted && !error && (
        <div className="success-section mt-6">
          <div className="card block w-full px-6 py-3 border border-green-500 rounded-lg focus:outline-none focus:border-gray-500 bg-green-50">
            <div className="card-header text-center">
              <h2 className="text-xl font-semibold text-green-500 mb-2">Enrollment Created Successfully</h2>
            </div>
          </div>
        </div>
      )}

      {isSubmitted && !error && (
        <div className="preview-section mt-6">
          <div className="card w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 bg-gray-100">
            <div className="card-header text-center">
              <h2 className="text-xl font-semibold mb-2">Enrollment Preview</h2>
            </div>
            <div className="card-body flex flex-auto justify-center items-center ">
              <table className="table-preview bg-white ">
                <tbody className="align-middle">
                  <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                    <td className="w-80 py-2 px-10">Course ID</td>
                    <td className="w-80 py-2 px-10">{formData.course_id}</td>
                  </tr>
                  <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                    <td className="w-80 py-2 px-10">Student Name</td>
                    <td className="w-80 py-2 px-10">{formData.studentName}</td>
                  </tr>
                  <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                    <td className="w-80 py-2 px-10">Enrollment Date</td>
                    <td className="w-80 py-2 px-10">{formData.enrollmentDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="error-section mt-6">
          <div className="card w-full px-6 py-7 border border-red-500 rounded-lg focus:outline-none focus:border-gray-500 ">
            <div className="card-header text-center">
              <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
            </div>
            <div className="card-body">
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        </div>
      )}

    </div >

  );
}

CreateEnrollmentForm.getLayout = (page) => (
  <RootLayout>
    {page}
  </RootLayout>
);

export default CreateEnrollmentForm;