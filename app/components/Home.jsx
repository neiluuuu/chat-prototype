/** @jsx React.DOM */

var React = require("react/addons");
var Link = require('react-router').Link;

var Chat = React.createClass({
    render: function () {
        var messages = this.props.msg;
        var elems = []
        for (i in messages) {
            obj = messages[i];
            elems.push(<li key={i}><span style={{color: obj.color}}>{obj.username}</span>: {obj.msg}</li>)
        }
        return (
            <ul className="col-xs-12" id="messages">
                {elems}
            </ul>
        );
    }
})

var Home = React.createClass({
    getInitialState: function() {
        return {messages: [], socket: 0, curr: ''};
    },
    componentDidMount: function() {
        var component = this;
        var navHeight = $("nav.navbar.navbar-inverse").outerHeight();
        var windowSize = $(window).height();
        $(".view-container").css("height", windowSize-navHeight);
        this.setState({socket: io()});
        component.state.socket.on('chat message', function(obj) {
            var msg = component.state.messages;
            msg.push({color: obj.color, username: obj.username, msg: obj.msg});
            component.setState({messages: msg});
        });
        $(window).resize(function() {
            var navHeight = $("nav.navbar.navbar-inverse").outerHeight();
            var windowSize = $(window).height();
            $(".view-container").css("height", windowSize-navHeight);
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.state.socket.emit('chat message', this.state.curr);
        this.setState({curr: ''});
    },
    handleMsgChange: function(e) {
        this.setState({curr: e.target.value});
    },
    render: function () {
        return (
            <div className="container view-container">
                <div className="row">
                    <Chat msg={this.state.messages}/>
                </div>
                <div className="row chat-container">
                <form id="chat-form" className="input-group" onSubmit={this.handleSubmit}>
                  <input type="text" className="form-control" id="m" autoComplete="off" value={this.state.curr} onChange={this.handleMsgChange}/><span className="input-group-btn"><button className="btn btn-primary">Send</button></span>
                </form>
                </div>
            </div>
        );
    }
});

module.exports = Home;