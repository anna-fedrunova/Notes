import React from "react";
import "./Note.css";

class Note extends React.Component {
    render(){
        const noteStyle ={
            backgroundColor: this.props.color
        };
        return (
            <div style={noteStyle} className="note">
                <div className="delete-btn">
                    <button onClick={this.props.onDelete}>X</button>
                </div>
                <div>{this.props.children} </div>
            </div>
        );
    }
}
export default Note;