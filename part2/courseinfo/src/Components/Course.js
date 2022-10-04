import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({courses}) =>{

    const courseTitles = courses.map(course => course.name)
    const courseParts = courses.reduce((acc, course) => [...acc, ...course.parts], [])  
    //const exercises = courseParts.map(e => e.exercises).reduce((x, item) => x + item, 0)
    
    //console.log(course)
    //console.log(exercises)

   

    return (
    <div>
        <h1>Web Development Curriculum</h1>
            {courses.map(course => 
                <div key={course.id}>
                    <Header key={course.id} title={course.name} />
                    {course.parts.map(part => 
                        <Content key={part.id} topic={part.name} exercises={part.exercises} />
                    )}
                </div>
            )}
            
    </div>
    )
}

/*<Content parts={course.parts} />
            <Total exercises={exercises} /> */
export default Course