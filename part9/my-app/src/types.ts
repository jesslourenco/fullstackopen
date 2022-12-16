export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

export interface Description extends CoursePartBase {
    description: string;
}

export interface CourseNormalPart extends Description {
    type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

export interface CourseSubmissionPart extends Description {
    type: "submission";
    exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends Description {
    type: "special";
    requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface TotalProps {
    total: number
}

export interface HeaderProps {
    courseName: string;
}

export interface PartProps {
    coursePart: CoursePart
}

export interface ContentProps {
    courseParts: CoursePart[]
}



