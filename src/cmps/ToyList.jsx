import { Link } from "react-router-dom"
import { ToyPreview } from "../cmps/ToyPreview"

export function ToyList({toys, onRemoveToy}) {

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy => {
                return (
                    <li className="toy-preview" key={toy._id}>
                        <ToyPreview toy={toy}/>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                        <Link to={`/toy/details/${toy._id}`}>Details</Link>
                    </li>
                )
            })

            }
        </ul>
    )
}