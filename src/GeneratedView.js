import React from "react"
import CompoUsed from "./CompoUsed"
import { DropTarget } from "react-dnd"

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	}
}

const itemSource = {
	drop(props, m, object) {
		console.log("LEFT ON MAIN")
		return { addChild: object.addChild }
	},
}

class GeneratedView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			content: [],
		}
	}

	addChild = type => {
		this.setState(state => {
			const content = state.content.concat(<CompoUsed key={state.content.length} id={state.content.length} type={type} />)
			return { content }
		})
	}

	componentWillMount() {
		this.props.onDragEndBind(this.onDragEnd)
	}

	render() {
		const { connectDropTarget } = this.props
		return connectDropTarget(<div style={{ backgroundColor: "white", flex: 8 }}>{this.state.content}</div>)
	}
}

export default DropTarget("div", itemSource, collect)(GeneratedView)
