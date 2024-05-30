import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png";
import glb from "../Images/glb.png";
import pepe from "../Images/pepe.png";
import { RxCross1 } from "react-icons/rx";
import border from "../Images/border.png";
import { useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import { createClient } from "@supabase/supabase-js";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ChakraProvider,
  Box
} from "@chakra-ui/react";


export const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    navigate("/search");
  };
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    async function fetchTrending() {
      const supabase = createClient(process.env.REACT_APP_SUPAURL, process.env.REACT_APP_SUPAKEY);
      const { data, error } = await supabase
        .from('clowns')
        .select()
        .order('rating', { ascending: false }).limit(3)
      setTrending(data)
    }
    fetchTrending()
  }, [])

  const submitContact = async () => {
    onClose()
    const supabase = createClient(process.env.REACT_APP_SUPAURL, process.env.REACT_APP_SUPAKEY);
    const { error } = await supabase
      .from('contacts')
      .insert({ name: name, email: email, msg: message })
  }
  return (
    <div className="justify-center text-center">
      <BrowserView>
        <div className="flex flex-row justify-center pt-10">
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
        <div className="font-Carnivalee text-red-100 drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 pt-20 ">
          <p className=" text-9xl ">Welcome to the Hall of Shame</p>
          <p className="text-4xl py-10">
            Where clowns of GLBITM get their moment of fame(or shame)
          </p>
          <button
            onClick={handleClick}
            className="rounded-tl-lg rounded-br-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-4xl my-20"
          >
            Explore Now
          </button>
        </div>

        <div className="flex justify-center text-red-100 font-Carnivalee text-7xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 py-36">
          Trending Clowns <img src={pepe} alt="pepe" />
        </div>
        <div className="flex flex-row pb-20 gap-24 justify-center">
          {trending !== null ? trending.map((clown) => <div onClick={() => navigate("/profile?id=" + clown.profile_id)} className="flex flex-col">
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
                className="absolute rounded-lg top-10 left-6"
                alt="pic"
              />
            </div>
            <div className="flex flex-col mt-auto font-Carnivalee">
              <p className=" m-2 p-5 rounded-2xl bg-red-500 text-white text-2xl bg-opacity-50">
                {clown.name}
              </p>
              <div className="flex flex-row justify-center">
                <p className="text-white text-2xl py-5">{clown.rating}/5 </p>
                <img src={pepe} alt="pepe" />
              </div>
            </div>
          </div>) : <></>}

        </div>
        <div className="flex flex-row justify-center  font-Carnivalee pt-24">
          <p className="text-4xl text-red-100 font-Carnivalee">
            Create a Hall of Shame for your own college
          </p>
          <button onClick={onOpen} className="rounded-tl-lg rounded-br-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-2xl mx-10 mb-5">
            CREATE NOW
          </button>
          <ChakraProvider>
            <Modal
              className="bg-opacity-50"
              isOpen={isOpen}
              onClose={onClose}
              isCentered
            >
              <ModalOverlay />
              <ModalContent
                bg="transparent"
                p={4}
                borderRadius="sm"
                maxW="700px"
              >
                <Box className="p-5 rounded-lg bg-opacity-80 bg-red-500 text-2xl">

                  <label
                    htmlFor="email"
                    className="block mb-2  font-medium"
                  >
                    Email:
                  </label>
                  <input
                    required
                    placeholder="Enter your mail to get notified about report updates"
                    type="email"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5"
                  />
                  <br />
                  <label
                    htmlFor="name"
                    className="block mb-2  font-medium "
                  >
                    Name:
                  </label>
                  <input
                    required
                    placeholder="Enter your name for report verification"
                    type="text"
                    id="name"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                  />
                  <br />
                  <label
                    htmlFor="description"
                    className="block mb-2 font-medium"
                  >
                    Message:
                  </label>
                  <textarea
                    required
                    placeholder="Write your Message here"
                    id="message"
                    name="message"
                    onChange={(event) => setMessage(event.target.value)}
                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                  ></textarea>
                  <br />
                  <button
                    onClick={() => submitContact}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
                  >Submit</button>

                </Box>
              </ModalContent>
            </Modal>
          </ChakraProvider>
        </div>
      </BrowserView>
      <MobileView>
        <div className="flex flex-row justify-center pt-10">
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
        <div className="font-Carnivalee text-red-100 drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 pt-51 ">
          <p className=" text-8xl ">Welcome to the Hall of Shame</p>
          <p className="text-4xl py-10">
            Where clowns of GLBITM get their moment of fame(or shame)
          </p>
          <button
            onClick={handleClick}
            className="rounded-tl-lg rounded-br-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-4xl my-20"
          >
            Explore Now
          </button>
        </div>

        <div className="flex flex-row justify-center text-red-100 font-Carnivalee text-7xl drop-shadow-[3px_3px_var(--tw-shadow-color)] shadow-red-500 py-24">
          <p>Trending Clowns</p>{" "}
          <img className="w-36 h-24" src={pepe} alt="pepe" />
        </div>
        <div className="flex flex-col pb-20 gap-14 justify-center lg:scale-75">
          {trending !== null ? trending.map((clown) => <div onClick={() => navigate("/profile?id=" + clown.profile_id)} className="flex flex-col items-center w-full mx-auto">
            <div className="relative px-5">
              <img
                src={border}
                alt="border"
                height={600}
                width={300}
                className="relative rounded-2xl"
              />
              <img
                src={clown.clown_pic}
                height={580}
                width={270}
                className="absolute rounded-lg top-3 left-9 object-cover h-80"
                alt="pic"
              />
            </div>
            <div className="flex flex-col mt-auto font-Carnivalee">
              <p className="m-2 p-5 rounded-2xl bg-red-500 text-white text-3xl bg-opacity-50">
                {clown.name}
              </p>
              <div className="flex flex-row justify-center">
                <p className="text-white text-2xl py-5">{clown.rating}/5</p>
                <img src={pepe} alt="pepe" />
              </div>
            </div>
          </div>) : <></>}
        </div>
        <div className="flex flex-row justify-center  font-Carnivalee pt-24">
          <p className="text-4xl text-red-100 font-Carnivalee">
            Create a Hall of Shame for your own college
          </p>
          <button onClick={onOpen} className="rounded-tl-lg rounded-br-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-2xl mx-10 mb-5">
            CREATE NOW
          </button>
          <ChakraProvider>
            <Modal
              className="bg-opacity-50"
              isOpen={isOpen}
              onClose={onClose}
              isCentered
            >
              <ModalOverlay />
              <ModalContent
                bg="transparent"
                p={4}
                borderRadius="sm"
                maxW="700px"
              >
                <Box className="p-5 rounded-lg bg-opacity-80 bg-red-500 text-2xl">

                  <label
                    htmlFor="email"
                    className="block mb-2  font-medium"
                  >
                    Email:
                  </label>
                  <input
                    required
                    placeholder="Enter your mail to get notified about report updates"
                    type="email"
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5"
                  />
                  <br />
                  <label
                    htmlFor="name"
                    className="block mb-2  font-medium "
                  >
                    Name:
                  </label>
                  <input
                    required
                    placeholder="Enter your name for report verification"
                    type="text"
                    id="name"
                    name="name"
                    onChange={(event) => setName(event.target.value)}
                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                  />
                  <br />
                  <label
                    htmlFor="description"
                    className="block mb-2 font-medium"
                  >
                    Message:
                  </label>
                  <textarea
                    required
                    placeholder="Write your Message here"
                    id="message"
                    name="message"
                    onChange={(event) => setMessage(event.target.value)}
                    className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                  ></textarea>
                  <br />
                  <button
                    onClick={() => submitContact}
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
                  >Submit</button>

                </Box>
              </ModalContent>
            </Modal>
          </ChakraProvider>
        </div>
      </MobileView>
    </div>
  );
};
