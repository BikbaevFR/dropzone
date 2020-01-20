import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    isDragging: false,
    isFileFromOS: true,
    hasDraggedFileFromBrowserOutsideOfWindow: false,
    cachedTarget: null
  };

  componentDidMount() {
    window.addEventListener("dragstart", this.handleDragStart);
    window.addEventListener("dragenter", this.handleDragEnter);
    window.addEventListener("dragover", this.handleDragOver);
    window.addEventListener("dragleave", this.handleDragLeave);
    window.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    window.removeEventListener("dragstart", this.handleDragStart);
    window.removeEventListener("dragenter", this.handleDragEnter);
    window.removeEventListener("dragover", this.handleDragOver);
    window.removeEventListener("dragleave", this.handleDragLeave);
    window.addEventListener("drop", this.handleDrop);
  }

  handleDragStart = () => {
    this.setState({
      isFileFromOS: false,
      hasDraggedFileFromBrowserOutsideOfWindow: false
    });
    console.log("Drag started from browser");
  };

  handleDragEnter = e => {
    this.setState({
      cachedTarget: e.target
    });
  };

  handleDragOver = e => {
    e.preventDefault();

    const {
      hasDraggedFileFromBrowserOutsideOfWindow,
      isFileFromOS,
      isDragging
    } = this.state;

    if (hasDraggedFileFromBrowserOutsideOfWindow && document.hasFocus()) {
      console.log("Dragged file back into view from browser");
    } else if (isFileFromOS) {
      console.log("Dragging from OS");
      this.setState({
        hasDraggedFileFromBrowserOutsideOfWindow: false
      });

      if (!isDragging) {
        this.setState({
          isDragging: true
        });
      }
    } else {
      console.log("Dragging from browser");
    }
  };

  handleDragLeave = e => {
    const {
      cachedTarget,
      isFileFromOS,
      hasDraggedFileFromBrowserOutsideOfWindow,
      isDragging
    } = this.state;

    if (e.target === cachedTarget) {
      if (isFileFromOS && !hasDraggedFileFromBrowserOutsideOfWindow) {
        console.log("Left view from OS");

        if (isDragging) {
          this.setState({
            isDragging: false
          });
        }
      } else {
        console.log("Left view from browser");
        this.setState({
          hasDraggedFileFromBrowserOutsideOfWindow: false,
          isFileFromOS: true
        });
      }
    }
  };

  handleDrop = e => {
    console.log("drop");
    e.preventDefault();

    const { isDragging } = this.state;

    // Reset isFileFromOS flag
    this.setState({
      isFileFromOS: true,
      hasDraggedFileFromBrowserOutsideOfWindow: false
    });

    if (isDragging) {
      this.setState({
        isDragging: false
      });
    }
  };

  render() {
    const { isDragging } = this.state;

    console.log("isDragging", isDragging);

    return (
      <div className="App">
        <div className="container">
          <h1>React</h1>
        </div>
      </div>
    );
  }
}

export default App;
