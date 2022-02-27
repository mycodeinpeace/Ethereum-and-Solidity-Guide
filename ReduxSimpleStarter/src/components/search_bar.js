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
            <div className='search-bar'>
                <input 
                    value = {this.state.term}
                    onChange={(event) => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;