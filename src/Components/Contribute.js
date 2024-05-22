import React, { useState } from "react";
import pepe from "../Images/pepe.png";
import { FiUpload } from "react-icons/fi";
import { Textarea, Button } from "@chakra-ui/react";
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import { createClient } from "@supabase/supabase-js";
import { BrowserView, MobileView } from "react-device-detect";

export const Contribute = (props) => {
  const [desc, setDesc] = useState();
  const [url,setUrl] = useState();
  const [fileName,setFileName] = useState("Click to Upload Image")
  const handleUpload = (result) => {
    setUrl(result.info.url);
    setFileName(result.info.original_filename)
  };

  const handleContribute = async () => {
    const supabase = createClient(process.env.REACT_APP_SUPAURL, process.env.REACT_APP_SUPAKEY);
    const{data,error} = await supabase.from(`clowns`).select('contributions').eq('roll',props.roll);
    const updatedContributions = [...data[0].contributions, { "type": 'image', "content": url, "description": desc }];
    const {updateError} = await supabase.from('clowns').update({contributions: updatedContributions}).eq('clown_id',props.clown_id);
  }
  return (
    <div className="flex justify-center">
  <BrowserView>
    <WidgetLoader />
    <div className="flex underline text-red-100 font-Carnivalee text-4xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 py-2 pb-2 opacity-80">
      Contribute Content
      <img src={pepe} height={70} width={70} alt="pepe" />
    </div>


    <div className="w-full justify-center">
    <div className="w-auto items-center">
      Do you want to expose the cringeness of this clown? Submit screenshots of any cringe post with our Anonymous content submission section while keeping your identity safe.
      <div className="flex items-center justify-center flex-col bg-[#A60000] bg-opacity-60 border-dashed border-4 border-[#D36906] opacity-70 py-10 px-36 mt-5">
        <Widget
          sources={['local']}
          resourceType={'image'}
          cloudName={process.env.REACT_APP_CLOUDNAME}
          uploadPreset={process.env.REACT_APP_UPLOADPRESET} 
          logging={false}
          onSuccess={handleUpload}
          buttonText={<FiUpload/>}
          style={{
            color: 'white',
            border: 'none',
            width: '120px',
            backgroundColor: 'transparent',
            borderRadius: '4px',
            height: '100px',
            fontSize: '100px'
          }} 
        />
        <p className="text-2xl w-24">{fileName}</p>
      </div>
      <div className="flex w-full flex-col bg-[#A60000] bg-opacity-60 border-dashed border-4 border-[#D36906] justify-center items-start opacity-70 mt-2">
        <Textarea
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent border-0 w-full h-48 text-3xl p-3"
          placeholder="Describe the Content"
        />
      </div>
      <div className="flex justify-center">
        <Button onClick={handleContribute} className="w-96 border-dashed border-4 border-[#A60000] bg-[#D36906] text-2xl py-5 mt-3">
          Contribute Now!
        </Button>
      </div>
    </div>
    </div>

    </BrowserView>
    <MobileView>
    <WidgetLoader />
    <div className="-ml-10 flex underline text-nowrap text-red-100 font-Carnivalee text-4xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 py-2 pb-2 opacity-80">
      Contribute Content
      <img src={pepe} height={70} width={70} alt="pepe" />
    </div>
  
    <div className="w-96 items-start -mx-24">
      Do you want to expose the cringeness of this clown? Submit screenshots of any cringe post with our Anonymous content submission section while keeping your identity safe.
      <div className="flex justify-center flex-col bg-[#A60000] bg-opacity-60 border-dashed border-4 border-[#D36906] items-start opacity-70 py-10 px-36 mt-5">
        <Widget
          sources={['local']}
          resourceType={'image'}
          cloudName={'dvjmvb3od'}
          uploadPreset={'bf75vt0y'} 
          logging={false}
          onSuccess={handleUpload}
          buttonText={<FiUpload/>}
          style={{
            color: 'white',
            border: 'none',
            width: '120px',
            backgroundColor: 'transparent',
            borderRadius: '4px',
            height: '100px',
            fontSize: '100px'
          }} 
        />
        <p className="text-2xl w-24 text-nowrap -ml-14">{fileName}</p>
      </div>
      <div className="flex w-full flex-col bg-[#A60000] bg-opacity-60 border-dashed border-4 border-[#D36906] justify-center items-start opacity-70 mt-2">
        <Textarea
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent border-0 w-full h-48 text-3xl p-3"
          placeholder="Describe the Content"
        />
      </div>
      <div>
        <Button onClick={()=>handleContribute()} className="w-96 border-dashed border-4 border-[#A60000] bg-[#D36906] text-2xl py-5 mt-3">
          Contribute Now!
        </Button>
      </div>
    </div>
    </MobileView>
  </div>
  );
};
