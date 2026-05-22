import { useParams } from "react-router-dom"

function Create() {
    const {action, type} = useParams();
  return (
    <div>Action: {action}, Type: {type}</div>
  )
}

export default Create;