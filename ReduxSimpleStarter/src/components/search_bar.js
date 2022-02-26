import React, {Component} from 'react';

// 230 Class Based Components
class SearchBar extends Component  {

    // 232 Introduction to State
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() {
        return (
            <div>
                <input onChange={(event) => this.setState({ term: event.target.value })} /> // 233 State Continued
            </div>
        )
    }
}

export default SearchBar;