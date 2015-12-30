/** @jsx React.DOM */

var React = require("react/addons");
var Link = require('react-router').Link;

var About = React.createClass({
    render: function () {
        return (
            <div className="container">
                <p className="text-center">
                    By Neil Argade
                </p>
            </div>
        )
    }
});

module.exports = About;