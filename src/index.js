import React from 'react'
import ReactDom from 'react-dom'
import './_main.sass'
import App from './App'
import {RecoilRoot} from 'recoil'

ReactDom.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>, 
    document.getElementById('root')
)