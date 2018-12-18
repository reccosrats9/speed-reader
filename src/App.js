import React, { Component } from 'react';
import './App.css';
import Pause from '@material-ui/icons/PauseCircleFilled'
import Play from '@material-ui/icons/PlayCircleFilled'
import Close from '@material-ui/icons/Close'

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      displayBox: true,
      word: '',
      speedInMS: 120,
      i: 0,
      wordsArray: [],
      paused: false
    }
  }

  updateInput = e => {
    this.setState({ input: e.target.value })
  }

  toggleDisplay() {
    this.setState({ displayBox: !this.state.displayBox })
  }

  togglePause = () => {
    this.setState({ paused: !this.state.paused }, this.logger)
  }

  exitPlayback = () => {
    // this.toggleDisplay()
    // this.togglePause()
    // this.setState({i:0})
    this.setState({ displayBox: true })
  }

  setSpeed = (e) => {
    let speedInMS = 60000 / e.target.value
    this.setState({ speedInMS })
  }

  logger = () => {
    let { i, wordsArray, paused } = this.state
    if (i === 0) { this.toggleDisplay() }
    if (wordsArray.length <= 0) {
      let words = this.state.input.slice().replace(/(\n)/g, ' ').split(' ')
      this.setState({ wordsArray: words })
      this.timer(i)
    } else {
      if (i < wordsArray.length && !paused) {
        this.timer(i)
      } else if (i >= wordsArray.length) {
        this.toggleDisplay()
        this.setState({ i: 0, word: '' })
      }
    }
  }

  timer = (i) => {
    setTimeout(() => {
      this.state.displayBox ?
        this.setState({ i: 0, word: '' })
        :
      this.setState({ word: this.state.wordsArray[i], i: i + 1 }, this.logger)
    }, this.state.speedInMS)
  }

  render() {
    return (
      <div className="App">
        <h1 className={this.state.displayBox ? "title" : "small title"}>Speed Reader</h1>
        <div className='speedAndPause' >
          {!this.state.displayBox ? <Close style={{ color: '#29F89C', height: 40, width: 40}} onClick={this.exitPlayback} />  :null}  
          <select onChange={this.setSpeed} defaultValue='500' >
            <option value="200">200 wpm</option>
            <option value="300">300 wpm</option>
            <option value="400">400 wpm</option>
            <option value="450">450 wpm</option>
            <option value="500">500 wpm</option>
            <option value="550">550 wpm</option>
            <option value="600">600 wpm</option>
            <option value="650">650 wpm</option>
            <option value="700">700 wpm</option>
            <option value="750">750 wpm</option>
            <option value="800">800 wpm</option>
            <option value="850">850 wpm</option>
            <option value="900">900 wpm</option>
            <option value="950">950 wpm</option>
            <option value="1000">1000 wpm</option>
            
          </select>
          {!this.state.displayBox ?
            this.state.paused ?
              <Play style={{ color: '#29F89C', height: 50, width: 50 }} onClick={this.togglePause} />
              : <Pause style={{ color: '#29F89C', height: 50, width: 50 }} onClick={this.togglePause} />
            : null}          
        </div>

        <div className={this.state.displayBox ? "inputArea" : "hidden"}>
          <textarea placeholder="Paste your text and click the button to start speed reading" id="" cols="30" rows="10"
            onChange={this.updateInput} ></textarea>
          <div>
            <button onClick={this.logger}>Start reading!</button>
          </div>
        </div>
        <div className="word">{this.state.word}</div>
      </div>
    );
  }
}

export default App;
