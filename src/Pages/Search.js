import {React,useState} from 'react'
import logo from "../Images/logo.png";
import glb from "../Images/glb.png";
import { RxCross1 } from "react-icons/rx";
import pepe from "../Images/pepe.png";
import { createClient } from '@supabase/supabase-js'
import border from "../Images/border.png";
import { useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from "react-device-detect";

export const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [clownData,setClownData] = useState({})
    const navigate = useNavigate();
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    function capitalizeInitials(str) {
      return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  
    const searchClown = async (searchString) => {
      const supabase = createClient(process.env.REACT_APP_SUPAURL, process.env.REACT_APP_SUPAKEY);
      const { data, error } = await supabase
      .from('clowns')
      .select()
      .eq('name', capitalizeInitials(searchString));
      setClownData(data);
    }
  
    return (
        <div className="justify-center text-center">
          <BrowserView>
          <div onClick={()=>navigate("/")}  className="flex flex-row justify-center pt-10">
            <div>
              <img src={logo} alt="logo" />
            </div>
            <p className="px-20 py-28 text-white font-extralight text-7xl">
              <RxCross1 />
            </p>
            <div className="py-10">
              <img src={glb} height={300} width={300} alt="glb" />
            </div>
          </div>
          <div className='flex justify-center my-5 pb-10 pt-10 flex-col'>
          <div className="flex justify-center underline pb-14 text-red-100 font-Carnivalee text-7xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 opacity-80">
        Search Clowns
        <img src={pepe} height={70} width={100} alt="pepe" />
      </div>
      <div className='flex flex-row justify-center'>
      <input
        type="text"
        value={inputValue}
        placeholder='Enter the name of your college clowns'
        onChange={handleInputChange}
        className="bg-yellow-500 py-3 px-6 text-4xl rounded-tl-xl rounded-br-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg glow w-1/2 font-Carnivalee bg-opacity-50 text-white"       />
         <button onClick={()=>searchClown(inputValue)}  className="rounded-tl-xl rounded-br-xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-4xl font-Carnivalee mx-5">
          Search Now
        </button>
        
       
      </div>
      {clownData!=="undefined"  ? (Object.values(clownData)).map((clown,index)=><div className='w-full justify-center mt-10'><div onClick={()=>navigate("/profile?id="+clown.profile_id)} className="flex m-auto w-96 flex-col">
          <div className="relative">
            <img
              src={border}
              alt="border"
              height={500}
              width={400}
              className="relative rounded-2xl"
            />
            <img
              src={clown.clown_pic}
              height={600}
              width={350}
              className="absolute rounded-lg top-10 left-4"
              alt="pic"
            />
          </div>
          <div className="flex flex-col mt-auto font-Carnivalee">
            <p className=" m-2 py-2 px-5 rounded-2xl bg-red-500 text-white text-4xl bg-opacity-50">
              {clown.name}
            </p>
            <div className="flex flex-row justify-center">
              <p className="text-white text-4xl py-5">{Math.floor(clown.rating)}/5 </p>
              <img src={pepe} alt="pepe" />
            </div>
          </div>
        </div></div>):<></>}
    </div>
          </BrowserView>
          <MobileView>
          <div  onClick={()=>navigate("/")}  className="flex flex-row justify-center pt-10">
          <div>
            <img src={logo} height={1500} width={1500} alt="logo" />
          </div>
          <p className="px-2 py-20 text-white font-extralight text-7xl">
            <RxCross1 />
          </p>
          <div className="py-10">
            <img src={glb} height={1500} width={1500} alt="glb" />
          </div>
        </div>
        <div className='flex justify-center my-5 pb-10 pt-10 flex-col'>
          <div className="flex justify-center underline pb-14 text-red-100 font-Carnivalee text-6xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 opacity-80">
        Search Clowns
        <img src={pepe} height={70} width={100} alt="pepe" />
      </div>
      <div className='flex flex-col justify-center mx-auto'>
      <input
        type="text"
        value={inputValue}
        placeholder='Enter the name of your college clowns'
        onChange={handleInputChange}
        className="bg-yellow-500 py-3 px-6 text-2xl rounded-tl-xl rounded-br-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg glow w-96 font-Carnivalee bg-opacity-50 text-white"       />
         <button onClick={()=>searchClown(inputValue)}  className=" w-40 mt-5 rounded-tl-xl rounded-br-xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-2xl font-Carnivalee mx-5">
          Search Now
        </button>
        
       
      </div>
      <div className='flex flex-col gap-10'>
      {clownData!=="undefined"  ? (Object.values(clownData)).map((clown,index)=><div className='w-full justify-center mt-10'><div onClick={()=>navigate("/profile?id="+clown.profile_id)} className="flex m-auto w-96 flex-col">
          <div className="relative">
            <img
              src={border}
              alt="border"
              height={500}
              width={400}
              className="relative rounded-2xl"
            />
            <img
              src={clown.clown_pic}
              height={600}
              width={350}
              className="absolute rounded-lg top-10 left-4"
              alt="pic"
            />
          </div>
          <div className="flex flex-col mt-auto font-Carnivalee">
            <p className=" m-2 py-2 px-5 rounded-2xl bg-red-500 text-white text-4xl bg-opacity-50">
              {clown.name}
            </p>
            <div className="flex flex-row justify-center">
              <p className="text-white text-4xl py-5">{Math.floor(clown.rating)}/5 </p>
              <img src={pepe} alt="pepe" />
            </div>
          </div>
        </div></div>):<></>}
      </div>
    </div>
          </MobileView>
    
          
</div>
      );
  
}
