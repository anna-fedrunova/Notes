import React from "react";
import "./СolorPicker.css";

class ColorPicker extends React.Component {
    constructor(props){
        super(props);
        this.chooseColor = this.chooseColor.bind(this);
    }
    chooseColor(){
        const picker = document.querySelector('#color-picker');
        let color = picker.value;
        this.props.onColorChoose(color);
    }
    render() {
        return (
            <div className="col-2">
                <div className="picker-container">
                    <input id="color-picker"
                           className="color-picker"
                           type="color"
                           defaultValue="#82e8a4"
                           onChange={this.chooseColor}/>
                    <label htmlFor="color-picker">
                        <img alt="color-picker" src={require('../../img/color-picker.png')}/>
                    </label>
                </div>
            </div>
        )
    }
}
export default ColorPicker;