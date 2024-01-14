import React from 'react'
import "./printable.css"

export default function Printable({content, sheetTitle}) {
    return (
      
        <div className='previewBox'>
          <thead>
              <span className='sheetTitle'>{sheetTitle}</span>
          </thead>
          {content}
        </div>
      
    )
  }
