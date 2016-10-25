'use strict';

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _week_number = require('./week_number');

var _week_number2 = _interopRequireDefault(_week_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  Week: {
    displayName: 'Week'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'src/week.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(Component, id);
  };
}

var Week = _wrapComponent('Week')(_react3.default.createClass({
  displayName: 'Week',

  propTypes: {
    day: _react3.default.PropTypes.object.isRequired,
    endDate: _react3.default.PropTypes.object,
    excludeDates: _react3.default.PropTypes.array,
    filterDate: _react3.default.PropTypes.func,
    highlightDates: _react3.default.PropTypes.array,
    includeDates: _react3.default.PropTypes.array,
    maxDate: _react3.default.PropTypes.object,
    minDate: _react3.default.PropTypes.object,
    month: _react3.default.PropTypes.number,
    onDayClick: _react3.default.PropTypes.func,
    onDayMouseEnter: _react3.default.PropTypes.func,
    selected: _react3.default.PropTypes.object,
    selectingDate: _react3.default.PropTypes.object,
    selectsEnd: _react3.default.PropTypes.bool,
    selectsStart: _react3.default.PropTypes.bool,
    showWeekNumber: _react3.default.PropTypes.bool,
    startDate: _react3.default.PropTypes.object,
    utcOffset: _react3.default.PropTypes.number
  },

  handleDayClick: function handleDayClick(day, event) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day, event);
    }
  },
  handleDayMouseEnter: function handleDayMouseEnter(day) {
    if (this.props.onDayMouseEnter) {
      this.props.onDayMouseEnter(day);
    }
  },
  renderDays: function renderDays() {
    var _this = this;

    var startOfWeek = this.props.day.clone().startOf('week');
    var days = [];
    if (this.props.showWeekNumber) {
      days.push(_react3.default.createElement(_week_number2.default, { key: 'W', weekNumber: parseInt(startOfWeek.format('w'), 10) }));
    }
    return days.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
      var day = startOfWeek.clone().add(offset, 'days');
      return _react3.default.createElement(_day2.default, {
        key: offset,
        day: day,
        month: _this.props.month,
        onClick: _this.handleDayClick.bind(_this, day),
        onMouseEnter: _this.handleDayMouseEnter.bind(_this, day),
        minDate: _this.props.minDate,
        maxDate: _this.props.maxDate,
        excludeDates: _this.props.excludeDates,
        includeDates: _this.props.includeDates,
        highlightDates: _this.props.highlightDates,
        selectingDate: _this.props.selectingDate,
        filterDate: _this.props.filterDate,
        selected: _this.props.selected,
        selectsStart: _this.props.selectsStart,
        selectsEnd: _this.props.selectsEnd,
        startDate: _this.props.startDate,
        endDate: _this.props.endDate,
        utcOffset: _this.props.utcOffset });
    }));
  },
  render: function render() {
    return _react3.default.createElement(
      'div',
      { className: 'react-datepicker__week' },
      this.renderDays()
    );
  }
}));

module.exports = Week;
