import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],

  }

  const sum = course.parts.reduce((total, part) => total + part.exercises, 0)

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={sum}></Total>
    </div>
  )
}

export default App