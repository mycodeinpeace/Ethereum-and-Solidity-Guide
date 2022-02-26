// 223 ES6 Import Statements
// We are telling that we will use React component from the react library in node_modules folder.
// Otherwise this will not be imported and we will get an error at React.render(App);
import React from 'react'; // Core React knows how to render components, how to render them.
import ReactDom from 'react-dom'; // taking the component and inserting into the dom is however is handeled by React Dom.

// 236 Youtube Search Response
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyBP3Qmn8iXNUiLdH0SY3eVQiF8tO46fAoY'; // 228 Youtube Search API Signup

// 236 Youtube Search Response
// 
YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
    console.log(data);
});

// Create a new component
// This componenet should produce some HTML
// 222 More on JSX
const App = () => { // => a new way to define function using ES6 syntax.
    return (
        <div>
            <SearchBar />
        </div>
    );
}


// Take this component's generated HTML
// and put it on the page (in the DOM)
ReactDom.render(<App />, document.querySelector('.container')); // 223 ES6 Import Statements. // <App />: 224 ReactDOM vs React
                        // , document.querySelector('.container'): says render this HTML from App, to the container (class name) element in our index.html