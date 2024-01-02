import { useState } from 'react'

export default function Points(props) {
    const points = props.points
    const [total, setTotal] = useState(0)

    return <div className="points">{points}</div>
}