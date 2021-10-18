import React from 'react'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'

const Home = ({allRoutes, setAllRoutes}) => (
    <React.Fragment>
        <div style={{display: 'flex'}}>
            <SideBar allRoutes={allRoutes} setAllRoutes={setAllRoutes} />
            <div style={{width: '100%'}}>
                <Header />
                <h1>home</h1>
            </div>
        </div>
    </React.Fragment>
)

export default Home