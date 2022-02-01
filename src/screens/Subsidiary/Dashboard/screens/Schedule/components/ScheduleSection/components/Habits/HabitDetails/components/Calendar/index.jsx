import React from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { useRecoilState } from 'recoil'
import './_main.sass'
import { habitsAtom } from '../../../../../../../../../allAtoms'

const Calendar = ({color, index}) => {

    let calendarStyle = {'--selectedDay': color}

    const [habits] = useRecoilState(habitsAtom)

    let getSelectedDays = () => {
        let days = []
        habits[index].datesCompleted.forEach((item)=>{
            days.push(new Date(item.val))
        })
        return days
    }

    return (
        <div className='streakCalendarWrapper' style={calendarStyle}>
            <DayPicker
                selectedDays={getSelectedDays()}
            />
        </div>
    )
}

export default Calendar
