import Part from "./Part"

const Content = ({parts}) => {
    const partsList = parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
    )

    return <div>{partsList}</div>
}

export default Content