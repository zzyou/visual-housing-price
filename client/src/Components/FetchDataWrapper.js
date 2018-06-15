import React, { Component } from "react";

const FetchDataWrapper = url => Comp =>
  class FetchData extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: [],
        isLoading: false,
        error: null
      };
    }

    componentDidMount() {
      this.setState({ isLoading: true });

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong with fetching data...");
          }
        })
        .then(data => this.setState({ data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
      return <Comp {...this.props} {...this.state} />;
    }
  };

export default FetchDataWrapper;
