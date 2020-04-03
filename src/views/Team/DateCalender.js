import React, { useState} from 'react';
// import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DateCalender(){
    
    const [selectedDate, setSelectedDate] = useState(null)

    return (
        <DatePicker
            selected={selectedDate}
            onChange={date=> setSelectedDate(date)}
            placeholderText='dd/MM/yyyy'
            dateFormat='dd/MM/yyyy'
            showYearDropdown
            scrollableMonthYearDropdown
        />
    )

}

export default DateCalender;