import './App.css';
import Form from './Form';
import Info from './Info';
import {
  createBrowserRouter, RouterProvider,

} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Form />,
    },
    {
      path: "info",
      element: <Info />,
    },
  ]);
  return (
    <div className="App mx-auto max-w-[900px] pt-[50px] px-[5px]">


      <RouterProvider router={router} />

    </div>
  );
}

export default App;
