import React, { useState, useRef } from 'react'
import "./bingoHanzi500.css"
import "../../projectStyle.css";
import TopBar from '../../topbar/TopBar';
import Sidebar from '../../sidebar/Sidebar';
import Printable from '../../printable/Printable';
import parse from 'html-react-parser';
import { useReactToPrint } from 'react-to-print';
import { charData } from '../../charData'




export default function BingoHanzi500() {
    
    const [selectNum, setSelectNum] = useState("2");
    const [selectLevel, setSelectLevel] = useState("1_1");
    const [sheetCodes, setSheetCodes] = useState("")
    const [inputSheetTitle, setInputSheetTitle] = useState("Customized 5*5 Hanzi BINGO SHEET")

    // create bingo sheet
    const createSheet = () => {
        var numOfCard = selectNum;
        var charArray;
        charArray = charData.find((d) => selectLevel === d.level)?.chars || [];

        /* random kick out 4 chars */
        const randomIndexes = getRandomIndexes(20, 16);
        const chosenCharArray = [];
        for (let i = 0; i < 16; i++){
            chosenCharArray.push(charArray[randomIndexes[i]]);
        }
        
        const arraysShuffled = shuffleArray(numOfCard, chosenCharArray);
        setSheetCodes(createCodesString(numOfCard, arraysShuffled));
        
    }

    const getRandomIndexes = (arrayLength, count) => {
        const indexes = [];
        while (count > 0) {
            const randomIndex = Math.floor(Math.random() * arrayLength);
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex)
                count -= 1;
            }
        }
        return indexes;
    }

    const shuffleArray = (numOfCard, charArray) => {
        var arraysShuffled = [];
        while ( numOfCard > 0 ) {
          var newArray = [...charArray];
          for (let i = charArray.length - 1; i>0; i-- ){
            const j = Math.floor(Math.random() * (i+1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
          }
          arraysShuffled.push(newArray);
          numOfCard -= 1;
        }
        return arraysShuffled;
    }

    const createCodesString = (numOfCard, arraysShuffled) => {
        var codesString = "<div>";
        var i = 1;

        while (i <= numOfCard) {
        var cardString = "";

        // add 'pagebreak' class to make each page contains only 2 cards
        if (i === 1){
            cardString += '<div class="card" id="card_' + i.toString() + '">';
        }
        else{
            cardString += '<div class="card pagebreak" id="card_' + i.toString() + '">';
        }

        cardString += '<table>';
        for (let j = 1; j <= 16; j++) {
            // each tr contains 5 td
            if ( j%4 === 1) {
            cardString += '<tr>';
            }
            cardString += '<td id="' + i.toString() + '_' + j.toString() + '">'

            // insert the char
            cardString += arraysShuffled[i-1][j-1];
            //cardString += InsertChar(picked);
            cardString += '</td>';
            if ( j%4 === 0) {
            cardString += '</tr>';
            }
        };
        cardString += '</table>';
        cardString += '</div>';
        // append cardCodes to gridCodes
        codesString += cardString;
        i += 1
        }
        return codesString;

    }

    // handle print format
    const componentRef= useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      copyStyles: true,
    })
  
    return (
        <div className='bingoHanzi500'>BingoHanzi500
            <TopBar/>
            <div className="sections">
                <div className="content">
                    <div className="introContainer">
                        <span className='projectTitle'>Hanzi500 4*4 BINGO SHEET</span>
                        <span className='projectDesc'>Start by indicating the number of sheets you'd like for your bingo game. After that, choose the character level of your game. Click "CREATE" to preview the sheets, and hit "PRINT" to print them in letter size format.</span>
                        <span className='projectDesc'>Hanzi 500: a collection of 500 Chinese characters specifically curated for novice Chinese learners, selected from "Sagebooks Basic Chinese 500."</span>
                    </div>
                    <div className="projectContainer">
                        <div className="left">
                            {/* Preview printable here */}
                            <div ref={componentRef}  className='projectSheet'>
                                <Printable
                                content =
                                    {<div id='container'>{parse(sheetCodes)}</div>}
                                sheetTitle= 
                                    {inputSheetTitle}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div className="userInput">
                                <div className="inputItem">
                                    <span className='inputTitle'>Enter Title of Your Bingo Game</span>
                                    <input 
                                        className='inputBox'
                                        onChange={e=>setInputSheetTitle(e.target.value)}
                                    />
                                </div>
                                {/* select number of bingo cards user needs */}
                                <div className="inputItem">
                                    <span className='inputTitle'>Select Number of Cards</span>
                                    <select className='selectedMenu' value={selectNum} onChange={e=>setSelectNum(e.target.value)}>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </select>
                                </div>
                                <div className="inputItem">
                                    <span className='inputTitle'>Select Hanzi Level</span>
                                    <select className='selectedMenu' value={selectLevel} onChange={e=>setSelectLevel(e.target.value)}>
                                        <option value="1_1">啟蒙LV1_1</option>
                                        <option value="1_2">啟蒙LV1_2</option>
                                        <option value="1_3">啟蒙LV1_3</option>
                                        <option value="1_4">啟蒙LV1_4</option>
                                        <option value="1_5">啟蒙LV1_5</option>
                                        <option value="2_1">萌芽LV2_1</option>
                                        <option value="2_2">萌芽LV2_2</option>
                                        <option value="2_3">萌芽LV2_3</option>
                                        <option value="2_4">萌芽LV2_4</option>
                                        <option value="2_5">萌芽LV2_5</option>
                                        <option value="3_1">躍進LV3_1</option>
                                        <option value="3_2">躍進LV3_2</option>
                                        <option value="3_3">躍進LV3_3</option>
                                        <option value="3_4">躍進LV3_4</option>
                                        <option value="3_5">躍進LV3_5</option>
                                        <option value="4_1">信心LV4_1</option>
                                        <option value="4_2">信心LV4_2</option>
                                        <option value="4_3">信心LV4_3</option>
                                        <option value="4_4">信心LV4_4</option>
                                        <option value="4_5">信心LV4_5</option>
                                        <option value="5_1">實力LV2_1</option>
                                        <option value="5_2">實力LV2_2</option>
                                        <option value="5_3">實力LV2_3</option>
                                        <option value="5_4">實力LV2_4</option>
                                        <option value="5_5">實力LV2_5</option> 
                                    </select>
                                </div>
                            </div>
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
