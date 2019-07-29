import React from "react";
import "./СolorPicker.css";

class ColorPicker extends React.Component {
    constructor(props){
        super(props);
        this.chooseColor = this.chooseColor.bind(this);
    }
    rgbToHex(rgb) {
        let divider = rgb.indexOf(',');
        let r = rgb.slice(4, divider);
        let divider2 = rgb.lastIndexOf(',');
        divider = divider+1;
        let g = rgb.slice(divider, divider2);
        divider2++;
        let end = rgb.indexOf(')');
        let b = rgb.slice(divider2, end);
        let toHex = (part) => {
            let hex = Number(part).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        };
        r = toHex(r);
        g = toHex(g);
        b = toHex(b);
        return '#'+r+g+b;
    }
    chooseColor(){
        const picker = document.querySelector('#color-picker');
        let color = picker.value;
        this.props.onColorChoose(color);
    }
    render() {
        let color = this.rgbToHex(this.props.color);
        return (
            <div className="col-2">
                <div className="picker-container">
                    <input id="color-picker"
                           className="color-picker"
                           type="color"
                           value={color}
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