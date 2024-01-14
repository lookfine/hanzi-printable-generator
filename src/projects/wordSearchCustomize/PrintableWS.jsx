import React from 'react';
import "../../printable/printable.css";
import "./printableWS.css";

export default function PrintableWS({sheetTitle, targets}) {

    // generate plain grid
    // id -> id; i -> row; j-> col
    const gridInfo = [];
    var id = 0;
    for (var i=0; i<10; i++) {
        for (var j=0; j<10; j++) {
            var tem = [];
            tem.push(id);
            tem.push(i);
            tem.push(j);
            id += 1;
            gridInfo.push(tem);
        }
    }

    // array to store each row [[0-9][10-19]...]
    const rows = [];
    gridInfo.forEach((d, index) => {
        const rowIndex = Math.floor(index / 10);
        if (!rows[rowIndex]) {
            rows[rowIndex] = [];
        };
        rows[rowIndex].push(
            <td id={d[0]} data-row={d[1]} data-column={d[2]} className='individual'></td>
        );
    })
    const rowsArray = rows.map((row, index) => (
        <tr key={index} className="row">{row}</tr>
    ));

    




    return (
        <div className="previewBox">
          
            <thead>
                <span className='sheetTitle'>{sheetTitle}</span>
            </thead>
                <table className="grid">
                    {rowsArray}
                </table>
                <div className='targetContainer'>
                    {targets.map((d) => (
                        <div className='targetItem'>{d}</div>
                    ))}
                </div>
            
          
        </div>
      )
}
