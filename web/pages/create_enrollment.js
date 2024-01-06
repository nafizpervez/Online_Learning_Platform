import RootLayout from '@/components/Layout';

const CreateEnrollment = () => {
  return (
    <div className="text-center max-w-[100%] mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1 !leading-[1]">
        Enroll New Student
      </h3>
      <div className="">
        <input
          name="course_id"
          type="number"
          placeholder="Course ID"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <input
          name="studentName"
          type="string"
          placeholder="Student Name"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <input
          name="enrollmentDate"
          type="date"
          placeholder="Enrollment Date"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <button
          type="button"
          className="block mt-6 h-14 mx-auto w-full px-6 py-3 leading-none font-semibold rounded-lg text-white bg-gray-900 focus:outline-none"
        >
          Enroll into Course
        </button>
      </div>
    </div>
  );
};

CreateEnrollment.getLayout = (page) => (
  <RootLayout>
    {page}
  </RootLayout>
);

export default CreateEnrollment;
