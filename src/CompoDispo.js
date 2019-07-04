import React from "react"
import "./CompoDispo.css"
import { DragSource } from "react-dnd"

const Types = {
	ITEM: "div",
}

const itemSource = {
	beginDrag(props) {
		console.log("begin")
		return { id: 1 }
	},
	endDrag(props, monitor) {
		monitor.getDropResult().addChild(props.compo)
	},
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

class CompoDispo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		const { isDragging, connectDragSource, src } = this.props
		return connectDragSource(
			<div className="compo-dispo">
				<p>{this.props.compo}</p>
			</div>
		)
	}
}

export default DragSource("div", itemSource, collect)(CompoDispo)
