import React, { Component } from "react";
import "./item-add-form.css"


export default class itemAddForm extends Component {
    state = {
        label : ""
    };
    onLabelsChange = (e)=> {
        this.setState({
            label: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({label: ""
        });
    }
    render() {
        return (
            <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}>
                <input type="text"
                className="form-control"
                onChange={this.onLabelsChange}
                placeholder="What need to be done?"
                value={this.state.label}/>
                <button className="btn btn-primary">Add Item</button>
            </form>
        )
    }
}