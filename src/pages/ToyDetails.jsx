import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { useEffect, useState } from "react"

export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        }
        catch (err){
            console.log('cannot load toy details', err)
        }
    }

    function getToyLabels() {

    }

    if (!toy) return <div className="loader"><span>III</span></div>
    return (
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <p>Toy price: {toy.price}</p>
            {/* <p>Toy labels: {getToyLabels}</p> */}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            <Link to={`/toy`}>Back</Link>
        </section>
    )


}