import React, { Component } from 'react';
import { Icon } from '@iconify/react';

class Convert extends Component {
    // Initialize state in the constructor
    constructor(props) {
        super(props);
        this.state = {
            value: '' // Initial value of input
        };
    }

    // Method to calculate width based on the length of the value
    getWidth = () => {
        const length = this.state.value.length || 1.6; // Default width for empty input
        return `${length * 2.5}ch`; // Dynamically calculate width
    };

    // Render method to return JSX
    render() {
        return (
            <>
                <div className="flex">
                    <div className="flex">
                        <input
                            type="number"
                            value={this.state.value}
                            onChange={(e) => this.setState({ value: e.target.value })}
                            className="text-6xl text-white text-center p-4 border border-[#333] bg-black rounded-l-lg"
                            style={{ width: this.getWidth() }} // Dynamically set the width
                        />
                    </div>
                    <div>=</div>
                    <div className="flex"></div>
                </div>
            </>
        );
    }
}

export default Convert;
