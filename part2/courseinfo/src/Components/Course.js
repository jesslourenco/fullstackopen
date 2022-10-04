import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({courses}) =>{

    return (
    <div>
        <h1>Web Development Curriculum</h1>
            {courses.map(course => 
                <div key={course.id}>
                    <Header key={course.id} title={course.name} />
                    {course.parts.map(part => 
                        <Content key={part.id} topic={part.name} exercises={part.exercises} />
                    )}
                    <Total total={course.parts
                        .map(e => e.exercises)
                        .reduce((total, item) => 
                            total + item, 0)}  
                    />
                </div>
            )
            }
            
    </div>
    )
}
export default Course