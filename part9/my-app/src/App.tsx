import { TotalProps, HeaderProps, ContentProps, PartProps, CoursePart } from './types';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>
  };

  const Content = (props: ContentProps) => {
    return <div>
      {props.courseParts.map(part => <Part key={part.name} coursePart={part} />)}
    </div>

  };

  const Total = (props: TotalProps) => {
    return <p><b>Total exercises: {props.total}</b></p>
  };

  const Part = (props: PartProps) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    const part = props.coursePart;
    const commonInfo = <><p> <b>Course: {part.name}</b> <br></br> Exercises: {part.exerciseCount}</p></>

    switch (part.type) {
      case "groupProject":
        return (
          <div>
            {commonInfo}
            Group Projects: {part.groupProjectCount}
          </div>
        );
      case "normal":
        return(
          <div>
            {commonInfo}
            Description: {part.description}
          </div>
        );
      case "submission":
        return(
          <>
            {commonInfo}
            Description: {part.description}{' '}
            Submission: {part.exerciseSubmissionLink}
          </>
        );
        case "special":
          return(
            <>
            {commonInfo}
            Description: {part.description}{' '}<br></br>
            Requirements: {part.requirements.map(r => {return(<li key={r}>{ r }{' '}</li>)})}
          </>
          )       
      default:
        return assertNever(part);
    }
  }


  return (
    <div>
      <Header courseName={courseName} />
      <div>
        <Content courseParts={courseParts} />
      </div>
      <Total total={total} />
    </div>
  );
};

export default App;