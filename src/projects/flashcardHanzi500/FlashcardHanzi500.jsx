import React, {useState, useRef} from 'react';
import "../../projectStyle.css";
import "./flashcardHanzi500.css";
import TopBar from '../../topbar/TopBar';
import Sidebar from '../../sidebar/Sidebar';
import Printable from '../../printable/Printable';
import { charData } from '../../charData';
import parse from 'html-react-parser';
import { useReactToPrint } from 'react-to-print';

export default function FlashcardHanzi500() {

    const [selectLevel, setSelectLevel] = useState("1_1");
    const [selectSize, setSelectSize] = useState("small");
    const [sheetCodes, setSheetCodes] = useState("")
    //const [inputSheetTitle, setInputSheetTitle] = useState("Customized Hanzi Flashcards")

    // create flashcard sheet, handle 'create' button
    const createSheet = () => {

        var charArray;
        charArray = charData.find((d) => selectLevel === d.level)?.chars || [];

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
        <div className='flashcardHanzi500'>
            <TopBar/>
            <div className="sections">
                <div className="content">
                    <div className="introContainer">
                        <span className='projectTitle'>Hanzi 500 Flashcards</span>
                        <span className='projectDesc'>Select the desired Hazi level of your flashcard set. After that, select the size of your flashcard set. Click "CREATE" to preview the sheets, and hit "PRINT" to print them in letter size format.</span>
                    </div>
                    <div className="projectContainer">
                        <div className='left'> 
                            <div ref={componentRef} className="projectSheet">
                                <Printable
                                content =
                                    {<div id='container'>{parse(sheetCodes)}</div>}
                                sheetTitle= 
                                    {"Hanzi 500 Flashcards " + selectLevel}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div className="userInput">
                                <div className="inputItem">
                                    <span className='inputTitle'>Select Hanzi Level</span>
                                    <select className='selectedMenu' value={selectLevel} onChange={e => setSelectLevel(e.target.value)}>
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
