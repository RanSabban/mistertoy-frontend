import { Link } from "react-router-dom"
import { ToyPreview } from "../cmps/ToyPreview"
import { Card, CardContent } from "@mui/material"
import { Button } from "@mui/material";

export function ToyList({toys, onRemoveToy}) {

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy => {
                return (
                    <Card variant="outlined" sx={{m: 1, padding:1, boxShadow: 6, maxWidth: 400}} className="toy-preview" key={toy._id}>
                        <ToyPreview toy={toy}/>
                        <Button onClick={() => onRemoveToy(toy._id)}>Remove</Button>
                        <Button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></Button>
                        <Button><Link to={`/toy/details/${toy._id}`}>Details</Link></Button>
                    </Card>
                )
            })

            }
        </ul>
    )
}