import React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";

const PageOne = () => {
    return <div>
        <p>Page one

        </p>
        <Link to="/pageTwo">Navigate Page two</Link>
    </div>
}
const PageTwo = () => {
    return <div><p>Page two</p>
        <Link to="/">Navigate Page one</Link>
    </div>


}
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Route path="/" exact component={PageOne}/>
                <Route path="/pageTwo" exact component={PageTwo}/>

            </BrowserRouter>
        </div>
    );
}

export default App;
