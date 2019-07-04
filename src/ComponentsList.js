import React from "react"
import CompoDispo from "./CompoDispo"
class ComponentsList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		let key = 0
		return (
			<div style={{ backgroundColor: "#eceff1", flex: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
				{["div", "p", "img"].map((item, id) => (
					<CompoDispo key={id} compo={item} />
				))}
			</div>
		)
	}
}

export default ComponentsList
