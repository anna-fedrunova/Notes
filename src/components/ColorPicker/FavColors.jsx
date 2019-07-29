import React from "react";
import "./FavColors.css";

class FavColors extends React.Component {
    constructor(props) {
        super(props);
        this.colorsList = [
            'rgb(130,232,164)',
            '#95f1ed',
            '#f1f69c',
            '#f9ae9d',
            '#faaafc',
            '#fcaac3',
            '#b2aafc',
            '#aad3fc'
        ];
        this.setFavColor = this.setFavColor.bind(this);
    }
    setFavColor(e) {
        let color = e.target.style.backgroundColor;
        let list = document.querySelectorAll('.favcolor');
        list.forEach((color) => {
            if (color === e.target) {
                color.classList.add("chosen");
            } else color.classList.remove("chosen")
        });
        this.props.onColorChoose(color);
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
    componentDidUpdate() {
        let div = document.querySelectorAll('.favcolor');
        let currentColor = this.props.currentColor;
        currentColor = this.rgbToHex(currentColor);
        div.forEach((div) => {
            let color = div.style.backgroundColor;
            color = this.rgbToHex(color);
            if (color === currentColor) {
                div.classList.add("chosen");
            } else div.classList.remove("chosen")
        });
    }
    render() {
        return(
        <div className="colors-container">
        {this.colorsList.map((color) => {
            if (color === 'rgb(130,232,164)') {
                return(
                    <div className="favcolor chosen"
                         key={color}
                         style={{backgroundColor: color}}
                         onClick={this.setFavColor}></div>
                )
            }
            else return (
                <div className="favcolor"
                     key={color}
                     style={{backgroundColor: color}}
                     onClick={this.setFavColor}></div>
            )
        })}
        </div>
        )
    }
}

export default FavColors;