import React, {useState, useRef}   from 'react';
import "../../projectStyle.css"
import "./bingoCustomize.css";
import TopBar from '../../topbar/TopBar'
import Sidebar from '../../sidebar/Sidebar'
import Printable from '../../printable/Printable'
import parse from 'html-react-parser';
import { useReactToPrint } from 'react-to-print';



export default function BingoCustomize() {

  const [selectNum, setSelectNum] = useState("2");
  const [inputChars, setInputChars] = useState(["","","","","","","","","","","","","","","","","","","","","","","","",""])
  const [sheetCodes, setSheetCodes] = useState("")
  const [inputSheetTitle, setInputSheetTitle] = useState("Customized 5*5 Hanzi BINGO SHEET")

  const handleCharsChange = (index, value) => {
    setInputChars(inputChars => {
      const newInput = [...inputChars];
      newInput[index] = value;
      return newInput;
    })
  }

  const createSheet = () => {
    var charArray = inputChars;
    var numOfCard = selectNum;

    const arraysShuffled = shuffleArray(numOfCard, charArray);
    console.log(arraysShuffled);
    setSheetCodes(createCodesString(numOfCard, arraysShuffled));
    
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
    var codesString = "";
    var i = 1;

    while (i <= numOfCard) {
      var cardString = "";
      if (i === 1) {
        cardString += '<div class="card" id="card_' + i.toString() + '">';
      }
      else {
        cardString += '<div class="card pagebreak" id="card_' + i.toString() + '">';
      }
      cardString += '<table>';

      for (let j = 1; j <= 25; j++) {
        // each tr contains 5 td
        if ( j%5 === 1) {
          cardString += '<tr>';
        }
        cardString += '<td className="individual" id="' + i.toString() + '_' + j.toString() + '">'

        // insert the char
        cardString += arraysShuffled[i-1][j-1];
        //cardString += InsertChar(picked);
        cardString += '</td>';
        if ( j%5 === 0) {
          cardString += '</tr>';
        }
      };
      cardString += '</table>';
      // append cardCodes to gridCodes
      codesString += cardString;
      i += 1
    }
    console.log(codesString);
    return codesString;
  }

  // handle print format
  const componentRef= useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      copyStyles: true,
  })

  return (
    <div className='bingoCustomize'>
      <TopBar/>
      <div className="sections">
        <div className="content">
          <div className="introContainer">
            <span className='projectTitle'>Customized 5*5 Hanzi Bingo Sheet</span>
            <span className='projectDesc'>Start by indicating the name and the number of sheets you'd like for your bingo game. After that, input 25 Chinese characters into the provided boxes. Click "CREATE" to preview the sheets, and hit "PRINT" to print them in letter size format.</span>
          </div>
          <div className="projectContainer">
            <div className="left">
              {/* Preview printable here */}
              <div ref={componentRef} className='projectSheet'>
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

                <div className='inputItem'>
                  <span className='inputTitle'>Enter 25 Chinese characters or words</span>
                  <div className="inputChars">
                    {inputChars.map((value, index) => (
                      <input className='inputChar'
                        key ={index}
                        type='text'
                        onChange={(e) => handleCharsChange(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* action buttons */}
              <div className='buttons'>
                <button className='button' onClick={() => createSheet()}>CREATE</button>
                <button className='button'onClick={handlePrint}>PRINT</button>
              </div>
            </div>
          </div>
        </div>
        <Sidebar/>
      </div>
    </div>
  )
}
