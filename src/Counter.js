import React, { Component } from "react";
import "./App.css";
const ErrorComponent = () => <div> {props.ignore} </div>;
class Counter extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);

    this.state = {
      counter: 0,
      seed: 0,
    };

    this.increment = () => this.setState({ counter: this.state.counter + 1 })
    this.decrement = () => this.setState({ counter: this.state.counter - 1 })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
        initializing: true
      };
    }
    return null;
  }

  componentDidMount() {
    console.log("Did Mount");
    setTimeout(() => {
      this.setState({ initializing: false });
    }, 500);
    console.log("-------------------");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      console.log(" should Component Update - do not render");
      return false;
    }
    console.log(" should Component Update - Render");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate ");
    return null;
  }

  render() {
    console.log("render");

    if (this.state.initializing) {
      return <div> initializing.. </div>;
    }

    if (this.props.showErrorComponent && this.state.error) {
      return <div> Ошибка {this.state.error.message}</div>;
    }

    return (
      <div className="App">
        <button onClick={this.increment}> Увеличить счетчик</button>
        <button onClick={this.decrement}>Уменьшить счетчик</button>
        <p>Счетчик: {this.state.counter}</p>
        {this.props.showErrorComponent ? <ErrorComponent /> : null}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(" Did update ");
    console.log("-------------------");
    //console.log( this.state);
  }
  componentWillUnmount() {
    console.log("Will Unmount");
    console.log("-------------------");
  }

  componentDidCatch(error, info) {
    console.log("DidCatch - обработка ошибок");
    this.setState({ error, info });
  }
}
export default Counter;
