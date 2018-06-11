import React, { Component } from 'react';
import { Footer } from 'react-materialize';

class BottomNav extends Component {
    render() {
        return (
            <div>
                <Footer 
                    copyrights="&copy; 2018 Zhenzhen You" 
                    moreLinks={
                        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                    }
                    links={
                        <ul>
                        <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                        <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                        <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                        <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                        </ul>
                    }
                    className='example'
                >
                    <h5 className="white-text">Visual Housing Price</h5>
                    <p id="data" className="grey-text text-lighten-4">Data based on Housing Price Index (HPI): a weighted, repeat-sales index, measuring average price changes in repeat sales or refinancings on the same single-family houses in the United States.</p>
                </Footer>
            </div>
        );
    }
}

export default BottomNav;
