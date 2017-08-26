var React = require('react');
var ReactDOM = require('react-dom');

var TodoItem = require('./TodoItem.jsx');
var TodoFooter = require('./TodoFooter.jsx');

//每条记录的编号，自增
var ids = 0;

var TodoList = React.createClass({
   	getInitialState: function(){
		return {
			db: []
		}
   	},

	//添加item的方法，ref将这个方法暴露给父级index.jsx
   	onAdd: function(val){
   		//往db中添加数据
		this.state.db.push({title:val, completed: false,  id: ++ids});
		this.setState(this.state);
   	},

	//点击完成某个item的方法，直接用参数传给子集即可
	onToggle: function(id){
		for(var i=0; i<this.state.db.length; i++){
			var item = this.state.db[i];
			if(item.id == id){
				item.completed = !item.completed;
				break;
			}
		}
		this.setState(this.state);
	},

	//删除事件
	onDestroy: function(id){
		for(var i=0; i<this.state.db.length; i++){
			var item = this.state.db[i];
			if(item.id == id){
				this.state.db.splice(i,1);
				break;
			}
		}
		this.setState(this.state);
	},

	//点击全部完成事件
	toggleAll: function(evt){
		for(var i=0; i<this.state.db.length; i++){
			this.state.db[i].completed = evt.target.checked;
		}
		this.setState(this.state);
	},

	//从后往前清除全部数据
	onClear: function(){
	    for(var i=this.state.db.length - 1; i>=0; i--){
	      var item = this.state.db[i]
	      if(item.completed){
	        this.state.db.splice(i, 1);
	      }
	    }
    	this.setState(this.state);
  	},

  	//过滤
    onFilter: function(showState){
    		//state增加一个属性nowShowing，公共变量的三种值，all，active，completed
    		this.setState({nowShowing: showState})
    },

	render: function(){
		//db过滤，return true的通过过滤，然后在map填充item数据即可
		var todos = this.state.db.filter(function(item){
		      switch (this.state.nowShowing) {
		        case app.ACTIVE_TODOS: //公共变量，值为active
		          return !item.completed;
		        case app.COMPLETED_TODOS: //公共变量，值为completed
		          return item.completed;
		        default:  //传进来的是all的话，直接返回true，不过滤返回全部条目
		          return true;
		      }
    		}.bind(this));
		todos = todos.map(function(item){
			return <TodoItem key={item.id}  title={item.title} completed={item.completed} 
			            onToggle = {this.onToggle.bind(this, item.id)} onDestroy = {this.onDestroy.bind(this, item.id)}/>
		}.bind(this));

		//计算footer，未完成的任务，已经完成的任务
	    var footer = null;
		var activeTodoCount = this.state.db.reduce(function (accum, todo) {
		      return todo.completed ? accum : accum + 1;
		    }, 0);
		var completedCount = this.state.db.length - activeTodoCount;
		if(activeTodoCount || completedCount){
			footer = <TodoFooter 
		    count={activeTodoCount}
		    completedCount={completedCount}
		    nowShowing={this.state.nowShowing}
		    onClear={this.onClear}
		    onFilter={this.onFilter} />
		}

	    return (
	    <section className="main">
		 	<input className= "toggle-all" type="checkbox" onChange={this.toggleAll}/>
		 	<ul className="todo-list">
		  		{todos}
		 	</ul>
		 	{footer}
	    </section>
	    )
	 }
})

//将该组件输出
module.exports = TodoList