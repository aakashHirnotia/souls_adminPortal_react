import React, { Component, useState } from "react";
// import {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateCalender extends Component {
  // const [selectedDate, setSelectedDate] = useState(null);
  state = {
    date: new Date(),
  };
  onChange = (date) => {
    console.log(date);
    // this.setState({ date });s
    this.props.onChange(date);
  };
  render() {
    return (
      <DatePicker
        selected={this.props.value || this.state.date}
        onChange={this.onChange}
        value={this.props.value || this.state.date}
        placeholderText="DD/MM/YYYY"
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableMonthYearDropdown
        minDate={new Date()}
        // maxDate="30/12/2050"
      />
    );
  }
}

export default DateCalender;
