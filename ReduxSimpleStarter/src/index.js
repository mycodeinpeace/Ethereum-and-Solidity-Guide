import React, { Component } from 'react'; // Core React knows how to render components, how to render them.
import ReactDom from 'react-dom'; // taking the component and inserting into the dom is however is handeled by React Dom.
import YTSearch from 'youtube-api-search'; // 236 Youtube Search Response
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBP3Qmn8iXNUiLdH0SY3eVQiF8tO46fAoY'; // 228 Youtube Search API Signup

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards')
    };

    videoSearch(term) {
        YTSearch({ key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        return (
            <div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />

                    
            </div>
        );
    };
}

ReactDom.render(<App />, document.querySelector('.container')); // 223 ES6 Import Statements. // <App />: 224 ReactDOM vs React