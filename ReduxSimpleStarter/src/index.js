import React, { Component } from 'react'; // Core React knows how to render components, how to render them.
import ReactDom from 'react-dom'; // taking the component and inserting into the dom is however is handeled by React Dom.
import YTSearch from 'youtube-api-search'; // 236 Youtube Search Response
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
const API_KEY = 'AIzaSyBP3Qmn8iXNUiLdH0SY3eVQiF8tO46fAoY'; // 228 Youtube Search API Signup

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { videos: [] };

        YTSearch({ key: API_KEY, term: 'surfboards' }, (videos) => {
            this.setState({ videos });
        });
    }

    render() {
        return (
            <div>
                <SearchBar />
                <VideoList videos={this.state.videos} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('.container')); // 223 ES6 Import Statements. // <App />: 224 ReactDOM vs React