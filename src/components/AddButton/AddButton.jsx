import React from "react";
import "./AddButton.css";

class AddButton extends React.Component {
    render() {
        return (
            <div className="col-2">
                <button className="add-button"
                       type="button"
                       onClick={this.props.onAddNote}>
                    <p>ADD</p>
                </button>
            </div>
        );
    }
}

export default AddButton;