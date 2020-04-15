import React, { Component, useState } from "react";
// import {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DateCalender extends Component {
  // const [selectedDate, setSelectedDate] = useState(null);
  state = {
    date: new Date(),
  }

  onChange= ( date ) => {
    this.setState({ date })
    this.props.onChange(date);  
  }
  render() {
    return (
      <DatePicker
        // selected={this.state.date}
        // onChange={date => setSelectedDate(date)}
        onChange={this.onChange}
        value={this.state.date}
        placeholderText="dd/MM/yyyy"
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableMonthYearDropdown
        maxDate={new Date()}
      />
    );
  }

}

export default DateCalender;
