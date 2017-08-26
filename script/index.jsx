var React = require('react');
var ReactDOM = require('react-dom');

//全局变量，后面的filter中会用到
var app = global.app || {};
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';
global.app = app;

//获得TodoList组件，引用也是要放在</>中
var TodoList = require('./TodoList.jsx');

var Main = React.createClass({
  getInitialState: function(){
      return {
          newTodo: ''
      }
  },
  handleNewTodoKeyDown: function(evt){
      //如果按下的不是回车则返回
      if(evt.keyCode !== 13){
          return;
      }     
      //是回车键，先阻止默认事件
      evt.preventDefault();
      //从state中取值，trim是去掉字符串开头和结尾的空格
      var val = this.state.newTodo.trim();
      if(val){
        this.refs.todoApp.onAdd(val);
        //输出之后要清空state
        this.setState({newTodo: ''});
      }
  },
handleChange: function(evt){
    this.setState({newTodo: evt.target.value});
},

  render: function(){
    return (
    <div className="todoapp">
        <header className = "todoapp">
              <h1>todos</h1>
              <input className = "new-todo" type="text" placeholder = "What needs to be down?"
              autoFocus = {true}  onKeyDown={this.handleNewTodoKeyDown} onChange={this.handleChange}
              value={this.state.newTodo} />
              <TodoList ref="todoApp"/>
        </header>
    </div>
    )
  }
})

ReactDOM.render(<Main />, document.getElementById('main'));
