import React from "react";
import './NotesSearch.css';

class NotesSearch extends React.Component {
    constructor(props){
        super(props);
        this.getSearchInput=this.getSearchInput.bind(this);
    }
    getSearchInput(e){
       let searchString = e.target.value;
       this.props.onSearch(searchString.toLowerCase());
    }
    render(){
        return(
          <div className="col-8 px-0">
              <input className="search"
                     value={this.props.searchValue}
                     type="text"
                     placeholder="Search in the notes"
                     onChange={this.getSearchInput}/>
          </div>
        );
    }
}
export default NotesSearch;