import { useState } from "react";
import React from "react";
import { createClient } from "@supabase/supabase-js";
export const AddMoreClowns = () => {
  
  const generateId = () => {
    var randomString = "";
    for (let i = 0; i < 6; i++) {
      const randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      randomString += randomCharacter;
    } 
    return randomString;
  };
  const generateProfileId = () => {
    var randomString = "";
    for (let i = 0; i < 6; i++) {
      const randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      randomString += randomCharacter;
    } 
    return randomString;
  };
  const [clownData, setClownData] = useState({
    profile_id: generateProfileId(),
    roll: "",
    name: "",
    clown_pic: "https://wallpapercave.com/wp/wp7363183.jpg",
    title: "",
    course: "",
    about: "",
    clown_id: generateId(),
    socials: {},
    contributions: [],
    rating: 0,
  });
  const [message, setMessage] = useState(0);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClownData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;
    setClownData((prevData) => ({
      ...prevData,
      socials: { ...prevData.socials, [name]: value },
    }));
  };

  
  const addProfile = async () => {
    const supabase = createClient(
      process.env.REACT_APP_SUPAURL,
      process.env.REACT_APP_SUPAKEY
    );
    const { error } = await supabase.from("clowns").insert(clownData);
    if (error == null) {
      setMessage("Successfully entered");
    } else {
      setMessage(error);
    }
    console.log(error)
  };

  return (
    <div className="bg-white justify-evenly items-center flex space-y-3 align-middle mx-80 mt-24 text-black rounded-2xl font-Carnivalee text-2xl">
      <div className="flex flex-col space-y-3 p-5">

        <div className="space-x-5">
          <label htmlFor="profile_id">Profile ID:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="profile_id"
            name="profile_id"
            value={generateProfileId()}
            onChange={handleChange}
            disabled
          />
        </div>
        <br />


        <div className="space-x-5">
          <label htmlFor="roll">Roll Number:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="roll"
            name="roll"
            value={clownData.roll}
            onChange={handleChange}
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
            value={clownData.name}
            onChange={handleChange}
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
            value={clownData.clown_pic}
            onChange={handleChange}
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
            value={clownData.title}
            onChange={handleChange}
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
            value={clownData.course}
            onChange={handleChange}
          />
        </div>
        <br />

        <div className="space-x-5">
          <label htmlFor="about">About:</label>
          <textarea
            className="border border-red-500 rounded-lg p-2"
            id="about"
            name="about"
            value={clownData.about}
            onChange={handleChange}
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
            value={generateId()}
            onChange={handleChange}
            disabled
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
            value={clownData.socials.Facebook}
            onChange={handleSocialChange}
          />
          <label htmlFor="instagram">Instagram:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="instagram"
            name="Instagram"
            value={clownData.socials.Instagram}
            onChange={handleSocialChange}
          />
          <br />
          <label htmlFor="linkedIn">LinkedIn:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="linkedIn"
            name="LinkedIn"
            value={clownData.socials.LinkedIn}
            onChange={handleSocialChange}
          />
          <label htmlFor="telegram">Telegram:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="telegram"
            name="Telegram"
            value={clownData.socials.Telegram}
            onChange={handleSocialChange}
          />
          <br />
          <label htmlFor="email">Email:</label>{" "}
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="email"
            name="Email"
            value={clownData.socials.Email}
            onChange={handleSocialChange}
          />
          <label htmlFor="tiktok">Tiktok:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="tiktok"
            name="Tiktok"
            value={clownData.socials.Tiktok}
            onChange={handleSocialChange}
          />
          <br />
          <label htmlFor="whatsapp">Whatsapp:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="whatsapp"
            name="Whatsapp"
            value={clownData.socials.Whatsapp}
            onChange={handleSocialChange}
          />
          <label htmlFor="youTube">YouTube:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="youTube"
            name="YouTube"
            value={clownData.socials.YouTube}
            onChange={handleSocialChange}
          />
          <br />
          <label htmlFor="github">Github:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="github"
            name="Github"
            value={clownData.socials.Github}
            onChange={handleSocialChange}
          />
          <label htmlFor="youTube">Twitter:</label>
          <input
            className="border border-red-500 rounded-lg p-2"
            type="text"
            id="twitter"
            name="Twitter"
            value={clownData.socials.Twitter}
            onChange={handleSocialChange}
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
            value={clownData.rating}
            onChange={handleChange}
          />
        </div>
        <br />
        <button
          onClick={() => addProfile()}
          className="rounded-tl-lg rounded-br-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-2xl mx-10 mb-5"
        >
          Add Clown
        </button>
        <p className="text-red text-lg">{message}</p>
      </div>
    </div>
  );
};
