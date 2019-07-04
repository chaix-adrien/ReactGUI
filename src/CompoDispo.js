import React from "react"
import "./CompoDispo.css"

class CompoDispo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<div className="compo-dispo">
				<p>{this.props.compo}</p>
			</div>
		)
	}
}

export default CompoDispo
