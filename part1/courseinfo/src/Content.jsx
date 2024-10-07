/* eslint-disable react/prop-types */
import Part from "./Part"

const Content = ({parts}) => {
    return (
        <div>
            {
                parts.map((part,index) => (
                    <Part key={index} part={part.name} exercise={part.exercises}></Part>
                ))
            }
        </div>
    )
}

export default Content