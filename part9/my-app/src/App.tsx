import { HeaderProps, ContentProps, TotalProps } from './types';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>
  };

  const Content = (props: ContentProps) => {
    return <p key={props.name}> { props.name } { props.exerciseCount } </p>
  };

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.total}</p>
  };


  return (
    <div>
      <Header courseName={courseName}/>
      <div>
        {courseParts.map(c => { return <Content name={c.name} exerciseCount={c.exerciseCount} key={c.name} /> })}
      </div>
      <Total total={total}/>
    </div>
  );
};

export default App;