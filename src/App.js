import React from "react"
import "./App.css"
import ComponentsList from "./ComponentsList"
import GeneratedView from "./GeneratedView"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<DndProvider backend={HTML5Backend}>
				<div className="App">
					<div className="App-body">
						<GeneratedView onDragEndBind={cb => (this.onDragEnd = cb)} />
						<ComponentsList />
					</div>
				</div>
			</DndProvider>
		)
	}
}

export default App
