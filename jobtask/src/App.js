import { useEffect, useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { Router } from './Router/Router';


function App() {

  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(()=>{
  //     setLoading(false);

  //   }, 8000)PP
  // },[])


  if(loading){
    return <div className="flex flex-col h-screen w-screen items-center justify-center"><HashLoader  color="#005be6" /> <h1 className='text-3xl font-bold'>welcome </h1></div>
  }
  return (
    <div className='w-screen mx-auto bg-gray-50'>
    <RouterProvider router={Router}></RouterProvider>
    <Toaster />

    </div>
  );
}

export default App;