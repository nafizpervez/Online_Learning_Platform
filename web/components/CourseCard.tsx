// components/CourseCard.js

import { Course } from '../types/types';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="grid grid-cols-1 w-full grid-flow-dense">
            <div className="card w-full px-6 py-4 col-span-2 space-y-2 border border-gray-300  bg-gray-50 shadow-[0_4px_9px_-4px_#3b71ca]">
                <div className="card-header text-center px-5 py-2 items-center justify-center border border-gray-200 font-semibold shadow-[0_4px_9px_-4px_#3b71ca]">
                    <h2 className="text-xl font-semibold mb-2">{`Course ID: ${course.course_id}`}</h2>
                </div>
                <div className="card-body order-b-2  px-6 py-3 justify-center text-black shadow-[0_4px_9px_-4px_#3b71ca]">
                    <table className="table-preview bordertext-xs font-medium leading-normal]">
                        <tr className="col-span-2 space-y-2 border  lg:whitespace-nowrap px-4 pl-4 pr-3 text-sm sm:pl-6 border-gray-200 py-2">
                            <td className="w-80 py-2 px-5">Title</td>
                            <td className="w-80 py-2 px-5">{course.title}</td>
                        </tr>
                        <tr className="col-span-2 space-y-2 border lg:whitespace-nowrap  px-4  text-sm sm:pl-6 border-gray-200 py-2">
                            <td className="w-80 py-2 px-5">Description</td>
                            <td className="w-80 py-2 px-5">{course.description}</td>
                        </tr>
                        <tr className="col-span-2 space-y-2 border  lg:whitespace-nowrap  px-4 border-gray-200 py-2">
                            <td className="w-80 py-2 px-5">Instructor</td>
                            <td className="w-80 py-2 px-5">{course.instructor}</td>
                        </tr>
                        <tr className="col-span-2 space-y-2 border lg:whitespace-nowrap  px-4 border-gray-200 py-2">
                            <td className="w-80 py-2 px-5">Duration</td>
                            <td className="w-80 py-2 px-5">{course.duration}</td>
                        </tr>
                        <tr className="col-span-2 space-y-2 border lg:whitespace-nowrap  px-4 border-gray-200 py-2">
                            <td className="w-80 py-2 px-5">Price</td>
                            <td className="w-80 py-2 px-5">{course.price}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default CourseCard;