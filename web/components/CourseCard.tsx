// components/CourseCard.js

import { Course } from '../types/types';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="grid grid-cols-1 gap-2 justify-center">
            <div className="card w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 bg-gray-100">
                <div className="card-header text-center bordertext-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] ]">
                    <h2 className="text-xl font-semibold mb-2">{`Course ID: ${course.course_id}`}</h2>
                </div>
                <div className="card-body flex flex-auto justify-center items-center ">
                    <table className="table-preview bg-white bordertext-xs font-medium leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] ]">
                        <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                            <td className="w-80 py-2 px-10">Title</td>
                            <td className="w-80 py-2 px-10">{course.title}</td>
                        </tr>
                        <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                            <td className="w-80 py-2 px-10">Description</td>
                            <td className="w-80 py-2 px-10">{course.description}</td>
                        </tr>
                        <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                            <td className="w-80 py-2 px-10">Instructor</td>
                            <td className="w-80 py-2 px-10">{course.instructor}</td>
                        </tr>
                        <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                            <td className="w-80 py-2 px-10">Duration</td>
                            <td className="w-80 py-2 px-10">{course.duration}</td>
                        </tr>
                        <tr className="border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500">
                            <td className="w-80 py-2 px-10">Price</td>
                            <td className="w-80 py-2 px-10">{course.price}</td>
                        </tr>
                    </table>
                </div>
                <button
                    type="button"
                    className="inline-block w-full border-gray-00 rounded-lg px-6 pb-2 pt-2.5 my-6 justify-center bordertext-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] ]"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    Button
                </button>
            </div>
        </div>
    );
};

export default CourseCard;