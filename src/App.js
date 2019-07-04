import React from "react"
import "./App.css"
import ComponentsList from "./ComponentsList"
import GeneratedView from "./GeneratedView"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<DragDropContext onDragEnd={e => this.onDragEnd(e)}>
				<div className="App">
					<div className="App-body">
						<GeneratedView onDragEndBind={cb => (this.onDragEnd = cb)} />
						<ComponentsList />
					</div>
				</div>
			</DragDropContext>
		)
	}
}

export default App
