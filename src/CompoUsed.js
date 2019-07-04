import React from "react"
import StyleEditor from "react-style-editor"
import Style from "style-it"
import PubSub from "pubsub-js"
import { DropTarget } from "react-dnd"
import { DragSource } from "react-dnd"

function collectDrop(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

function collectDrag(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}
}

const itemSourceDrop = {
	drop(props, m, object) {
		console.log("LEFT ON SUB")
		//	return { addChild: object.addChild }
	},
}

const itemSourceDrag = {
	beginDrag(props) {
		console.log("begin")
		return { id: 1 }
	},
	endDrag(props, monitor) {
		//monitor.getDropResult().addChild(props.compo)
	},
}

function getRandomColor() {
	var letters = "0123456789ABCDEF"
	var color = "#"
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

class CompoUsed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			style: `.div${props.id} {}`,
			edit: false,
		}
		this.id = this.props.id
		console.log(props.type)
		this.node = React.createElement(props.type, { className: "div" + this.id })
		this.type = this.props.type
		var token = PubSub.subscribe("EDIT", (msg, id) => {
			this.setState({ edit: id === this.id })
		})
	}

	componentWillMount() {
		PubSub.publish("EDIT", this.id)
	}

	render() {
		const { edit, style } = this.state
		const { connectDropTarget } = this.props
		const { isDragging, connectDragSource, src } = this.props

		return connectDragSource(
			connectDropTarget(
				<div>
					{Style.it(style + (edit ? `.${this.type}${this.id} {background-color: yellow}` : ""), this.node)}
					<div style={{ display: edit ? "unset" : "none", position: "absolute", right: 0, bottom: 0, width: "20%" }}>
						<StyleEditor
							onChange={value => {
								this.setState({ style: value })
							}}
							defaultValue={`.${this.type}${this.id} {border-style: dashed;width: 100px;height: 100px;border-color: ${getRandomColor()};}`}
						/>
					</div>
				</div>
			)
		)
	}
}

export default DragSource("div", itemSourceDrag, collectDrag)(DropTarget("div", itemSourceDrop, collectDrop)(CompoUsed))
