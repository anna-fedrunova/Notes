import React from "react";
import "./AddButton.css";

class AddButton extends React.Component {
    render() {
        return (
            <div className="row justify-content-end mb-3 px-0">
                <div className="col-2">
                    <input className="add-button"
                           type="button"
                           value="ADD"
                           onClick={this.props.onAddNote}/>
                </div>
            </div>
        );
    }
}

export default AddButton;