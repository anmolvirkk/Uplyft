import React from 'react'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'

const Home = () => {

    return (
        <React.Fragment>
            <div style={{display: 'flex'}}>
                <SideBar />
                <div style={{width: '100%'}}>
                    <Header />
                    <h1>home</h1>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home