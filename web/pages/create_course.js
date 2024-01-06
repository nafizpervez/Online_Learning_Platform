import RootLayout from '@/components/Layout';

const CreateCourse = () => {
  return (
    <div className="text-center max-w-[100%] mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1 !leading-[1]">
        Create New Course
      </h3>
      <div className="">
        <input
          name="title"
          type="string"
          placeholder="Course Title"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <input
          name="description"
          type="string"
          placeholder="Course Description"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <input
          name="instructor"
          type="string"
          placeholder="Course Instructor"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <input
          name="duration"
          type="number"
          placeholder="Course Duration"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <input
          name="price"
          type="number"
          step="0.1"
          placeholder="Course Price"
          className="block h-14 mt-10 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        />
        <button
          type="button"
          className="block mt-6 h-14 mx-auto w-full px-6 py-3 leading-none font-semibold rounded-lg text-white bg-gray-900 focus:outline-none"
        >
          Create Course
        </button>
      </div>
    </div>
  );
};

CreateCourse.getLayout = (page) => (
  <RootLayout>
    {page}
  </RootLayout>
);

export default CreateCourse;
