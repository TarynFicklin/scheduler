import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'

export default function Info(props) {
	const {location} = props
	return (
		<div className="header">
			<Link to="/"><button>X</button></Link>
			<h1>{location}</h1>
		</div>
	)
}