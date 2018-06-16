import React, { Component } from "react";
import { Footer } from "react-materialize";

class NavBottom extends Component {
  render() {
    return (
      <div id="footer">
        <Footer
          copyrights="&copy; 2018 Zhenzhen You"
          moreLinks={
            <a
              className="grey-text text-lighten-4 right"
              href="https://github.com/zzyou/visual-housing-price"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
          }
          links={
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/zzyou"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://www.linkedin.com/in/zhenzhenyou/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://twitter.com/zhenzhen_you"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="mailto:youzhenzhen@gmail.com"
                  target="_top"
                >
                  Email
                </a>
              </li>
            </ul>
          }
          className="example"
        >
          <h5 className="white-text">
            <i>Viztory: Visual House Price</i>
          </h5>
          <p className="grey-text text-lighten-4">
            Data based on House Price Index (HPI): a weighted, repeat-sales
            index, measuring average price changes in repeat sales or
            refinancings on the same single-family houses in the United States.
          </p>
        </Footer>
      </div>
    );
  }
}

export default NavBottom;
