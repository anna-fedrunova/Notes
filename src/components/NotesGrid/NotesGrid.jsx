import React from "react";
import Note from "../Note/Note.jsx";
import "./NotesGrid.css";

class NotesGrid extends React.Component {
    componentDidMount(){
        const grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: '.grid-size',
            gutter:7
        });
    }
    shouldComponentUpdate(nextProps){
        return nextProps.notes.length !== this.props.notes.length;
    }
    componentDidUpdate(){
        this.msnry.reloadItems();
        this.msnry.layout();
    }
    render(){
        return (
            <div className="row justify-content-between notes-grid" ref="grid">
                <div className="col-12 px-0">
                    <div className="grid-size"></div>
                    {this.props.notes.map((note) => {
                        return(
                            <Note
                                key={note.id}
                                color={note.color}
                                onDelete={this.props.onNoteDelete.bind(null, note)}>
                                {note.text}
                            </Note>
                        )
                    })}
                </div>
            </div>
        );
    }
}
export default NotesGrid;