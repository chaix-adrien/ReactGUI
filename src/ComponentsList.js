import React from "react"
import CompoDispo from "./CompoDispo"
import { Draggable, Droppable } from "react-beautiful-dnd"

class ComponentsList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		let key = 0
		return (
			<Droppable droppableId="compoList">
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={{ backgroundColor: "#eceff1", flex: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
						{["div", "p", "img"].map((item, id) => (
							<Draggable key={id + 1} index={id + 1} draggableId={item}>
								{(provided2, snapshot) => (
									<div ref={provided2.innerRef} {...provided2.draggableProps} {...provided2.dragHandleProps}>
										<CompoDispo compo={item} />
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		)
	}
}

export default ComponentsList
