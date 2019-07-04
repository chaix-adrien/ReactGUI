import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import StyleEditor from "react-style-editor"
import Style from "style-it"
import PubSub from "pubsub-js"

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
		return (
			<Draggable index={this.id} draggableId={this.type + " used " + this.id}>
				{(provided, snapshot) => {
					console.log(provided)
					return (
						<div onClick={_ => PubSub.publish("EDIT", this.id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
				}}
			</Draggable>
		)
	}
}

export default CompoUsed
