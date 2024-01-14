import React, {useState, useRef} from 'react';
import "../../projectStyle.css";
import "./wordSearchCustomize.css";
import { charData } from '../../charData';
import TopBar from '../../topbar/TopBar';
import Sidebar from '../../sidebar/Sidebar';
import { useReactToPrint } from 'react-to-print';
import PrintableWS from './PrintableWS';

export default function WordSearchCustomize() {

    const [inputTargets, setInputTargets] = useState(["","","","","","","","","",""]);
    const [sheetTitle, setSheetTitle] = useState("Customized Hanzi Word Search SHEET");

    const handleTargetsChange = (index, value) => {
        setInputTargets(inputTargets => {
          const newInput = [...inputTargets];
          newInput[index] = value;
          return newInput;
        })
    }

    // create printable
    const createSheet = () => {
        var allChars = charData.find((d) => d.level === "all")?.chars || [];

        // clear all cells
        for (let i = 0; i < 100; i++){
            var cell = document.getElementById(i.toString());
            if (cell) {
                cell.innerHTML = "";
            }
        }

        // determine where the targets should be placed
        var position = ["left-right", "top-down", "left-down", "right-down"];
        var countTarget = 0;

        while (countTarget < inputTargets.length) {
            // random choose orientation and start point
            var orientation = position[Math.floor(Math.random() * position.length)]
            var initialStart = Math.floor(Math.random() * 100);    
            
            // access column and row of the initial spot
            var spot = document.getElementById(initialStart.toString());
            var myColumn = spot.dataset.column;
            var myRow = spot.dataset.row;

            // return validated starting point (enough space for the word)
            var startID = validateSpaceforTarget(inputTargets[countTarget], initialStart, myRow, myColumn, orientation);

            // check if cells needed are occupied
            var occupied = checkIfCellsOccupied(inputTargets[countTarget], startID, orientation);
            console.log(occupied);
            

            // place the target word
            if (!occupied){
                placeLetter(inputTargets[countTarget], startID, orientation); 
                countTarget += 1
            }

        }

        // fill all blank boxes
        for (let i = 0; i < 100; i++){
            var box = document.getElementById(i.toString());
            if (box && box.innerHTML === "") {
                box.innerHTML = allChars[Math.floor(Math.random()*allChars.length)];
            }
        }
    }

    const validateSpaceforTarget = (target, initialStart, myRow, myColumn, orientation) => {
        var strLen = target.length;
        var newSpot;
        if (orientation === "left-right") {
            if ((myColumn*1) + strLen <= 10){
                return initialStart.toString();
            }
            else {
                var newColumn = myColumn - strLen;
                newSpot = document.querySelector('[data-row="' + myRow + '"][data-column="' + newColumn + '"]')
                return newSpot.id;
            }
        }
        else if (orientation === "top-down") {
            if ((myRow*1) + strLen <= 10){
                return initialStart.toString();
            }
            else {
                var newRow = myRow - strLen;
                newSpot = document.querySelector('[data-row="' + newRow + '"][data-column="' + myColumn + '"]');
                return newSpot.id;
            }
        }
        else if (orientation === "left-down") {
            
            if ((myRow*1) + strLen > 10) {
                myRow = (myRow*1) - strLen;
            }
            if ((myColumn*1) - strLen < -1){
                myColumn = (myColumn*1) + strLen;
            }
            newSpot = document.querySelector('[data-row="' + myRow + '"][data-column="' + myColumn + '"]');
            return  newSpot.id;
        }
        else if (orientation === "right-down") {
            
            if ((myRow*1) + strLen > 10) {
                myRow = (myRow*1) - strLen;
            }
            if ((myColumn*1) + strLen > 10){
                myColumn = (myColumn*1) - strLen;
            }
            newSpot = document.querySelector('[data-row="' + myRow + '"][data-column="' + myColumn + '"]');
            return  newSpot.id;
        }
    }

    const checkIfCellsOccupied = (target, startID, direction) => {
        var strLen = target.length;
        var currID = parseInt(startID);
        if (direction === "left-right") {
            for (let i = 0; i < strLen; i++){
                if (document.getElementById(currID.toString()).innerHTML !== ""){
                    return true;
                }
                currID += 1;
            }
        }
        else if (direction === "top-down") {
            for (let i = 0; i < strLen; i++){
                if (document.getElementById(currID.toString()).innerHTML !== ""){
                    return true;
                }
                currID += 10;
            }
        }
        else if (direction === "left-down") {
            for (let i = 0; i < strLen; i++){
                if (document.getElementById(currID.toString()).innerHTML !== ""){
                    return true;
                }
                currID += 9;
            }
        }
        else if (direction === "right-down") {
            for (let i = 0; i < strLen; i++){
                if (document.getElementById(currID.toString()).innerHTML !== ""){
                    return true;
                }
                currID += 11;
            }
        }
        return false;
    }

    const placeLetter = (target, startID, direction) => {
        var currID = parseInt(startID);
        for (let i = 0; i < target.length; i++){
            document.getElementById(currID.toString()).innerHTML = target[i];
            if (direction === "left-right"){
                currID += 1;
            }
            else if (direction === "top-down") {
                currID += 10;
            }
            else if (direction === "left-down") {
                currID += 9;
            }
            else if (direction === "right-down") {
                currID += 11;
            }
        }    
    }

    // handle print format
    const componentRef= useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
    })


    return (
        <div className='wordSearchCustomize'>
            <TopBar/>
            <div className="sections">
                <div className="content">
                    <div className="introContainer">
                        <span className='projectTitle'>Customized Hanzi Word Search Sheet</span>
                        <span className='projectDesc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At debitis ex ab blanditiis doloremque ut ullam? Aliquam necessitatibus obcaecati minima cumque ullam rerum at esse! Doloribus ullam voluptas distinctio exercitationem.</span>
                    </div>
                    <div className="projectContainer">
                        <div className="left">
                            {/* Preview printable here */}
                            <div ref={componentRef} className='projectSheet'>
                                <PrintableWS
                                    sheetTitle= {sheetTitle}
                                    targets ={inputTargets}   
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div className="userInput" id='myElement'>
                                <div className="inputItem">
                                    <span className='inputTitle'>Enter title of the sheet</span>
                                    <input className='inputBox'onChange={e=>setSheetTitle(e.target.value)}></input>
                                </div>
                                <div className='inputItem'>
                                    <span className='inputTitle'>Enter 10 target words</span>
                                    <div className="inputTargets">
                                        {inputTargets.map((value, index) => (
                                        <input className='inputChar'
                                                key ={index}
                                                type='text'
                                                onChange={(e) => handleTargetsChange(index, e.target.value)}
                                        />
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                            {/* action buttons */}
                            <div className='buttons'>
                                <button className='button' onClick={createSheet}>CREATE</button>
                                <button className='button' onClick={handlePrint}>PRINT</button>
                            </div>
                        </div>                   
                    </div>
                </div>
                <Sidebar/>
            </div>
        </div>
    )
}
