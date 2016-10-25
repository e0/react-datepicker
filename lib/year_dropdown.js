'use strict';

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _year_dropdown_options = require('./year_dropdown_options');

var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  YearDropdown: {
    displayName: 'YearDropdown'
  }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
  filename: 'src/year_dropdown.jsx',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformHmr2(Component, id);
  };
}

var YearDropdown = _wrapComponent('YearDropdown')(_react3.default.createClass({
  displayName: 'YearDropdown',

  propTypes: {
    dropdownMode: _react3.default.PropTypes.oneOf(['scroll', 'select']).isRequired,
    maxDate: _react3.default.PropTypes.object,
    minDate: _react3.default.PropTypes.object,
    onChange: _react3.default.PropTypes.func.isRequired,
    scrollableYearDropdown: _react3.default.PropTypes.bool,
    year: _react3.default.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      dropdownVisible: false
    };
  },
  renderSelectOptions: function renderSelectOptions() {
    var minYear = this.props.minDate ? this.props.minDate.year() : 1900;
    var maxYear = this.props.maxDate ? this.props.maxDate.year() : 2100;

    var options = [];
    for (var i = minYear; i <= maxYear; i++) {
      options.push(_react3.default.createElement(
        'option',
        { key: i, value: i },
        i
      ));
    }
    return options;
  },
  onSelectChange: function onSelectChange(e) {
    this.onChange(e.target.value);
  },
  renderSelectMode: function renderSelectMode() {
    return _react3.default.createElement(
      'select',
      {
        value: this.props.year,
        className: 'react-datepicker__year-select',
        onChange: this.onSelectChange },
      this.renderSelectOptions()
    );
  },
  renderReadView: function renderReadView() {
    return _react3.default.createElement(
      'div',
      { className: 'react-datepicker__year-read-view', onClick: this.toggleDropdown },
      _react3.default.createElement(
        'span',
        { className: 'react-datepicker__year-read-view--selected-year' },
        this.props.year
      ),
      _react3.default.createElement('span', { className: 'react-datepicker__year-read-view--down-arrow' })
    );
  },
  renderDropdown: function renderDropdown() {
    return _react3.default.createElement(_year_dropdown_options2.default, {
      ref: 'options',
      year: this.props.year,
      onChange: this.onChange,
      onCancel: this.toggleDropdown,
      scrollableYearDropdown: this.props.scrollableYearDropdown });
  },
  renderScrollMode: function renderScrollMode() {
    return this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView();
  },
  onChange: function onChange(year) {
    this.toggleDropdown();
    if (year === this.props.year) return;
    this.props.onChange(year);
  },
  toggleDropdown: function toggleDropdown() {
    this.setState({
      dropdownVisible: !this.state.dropdownVisible
    });
  },
  render: function render() {
    var renderedDropdown = void 0;
    switch (this.props.dropdownMode) {
      case 'scroll':
        renderedDropdown = this.renderScrollMode();
        break;
      case 'select':
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return _react3.default.createElement(
      'div',
      {
        className: 'react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--' + this.props.dropdownMode },
      renderedDropdown
    );
  }
}));

module.exports = YearDropdown;
