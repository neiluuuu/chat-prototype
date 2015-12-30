/** @jsx React.DOM */

var React = require("react/addons");
var Link = require('react-router').Link;

var Home = React.createClass({
    getInitialState: function() {
        return null;
    },
    componentDidMount: function() {
        var socket = io();
        $('form').submit(function(){
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('chat message', function(msg) {
            $('#messages').append(msg);
        });
    },
    render: function () {
        return (
            <div>
                <ul id="messages"></ul>
                <form action="">
                  <input id="m" autoComplete="off" /><button>Send</button>
                </form>
            </div>
        )
    }
});

module.exports = Home;