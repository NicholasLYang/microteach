import React from "react"
import { Link } from 'react-router-dom'


const Tutorial = ({ tutorial }) => (
  <div>
    <Link to={"/projects/new?tutorial=" + tutorial.id}>
      <h2> {tutorial.name} </h2>
    </Link>
  </div>
)

export default Tutorial;