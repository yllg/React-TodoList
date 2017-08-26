var React = require('react');
var ReactDOM = require('react-dom');

//单独引入classNames这个包的对象
var classNames = require('classNames');

var TodoFooter = React.createClass({
   	//先把父级传进来的过滤方法封装一下，因为下面的bind只能绑定该组件内部的方法
   	onFilter: function(showState){
	    this.props.onFilter(showState);
	 },

	render: function(){
		//定义一个clearButton按钮，完成的条目数>0就显示出来，
		//注意react语法，return出去的dom要放在()里面
		var clearButton = null;
		if (this.props.completedCount > 0) {
		      clearButton = (
		        <button
		          className="clear-completed"
		          onClick={this.props.onClear}>
		          Clear completed
		        </button>
		      );
		 }

		return (
		    	<footer className="footer">
			      <span className="todo-count">
			        <strong>{this.props.count}</strong> {this.props.count > 1 ? "items" : "item"} left
			      </span>
			      <ul className="filters">
			        <li>
			          <a
			            href="javascript:void(0)"
			            onClick={this.onFilter.bind(this, app.ALL_TODOS)}
			            className={classNames({selected: this.props.nowShowing === app.ALL_TODOS})}>
			              All
			          </a>
			        </li>
			        {' '}
			        <li>
			          <a
			            href="javascript:void(0)"
			            onClick={this.onFilter.bind(this, app.ACTIVE_TODOS)}
			            className={classNames({selected: this.props.nowShowing === app.ACTIVE_TODOS})}>
			              Active
			          </a>
			        </li>
			        {' '}
			        <li>
			          <a
			            href="javascript:void(0)"
			            onClick={this.onFilter.bind(this, app.COMPLETED_TODOS)}
			            className={classNames({selected: this.props.nowShowing === app.COMPLETED_TODOS})}>
			              Completed
			          </a>
			        </li>
			      </ul>
			      {clearButton}
		         </footer>
			)
	 }
})

//将该组件输出
module.exports = TodoFooter