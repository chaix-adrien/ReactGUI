import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import CompoUsed from "./CompoUsed"

class GeneratedView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			content: [],
		}
	}

	onDragEnd = event => {
		console.log(event)
		if (event.destination && event.destination.droppableId.includes("GeneratedView")) {
			if (event.draggableId.includes("used")) {
			} else {
				this.setState(state => {
					const content = state.content.concat(<CompoUsed key={state.content.length} id={state.content.length} type={event.draggableId} />)
					return { content }
				})
			}
		}
	}

	componentWillMount() {
		this.props.onDragEndBind(this.onDragEnd)
	}

	render() {
		return (
			<Droppable droppableId="GeneratedView">
				{(provided, snapshot) => (
					<div {...provided.droppableProps} ref={provided.innerRef} style={{ backgroundColor: "white", flex: 8 }}>
						{this.state.content}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		)
	}
}

export default GeneratedView
