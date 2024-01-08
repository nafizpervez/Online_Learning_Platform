// types.ts
export interface Course {
    course_id: number;
    title: string;
    description: string;
    instructor: string;
    duration: number;
    price: number;
}

export interface Enrollment {
    course_id: number;
    studentName: string;
    enrollmentDate: string;
}



