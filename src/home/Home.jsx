import React from 'react';
import "./home.css";
import TopBar from '../topbar/TopBar';
import ProjectList from '../projectList/ProjectList';
import Sidebar from '../sidebar/Sidebar';

export default function Home() {
    return (
        <div className='home'>
            <TopBar/>
            <div className="page">
                <ProjectList
                selectedCat={"FEATURE"}
                />
                <Sidebar/>
            </div>
        </div>
    )
}
