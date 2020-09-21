import React from 'react';


const Header = ({course}) => {
    return (
        <div>
            <h2>{course.name}</h2>
        </div>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course.map(courses =>
                <Part key={courses.id} course={courses}/>)}
        </div>
    )
}

const Part = ({course}) => {
    return (
      <p>
        {course.name} {course.exercises}
      </p>    
    )
  }

const Total = ({course}) => {
    const tot = course.reduce((p, c) => p + c.exercises, 0)
    return (
    <p>total of <b>{tot}</b> exercises</p>
    )
}

const Course = ({course}) => {
    
    return (
        <div>
            <Header course={course}></Header>
            <Content course={course.parts}></Content>
            <Total course={course.parts}></Total>
        </div>
    )
}


export default Course