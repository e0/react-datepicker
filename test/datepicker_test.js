import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { mount } from 'enzyme'
import defer from 'lodash/defer'
import DatePicker from '../src/datepicker.jsx'
import Day from '../src/day'
import TetherComponent from '../src/tether_component.jsx'
import moment from 'moment'

describe('DatePicker', () => {
  it('should show the calendar when focusing on the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.exist
  })

  it('should show the calendar when clicking on the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.exist
  })

  it('should not set open state when it is disabled and gets clicked', function () {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker disabled/>
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.state.open).to.be.false
  })

  it('should render the calendar into a specified node', () => {
    var node = document.createElement('div')
    document.body.appendChild(node)
    var datePicker = TestUtils.renderIntoDocument(
        <DatePicker renderCalendarTo={node} />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.click(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.exist
    var calendarNode = ReactDOM.findDOMNode(datePicker.refs.calendar)
    expect(node.contains(calendarNode)).to.be.true
    document.body.removeChild(node)
  })

  it('should keep the calendar shown when blurring the date input', (done) => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    var focusSpy = sinon.spy(dateInput, 'focus')
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput))

    defer(() => {
      expect(datePicker.refs.calendar).to.exist
      assert(focusSpy.calledOnce, 'should refocus the date input')
      done()
    })
  })

  it('should not re-focus the date input when focusing the year dropdown', (done) => {
    const onBlurSpy = sinon.spy()
    const datePicker = mount(
      <DatePicker
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onBlur={onBlurSpy}/>
    )
    const dateInput = datePicker.ref('input')
    const focusSpy = sinon.spy(dateInput.get(0), 'focus')

    dateInput.simulate('focus')
    const yearSelect = datePicker.ref('calendar').find('.react-datepicker__year-select')
    dateInput.simulate('blur')
    yearSelect.simulate('focus')

    defer(() => {
      assert(focusSpy.called === false, 'should not refocus the date input')
      assert(onBlurSpy.called === false, 'should not call DatePicker onBlur')
      done()
    })
  })

  it('should keep the calendar shown when clicking the calendar', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.click(ReactDOM.findDOMNode(datePicker.refs.calendar))
    expect(datePicker.refs.calendar).to.exist
  })

  it('should hide the calendar when clicking a day on the calendar', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    var day = TestUtils.scryRenderedComponentsWithType(datePicker.refs.calendar, Day)[0]
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day))
    expect(datePicker.refs.calendar).to.not.exist
  })

  it('should hide the calendar when the pressing enter in the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: 'Enter' })
    expect(datePicker.refs.calendar).to.not.exist
  })

  it('should hide the calendar when the pressing escape in the date input', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: 'Escape' })
    expect(datePicker.refs.calendar).to.not.exist
  })

  it('should hide the calendar when tabbing from the date input', () => {
    var onBlurSpy = sinon.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker onBlur={onBlurSpy} />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(dateInput), { key: 'Tab' })
    TestUtils.Simulate.blur(ReactDOM.findDOMNode(dateInput))
    expect(datePicker.refs.calendar).to.not.exist
    assert(onBlurSpy.calledOnce, 'should call onBlur')
  })

  it('should not apply the react-datepicker-ignore-onclickoutside class to the date input when closed', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    expect(ReactDOM.findDOMNode(dateInput).className).to.not.contain('react-datepicker-ignore-onclickoutside')
  })

  it('should apply the react-datepicker-ignore-onclickoutside class to date input when open', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )
    var dateInput = datePicker.refs.input
    TestUtils.Simulate.focus(ReactDOM.findDOMNode(dateInput))
    expect(ReactDOM.findDOMNode(dateInput).className).to.contain('react-datepicker-ignore-onclickoutside')
  })

  it('should allow clearing the date when isClearable is true', () => {
    var cleared = false
    function handleChange (d) {
      if (d === null) {
        cleared = true
      }
    }
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker
          selected={moment('2015-12-15')}
          isClearable
          onChange={handleChange} />
    )
    var clearButton = TestUtils.findRenderedDOMComponentWithClass(datePicker, 'react-datepicker__close-icon')
    TestUtils.Simulate.click(clearButton)
    expect(cleared).to.be.true
  })

  it('should mount and unmount properly', done => {
    var TestComponent = React.createClass({
      displayName: 'TestComponent',

      getInitialState () {
        return { mounted: true }
      },
      render () {
        return this.state.mounted ? <DatePicker /> : null
      }
    })
    var element = TestUtils.renderIntoDocument(<TestComponent />)
    element.setState({ mounted: false }, done)
  })

  it('should render calendar inside TetherComponent when inline prop is not set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker />
    )

    expect(function () { TestUtils.findRenderedComponentWithType(datePicker, TetherComponent) }).to.not.throw()
  })

  it('should render calendar directly without TetherComponent when inline prop is set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline />
    )

    expect(function () { TestUtils.findRenderedComponentWithType(datePicker, TetherComponent) }).to.throw()
    expect(datePicker.refs.calendar).to.exist
  })

  it('should ignore disable prop when inline prop is set', () => {
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker inline disabled />
    )

    expect(datePicker.refs.calendar).to.exist
  })

  function getOnInputKeyDownStuff () {
    var m = moment()
    var copyM = moment(m)
    var testFormat = 'YYYY-MM-DD'
    var callback = sinon.spy()
    var datePicker = TestUtils.renderIntoDocument(
      <DatePicker selected={m} onChange={callback}/>
    )
    var dateInput = datePicker.refs.input
    var nodeInput = ReactDOM.findDOMNode(dateInput)
    TestUtils.Simulate.focus(nodeInput)
    return {
      m, copyM, testFormat, callback, datePicker, dateInput, nodeInput
    }
  }
 it('should autofocus the input given the autoFocus prop', () => {
    var div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(<DatePicker autoFocus />, div)
    expect(div.querySelector('input')).to.equal(document.activeElement)
  })
  it('should autofocus the input when calling the setFocus method', () => {
    var div = document.createElement('div')
    document.body.appendChild(div)
    var datePicker = ReactDOM.render(<DatePicker />, div)
    datePicker.setFocus()
    expect(div.querySelector('input')).to.equal(document.activeElement)
  })
})
