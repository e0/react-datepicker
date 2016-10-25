'use strict';

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  WeekNumber: {
    displayName: 'WeekNumber'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'src/week_number.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(Component, id);
  };
}

var WeekNumber = _wrapComponent('WeekNumber')(_react3.default.createClass({
  displayName: 'WeekNumber',

  propTypes: {
    weekNumber: _react3.default.PropTypes.number.isRequired
  },

  render: function render() {
    return _react3.default.createElement(
      'div',
      {
        className: 'react-datepicker__week-number',
        'aria-label': 'week-' + this.props.weekNumber },
      this.props.weekNumber
    );
  }
}));

module.exports = WeekNumber;
