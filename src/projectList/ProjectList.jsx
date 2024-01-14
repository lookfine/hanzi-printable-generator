import "./projectList.css";
import {ProjectData} from "../projectData";
import React from 'react';


export default function projectList({selectedCat}) {

  return (
    <>
    <div className="projectList">
      <h1 className="leadTitle">{selectedCat}</h1>
      <div className="projects">
        { 
          ProjectData.map((d) => {
            if (selectedCat === d.catogory || selectedCat === d.model) {
              return <div className="project">
              <img className="projectImage" src={d.image} alt=""/>  
              <div className="projectInfo">
                <div className="projectCats">
                  <span className="projectCat">{d.model}</span>
                  <span className="projectCat">{d.catogory}</span>
                </div>
                <span className="projectTitle"><a href={d.id}>{d.title}</a></span>
                <hr/>
              </div>
            </div>
            }
            if (selectedCat === "FEATURE") {
              return <div className="project">
              <img className="projectImage" src={d.image} alt=""/>  
              <div className="projectInfo">
                <div className="projectCats">
                  <span className="projectCat">{d.model}</span>
                  <span className="projectCat">{d.catogory}</span>
                </div>
                <span className="projectTitle"><a href={d.id}>{d.title}</a></span>
                <hr/>
              </div>
            </div>
            }
            return null
          })
        }

        
      </div>
    </div>
    </>

  )
}
