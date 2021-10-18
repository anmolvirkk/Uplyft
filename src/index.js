import React from 'react'
import ReactDom from 'react-dom'
import './_main.sass'
import Dashboard from './pages/Dashboard/index'

ReactDom.render(
    <Dashboard />, 
    document.getElementById('root')
)