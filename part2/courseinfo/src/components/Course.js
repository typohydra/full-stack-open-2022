import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>Total of {sum} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <ul>
    {parts.map(part => <Part key={part.id} part={part} />)}   
  </ul>

function Course ({ course }) {
  return <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} />
  </>
}

export default Course