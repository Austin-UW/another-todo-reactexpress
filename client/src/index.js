import React from 'react'
import ReactDOM from 'react-dom'
import $  from 'jquery'
import './styles.css'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      input: ''
    }
    this.onChange = this.onChange.bind(this)
    this.post = this.post.bind(this)
    this.get = this.get.bind(this)
  }
  post = (e) => {
    e.preventDefault()
    axios.post('/todo', {item: this.state.input})
    this.get()
  }
  onChange = (event) => {
    this.setState({...this.state, input: event.target.value})
  }
  delete(i) {
    fetch('/todo/' + this.state.todos[i].item.toString().replace(/ /g, '-'), {
      method: 'delete'
    })
    this.get()
  }
  get() {
    axios.get('/todo')
    .then(res => {
      this.setState({...this.state, todos: res.data})
    })
    .catch(err => console.log(err))
  }
  componentDidMount() {
    this.get()
  }
  render() {

    return (
      <div>
        <form onSubmit={this.post}>
          <input value={this.state.input} placeholder="enter todo name here" onChange={this.onChange} required={true} type="text" name="item"/>
          <button type="submit">Submit todo</button>
        </form>
        {this.state.todos.map((todo) => (
          <h2 style={{backgroundColor: 'black'}} onClick={() => this.delete(this.state.todos.indexOf(todo))} key={Math.floor((Math.random() * 1000000) + 1)}>{todo.item}</h2>
        ))}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
