/*
 * Copyright (C) 2022 Soham Pardeshi.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Summer Quarter 2022 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

import React, {ChangeEvent, Component} from 'react';

interface EdgeListProps {
    onClick: (edges: Array<string[]>) => any;
}

interface EditState {
    textArea: string | number
}

/**
 * A text field that allows the user to enter the list of edges.
 * Also contains the buttons that the user will use to interact with the app.
 */
class EdgeList extends Component<EdgeListProps, EditState> {

    constructor(props: EdgeListProps) {
        super(props);
        this.state = {
            textArea: "Type edges here",
        };
    }

    //Handles the text being entered into the text box
    handleChange(value: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            textArea: value.target.value
        })
    }

    //Takes in the current text in the box and converts it into an array of edges
    //or an empty array if no edges exist
    handleDraw(textArea: string | number | undefined ) {
        let d = new Array<string[]>();
        if(textArea !== undefined && textArea !== "Type edges here") {
            let g = textArea.toString().split("\n");
                d = this.parseText(g);
        }
        return d;
    }

    //Parses through all the text that has already been separated into a large array and
    //returns either an array full of valid edges, or an empty array
    parseText(text: string[]) {
        let g = new Array<string[]>();
            for (let i = 0; i < text.length; i++) {
                if(text[i].split(" ").length === 5) {
                    g.push(text[i].split(" "));
                }

            }
        if(this.confirm(g) === "invalid") {
            g = new Array<string[]>();
        }
        return g;
    }

    //confirms that everything in the prop will be valid as an input for MapLine
    confirm(vals: Array<string[]>) {
        let d: string = "";
        for(let i = 0; i < vals.length;i++) { //Check for invalid values of every index
            if(vals[i].length === 5) {
                let current = vals[i];
                let x1 = current[0];
                let y1 = current[1];
                let x2 = current[2];
                let y2 = current[3];

                if (isNaN(Number(x1)) || isNaN(Number(y1)) || isNaN(Number(x2)) || isNaN(Number(y2))) {
                    d = "invalid";
                } else if(Number(x1) > 4000 || Number(y1) > 4000 || Number(x2) > 4000 || Number(y2) > 4000 ) {
                    d = "invalid";
                }
            }
        }
        return d;
    }

    //Deletes everything in the current text box and replaces it with a prompt
    handleClear() {
        this.setState( {
            textArea: "No current edges..."
        });
    }

    render() {
        return (
            <div id="edge-list">
                Edges(x1 y1 x2 y2 color) <br/>
                <textarea
                    rows={5}
                    cols={30}
                    value={this.state.textArea}
                    onChange={(value) => {
                            this.handleChange(value); //Hands the text area to the state of this class
                    }}
                    />
                <br/>
                <button onClick={() => {
                    this.props.onClick(this.handleDraw(this.state.textArea)); //Links onClick with the
                                                                              // prop function(with sorted edges)
                }}>Draw
                </button>
                <button onClick={() => {
                    this.handleClear(); // Clears text area
                    this.props.onClick(this.handleDraw(undefined)); //clears all current edges
                    }}>Clear
                </button>
                <p>
                    Make sure to hit return or enter after every point! <br/>
                    Every point must be less than or equal to 4000
                </p>
            </div>
        );
    }
}

export default EdgeList;
