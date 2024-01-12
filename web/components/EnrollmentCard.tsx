// components/CourseCard.js

import { Enrollment } from '../types/types';

interface EnrollmentCardProps {
    enrollment: Enrollment;
}

const EnrollmentCard: React.FC<EnrollmentCardProps> = ({ enrollment }) => {
    return (
        <div className="grid grid-cols-2 grid-flow-dense">
            <div className="card w-full px-6 py-4 col-span-2 space-y-2 border border-gray-300  bg-gray-50 shadow-[0_4px_9px_-4px_#3b71ca]">
                <div className="card-header flex flex-col items-center justify-center border border-gray-200 font-semibold shadow-[0_4px_9px_-4px_#3b71ca]">
                    <h2 className="text-xl font-semibold mb-2">{`Course ID: ${enrollment.course_id}`}</h2>
                </div>
                <div className="card-body flex flex-auto order-b-2  px-6 py-3 justify-center text-black shadow-[0_4px_9px_-4px_#3b71ca]">
                    <table className="table-preview bordertext-xs font-medium leading-normal]">

                        <tr className="col-span-2 space-y-2 border lg:whitespace-nowrap  px-4  text-sm sm:pl-6 border-gray-200 py-2">
                            <td className="w-80 py-2 px-10">Student Namae</td>
                            <td className="w-80 py-2 px-10">{enrollment.studentName}</td>
                        </tr>
                        <tr className="col-span-2 space-y-2 border lg:whitespace-nowrap  px-4 border-gray-200 py-2">
                            <td className="w-80 py-2 px-10">Instructor</td>
                            <td className="w-80 py-2 px-10">{enrollment.enrollmentDate}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default EnrollmentCard;