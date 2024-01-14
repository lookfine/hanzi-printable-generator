import React, {useState, useRef} from 'react'
import "./flashcardCustomize.css"
import "../../projectStyle.css";
import Topbar from '../../topbar/TopBar';
import Sidebar from '../../sidebar/Sidebar';
import Printable from '../../printable/Printable';
import parse from 'html-react-parser';
import { useReactToPrint } from 'react-to-print';

export default function FlashcardCustomize() {

    const [inputChars, setInputChars] = useState(["","","","","","","","","","","","","","","","","","","",""])
    const [selectSize, setSelectSize] = useState("small")
    const [sheetCodes, setSheetCodes] = useState("")
    const [inputSheetTitle, setInputSheetTitle] = useState("Customized Hanzi Flashcards")

    const handleCharsChange = (index, value) => {
        setInputChars(inputChars => {
          const newInput = [...inputChars];
          newInput[index] = value;
          return newInput;
        })
    }

    const createSheet = () => {
        var charArray = inputChars;
        var codeString = "<div classname='sheetContent'>";
        for (let i = 0; i < charArray.length; i++) {
            var cardString = "";
            cardString += "<div className='" + selectSize + "_box'>"
            cardString += "<span className='" + selectSize + "_text'>" + charArray[i] + "</span>";
            cardString += "</div>";
            codeString += cardString;
        }
        codeString += '</div>';
        setSheetCodes(codeString);
    }

    // handle print format
    const componentRef= useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
    });

    return (
        <div className='flashcardCustomize'>
            <Topbar/>
            <div className="sections">
                <div className="content">
                    <div className="introContainer">
                        <span className='projectTitle'>Customize Flashcards</span>
                        <span className='projectDesc'>Input title of your flashcard set and no more then 20 Chinese characters into the provided boxes. After that, select the size of your flashcards. Click "CREATE" to preview the sheets, and hit "PRINT" to print them in letter size format.</span>
                    </div>
                    <div className="projectContainer">
                        <div className="left">
                            <div ref={componentRef} className="projectSheet">
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
                                    <span className='inputTitle'>Enter Title of Your Flashcard Set</span>
                                    <input 
                                        className='inputBox'
                                        onChange={e=>setInputSheetTitle(e.target.value)}
                                    />
                                </div>
                                <div className="inputItem">
                                    <span className='inputTitle'>Enter 20 Chinese characters</span>
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
                                <div className="inputItem">
                                    <span className='inputTitle'>Select Flashcard Size</span>
                                    <select className='selectedMenu' value={selectSize} onChange={e => setSelectSize(e.target.value)}>
                                        <option value="small">Small - 200px * 200px</option>
                                        <option value="medium">Medium - 300px * 300px</option>
                                    </select>
                                </div>
                            </div>
                            <div className="buttons">
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
