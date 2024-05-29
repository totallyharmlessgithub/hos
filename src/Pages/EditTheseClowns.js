import { useState } from "react";
import React from "react";
import { createClient } from "@supabase/supabase-js";
export const EditMoreClowns = () => {
  const [message,setMessage] = useState();
  const [id, setId] = useState(0);
  const [created_at, setCreatedAt] = useState("");
  const [name, setName] = useState("");
  const [clown_pic, setClownPic] = useState("");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [about, setAbout] = useState("");
  const [clown_id, setClownId] = useState("");
  const [rating, setRating] = useState(0);
  const [linkedIn, setLinkedIn] = useState("");
  const [tiktok, setTikTok] = useState("");
  const [youtube, setYouTube] = useState("");
  const [github, setGitHub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [facebook, setFacebook] = useState("");

  const [roll, setRoll] = useState(0);
  const [socials,setSocials] = useState({})
  const fillValues = async () => {
    const supabase = createClient(
      process.env.REACT_APP_SUPAURL,
      process.env.REACT_APP_SUPAKEY
    );

    const { data, error } = await supabase
      .from("clowns")
      .select()
      .eq("roll", roll);
    //empty fields before next search
    setId(0);
    setCreatedAt("");
    setName("");
    setTitle("");
    setCourse("");
    setAbout("");
    setRating(0);
    setClownId("");
    setClownPic("");
    setTikTok(data[0].socials.TikTok);
    setYouTube("");
    setGitHub("");
    setTwitter("");
    setEmail("");
    setTelegram("");
    setInstagram("");
    setWhatsApp("");
    setLinkedIn("");
    setFacebook("");
    ////////////////////////
    setId(data[0].id);
    setCreatedAt(data[0].created_at);
    setName(data[0].name);
    setTitle(data[0].title);
    setCourse(data[0].course);
    setAbout(data[0].about);
    setRating(data[0].rating);
    setClownId(data[0].clown_id);
    setClownPic(data[0].clown_pic);
    if (Object.keys(data[0].socials).length !== 0) {
      if (data[0].socials.TikTok) {
        setTikTok(data[0].socials.TikTok);
      }
      if (data[0].socials.YouTube) {
        setYouTube(data[0].socials.YouTube);
      }
      if (data[0].socials.GitHub) {
        setGitHub(data[0].socials.GitHub);
      }
      if (data[0].socials.Twitter) {
        setTwitter(data[0].socials.Twitter);
      }
      if (data[0].socials.Email) {
        setEmail(data[0].socials.Email);
      }
      if (data[0].socials.Telegram) {
        setTelegram(data[0].socials.Telegram);
      }
      if (data[0].socials.Instagram) {
        setInstagram(data[0].socials.Instagram);
      }
      if (data[0].socials.WhatsApp) {
        setWhatsApp(data[0].socials.WhatsApp);
      }
      if (data[0].socials.LinkedIn) {
        setLinkedIn(data[0].socials.LinkedIn);
      }
      if (data[0].socials.Facebook) {
        setFacebook(data[0].socials.Facebook);
      }
    }
  };

  const updateProfile = async () =>{
    const nonEmptyVariables = Object.fromEntries(
        Object.entries({ linkedIn,facebook,twitter,tiktok,instagram,github,telegram,youtube,email }).filter(
          ([key, value]) => value !== undefined && value !== ""
        )
      )
      const temp = {}
      for (const key in nonEmptyVariables) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        temp[capitalizedKey] = nonEmptyVariables[key];
      }
    setSocials(temp)

    const supabase = createClient(
        process.env.REACT_APP_SUPAURL,
        process.env.REACT_APP_SUPAKEY
      );
    const data = {
        "id": id,
        "name": name,
        "clown_pic": clown_pic,
        "title": title,
        "course": course,
        "about": about,
        "clown_id": clown_id,
        "socials":socials,
        "rating": rating
      }
    const {error} = await supabase.from('clowns').update(data).eq('roll',roll);
    if(error === undefined || error === null){
        setMessage("Updated Successfully")
    }else{
        setMessage(error)
    }
  }
  return (
    <div className="bg-white justify-evenly items-center flex space-y-3 align-middle mx-80 mt-24 text-black rounded-2xl font-Carnivalee text-2xl">
      <div className="flex flex-col space-y-3 p-5">
        <div className="space-x-5">
          <label htmlFor="roll">Search with Roll Number:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="roll"
            name="roll"
            onChange={(e) => setRoll(e.target.value)}
          />
          <button onClick={() => fillValues()} className="p-2">
            Search
          </button>
        </div>
        <br />
        <div className="space-x-5">
          <label htmlFor="id">ID:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="number"
            id="id"
            name="id"
            value={id}
            onChange={(e)=>setId(e.target.value)}
          />
        </div>
        <br />

        <div className="w-full justify-items-stretch space-x-5">
          <label htmlFor="created_at">Created At:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="created_at"
            name="created_at"
            value={created_at}
            disabled
          />
        </div>
        <br />

        <div className="space-x-5">
          <label htmlFor="name">Name:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <br />

        <div className="space-x-5">
          <label htmlFor="clown_pic">Clown Pic URL:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="clown_pic"
            name="clown_pic"
            value={clown_pic}
            onChange={(e)=>setClownPic(e.target.value)}
          />
        </div>
        <br />

        <div className="space-x-5">
          <label htmlFor="title">Title:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <br />

        <div className="space-x-5">
          <label htmlFor="course">Course:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="course"
            name="course"
            value={course}
            onChange={(e)=>setCourse(e.target.value)}
          />
        </div>
        <br />

        <div className="space-x-5">
          <label htmlFor="about">About:</label>
          <textarea
            className="border border-red-500 rounded-lg p-2"
            id="about"
            name="about"
            value={about}
            onChange={(e)=>setAbout(e.target.value)}
          />
        </div>
        <br />

        <div className="space-x-5">
          <label htmlFor="clown_id">Clown ID:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="clown_id"
            name="clown_id"
            value={clown_id}
            onChange={(e)=>setClownId(e.target.value)}
          />
        </div>
        <br />

        <div className="space-x-5">
          <h4>Social Links</h4>
          <label htmlFor="facebook">Facebook:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="facebook"
            name="Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
          <label htmlFor="instagram">Instagram:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="instagram"
            name="Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <br />
          <label htmlFor="linkedIn">LinkedIn:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="linkedIn"
            name="LinkedIn"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <label htmlFor="telegram">Telegram:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="telegram"
            name="Telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email:</label>{" "}
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="tiktok">Tiktok:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="tikTok"
            name="TikTok"
            value={tiktok}
            onChange={(e) => setTikTok(e.target.value)}
          />
          <br />
          <label htmlFor="whatsapp">Whatsapp:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="whatsApp"
            name="WhatsApp"
            value={whatsApp}
            onChange={(e) => setWhatsApp(e.target.value)}
          />
          <label htmlFor="youTube">YouTube:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="youTube"
            name="YouTube"
            value={youtube}
            onChange={(e) => setYouTube(e.target.value)}
          />
          <br />
          <label htmlFor="github">GitHub:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="github"
            name="GitHub"
            value={github}
            onChange={(e) => setGitHub(e.target.value)}
          />
          <label htmlFor="youTube">Twitter:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="twitter"
            name="Twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>
        <br />
        <div className="space-x-5">
          <label htmlFor="id">Rating:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="number"
            max="5"
            id="rating"
            name="rating"
            value={rating}
            onChange={(e)=>setRating(e.target.value)}
          />
        </div>
        <br />
        <button
          onClick={() => updateProfile()}
          className="rounded-tl-lg rounded-br-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-2xl mx-10 mb-5"
        >
          Click Twice to Update Clown
        </button>
        <p className="text-red text-lg">{message}</p>
      </div>
    </div>
  );
};
