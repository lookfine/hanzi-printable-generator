import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BingoCustomize from './projects/bingoCustomize/BingoCustomize';
import BingoHanzi500 from './projects/bingoHanzi500/BingoHanzi500';
import FlashcardCustomize from './projects/flashcardCustomize/FlashcardCustomize';
import FlashcardHanzi500 from './projects/flashcardHanzi500/FlashcardHanzi500';
import WordSearchCustomize from './projects/wordSearchCustomize/WordSearchCustomize';
import CustomizePage from './customizePage/CustomizePage';
import Hanzi500Page from './hanzi500Page/Hanzi500Page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "1",
    element: <BingoCustomize/>,
  },
  {
    path: "2",
    element: <BingoHanzi500/>,
  },
  {
    path: "3",
    element: <FlashcardCustomize/>,
  },
  {
    path: "4",
    element: <FlashcardHanzi500/>,
  },
  {
    path: "5",
    element: <WordSearchCustomize/>,
  },
  {
    path: "customize",
    element: <CustomizePage/>,
  },
  {
    path: "hanzi500",
    element: <Hanzi500Page/>,
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
