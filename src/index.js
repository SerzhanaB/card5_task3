import React, { Component } from "react";
import ReactDOM from "react-dom";
//import './index.css';
import "./App.css";
//import App2 from "./App";
import Counter from "./Counter";
import reportWebVitals from "./reportWebVitals";

class App extends Component {
  constructor(props) {
    console.log("constructor для исходного аппа");
    super(props);
    this.state = {
      mount: true,
      ignoreProp: 0,
      seed: 40,
      showErrorComponent: false
    };

    this.mountCounter = () => this.setState({ mount: true })
    this.unmountCounter = () => this.setState({ mount: false })
    this.ignoreProp = () => this.setState({ ignoreProp: Math.random() })
    this.seedGenerator = () =>
      this.setState({ seed: Number.parseInt(Math.random() * 100) })

    this.toggleError = () =>
      this.setState({ showErrorComponent: !this.state.showErrorComponent })
  }

  render() {
    console.log("render аппа");
    return (
      <div className="App">
        <button onClick={this.mountCounter} disabled={this.state.mount}>
          Смонтировать счетчик
        </button>
        <button onClick={this.unmountCounter} disabled={!this.state.mount}>
          Размонтировать счетчик
        </button>
        <div>
          <button onClick={this.ignoreProp}> игнорировать пропсы</button>
          <button onClick={this.seedGenerator}> Сгененрировать</button>
          <button onClick={this.toggleError}> Ошибка переключения</button>

          {this.state.mount ? (
            <Counter
              ignoreProp={this.state.ignoreProp}
              seed={this.state.seed}
              showErrorComponent={this.state.showErrorComponent}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
