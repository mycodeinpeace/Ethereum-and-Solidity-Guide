import React from 'react'; // Core React knows how to render components, how to render them.
import ReactDom from 'react-dom'; // taking the component and inserting into the dom is however is handeled by React Dom.
import YTSearch from 'youtube-api-search'; // 236 Youtube Search Response
import SearchBar from './components/search_bar';
const API_KEY = 'AIzaSyBP3Qmn8iXNUiLdH0SY3eVQiF8tO46fAoY'; // 228 Youtube Search API Signup

// 236 Youtube Search Response
YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
    console.log(data);
});

// 222 More on JSX
const App = () => { // => a new way to define function using ES6 syntax.
    return (
        <div>
            <SearchBar />
        </div>
    );
}

ReactDom.render(<App />, document.querySelector('.container')); // 223 ES6 Import Statements. // <App />: 224 ReactDOM vs React