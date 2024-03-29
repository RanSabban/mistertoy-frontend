

export function ToyPreview({toy}) {

    function getLabels() {
        let str = ''
        toy.labels.forEach((label,index) => {
           str += `${label}`
           if (index < toy.labels.length - 1) {
            str += ', ';
        }
        })
        console.log(str);
        return str
    }

    // console.log(getLabels());

    return ( <>
        <h1>Name: {toy.name}</h1>
        <p>Price: ${toy.price}</p>
        <img src={toy.img} />
       
        <p>Labels: {getLabels()}  {!toy.labels.length && <span>No labels</span>}</p>
    </>
    )
}