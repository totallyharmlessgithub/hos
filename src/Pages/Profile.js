import { React, useState } from "react";
import logo from "../Images/logo.png";
import glb from "../Images/glb.png";
import border from "../Images/border.png";
import fbipepe from "../Images/fbipepe.png";
import pepe from "../Images/pepe.png";
import { RxCross1 } from "react-icons/rx";
import { FaWhatsapp, FaInstagram, FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { PiTiktokLogoThin, PiTelegramLogoLight } from "react-icons/pi";
import { FiFacebook } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { AiOutlineYoutube } from "react-icons/ai";
import { Tabs, Tab, TabPanels, TabPanel, TabList, Box } from "@chakra-ui/react";
import { About } from "../Components/About";
import { Contributions } from "../Components/Contributions";
import { Contribute } from "../Components/Contribute";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ChakraProvider,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import ReactStars from "@stack-pulse/react-star-rating";
import full from "../Images/full.png";
import empty from "../Images/empty.png";
import half from "../Images/half.png";
import { createClient } from "@supabase/supabase-js";
export const Profile = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRatingOpen,
    onOpen: onRatingOpen,
    onClose: onRatingClose,
  } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [desc,setDesc] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const clown = location.state.clown;
  const memes = [
    "https://www.youtube.com/embed/1K5miD_y1-k",
    "https://www.youtube.com/watch?v=oUhUyh9fA2o",
    "https://www.youtube.com/watch?v=o-YBDTqX_ZU",
  ];
  const submitReport = async () => {
    window.open(memes[Math.floor(Math.random() * memes.length)], "_blank");
    const supabase = createClient(
      process.env.REACT_APP_SUPAURL,
      process.env.REACT_APP_SUPAKEY
    );
    const {data,error} = await supabase.from("report").insert({name:name,email:email,description:desc})
  };
  const openSocial = (url) => {
    window.open(url, "_blank");
  };
  const updateRating = async () => {
    const supabase = createClient(
      process.env.REACT_APP_SUPAURL,
      process.env.REACT_APP_SUPAKEY
    );
    const newRating = (rating + clown.rating) / 2;
    const { updateError } = await supabase
      .from("clowns")
      .update({ rating: newRating })
      .eq("clown_id", clown.clown_id);
  };
  return (
    <div>
      <BrowserView>
        <div className="p-2 flex flex-row">
          <div
            onClick={() => navigate("/")}
            className="flex flex-row justify-stretch w-screen pt-2"
          >
            <div>
              <img src={logo} height={200} width={200} alt="logo" />
            </div>
            <p className="px-10 py-28 text-white font-extralight text-5xl">
              <RxCross1 />
            </p>
            <div className="py-10">
              <img src={glb} height={200} width={200} alt="glb" />
            </div>
          </div>
          <button onClick={()=>navigate("/")} className=" h-24 font-Carnivalee rounded-tl-lg rounded-br-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 whitespace-nowrap  px-5 mx-5 mt-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-4xl my-20">
            Explore Now
          </button>
        </div>
        <div className="flex flex-row w-screen justify-center space-x-60">
          <div className="flex flex-row">
            <div className="relative">
              <img
                src={border}
                alt="border"
                height={300}
                width={200}
                className="relative rounded-2xl"
              />
              <img
                src={clown.clown_pic}
                height={450}
                width={180}
                className="absolute rounded-lg top-3 left-2.5"
                alt="pic"
              />
            </div>

            <div className="flex flex-col font-Carnivalee px-5">
              <p className="text-white text-7xl">{clown.name}</p>
              <p className="text-white text-5xl">{clown.title}</p>
              <div className="flex flex-row space-x-2 text-[#ffc372] text-3xl py-3">
                {Object.keys(clown.socials).map((social) => {
                  if (social === "Facebook") {
                    return (
                      <FiFacebook
                        onClick={() => openSocial(clown.socials.Facebook)}
                      />
                    );
                  } else if (social === "LinkedIn") {
                    return (
                      <SlSocialLinkedin
                        onClick={() => openSocial(clown.socials.LinkedIn)}
                      />
                    );
                  } else if (social === "Telegram") {
                    return (
                      <PiTelegramLogoLight
                        onClick={() => openSocial(clown.socials.Telegram)}
                      />
                    );
                  } else if (social === "Email") {
                    return (
                      <IoMailOutline
                        onClick={() => openSocial(clown.socials.Email)}
                      />
                    );
                  } else if (social === "Tiktok") {
                    return (
                      <PiTiktokLogoThin
                        onClick={() => openSocial(clown.socials.Tiktok)}
                      />
                    );
                  } else if (social === "Whatsapp") {
                    return (
                      <FaWhatsapp
                        onClick={() => openSocial(clown.socials.Whatsapp)}
                      />
                    );
                  } else if (social === "Instagram") {
                    return (
                      <FaInstagram
                        onClick={() => openSocial(clown.socials.Instagram)}
                      />
                    );
                  } else if (social === "YouTube") {
                    return (
                      <AiOutlineYoutube
                        onClick={() => openSocial(clown.socials.YouTube)}
                      />
                    );
                  } else if (social === "Github") {
                    return (
                      <FaGithub
                        onClick={() => openSocial(clown.socials.Github)}
                      />
                    );
                  } else if (social === "Twitter") {
                    return (
                      <FaXTwitter
                        onClick={() => openSocial(clown.socials.Twitter)}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
              <p className="text-white text-5xl">{clown.course}</p>
            </div>
          </div>

          <div className="flex flex-col font-Carnivalee justify-start">
            <button
              onClick={onRatingOpen}
              className="px-2 justify-center align-middle inline-flex rounded-tl-lg rounded-br-lg bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2  shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 active:bg-yellow-800 active:shadow-inner transition duration-150 ease-in-out glow-yellow bg-opacity-40 text-xl my-5"
            >
              <p className="pt-1 px-2">Rate This Clown </p>
              <img src={pepe} height={70} width={70} alt="fbi" />
            </button>
            <ChakraProvider>
              <Modal
                className="bg-opacity-50"
                isOpen={isRatingOpen}
                onClose={onRatingClose}
                isCentered
              >
                <ModalOverlay />
                <ModalContent
                  bg="transparent"
                  p={4}
                  borderRadius="sm"
                  maxW="700px"
                >
                  <Box className="p-5 rounded-lg bg-opacity-80 bg-red-500 font-Carnivalee text-5xl pb-10">
                    Rate this clown
                    <ReactStars
                      classNames="flex flex-row my-10 "
                      count={5}
                      onChange={(value) => setRating(value)}
                      size={24}
                      isHalf={true}
                      emptyIcon={
                        <img src={empty} height={60} width={60} alt="empty" />
                      }
                      halfIcon={
                        <img src={half} height={60} width={60} alt="half" />
                      }
                      filledIcon={
                        <img src={full} height={60} width={60} alt="full" />
                      }
                    />
                    <input
                      onClick={() => {
                        onRatingClose();
                        return updateRating();
                      }}
                      type="submit"
                      value="Submit"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
                    />
                  </Box>
                </ModalContent>
              </Modal>
            </ChakraProvider>
            <button
              onClick={onOpen}
              className="justify-center inline-flex rounded-tl-xl rounded-br-xl bg-red-500 hover:bg-red-700 text-white font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-xl "
            >
              <p className="pt-2 pr-2">Report Profile</p>{" "}
              <img src={fbipepe} alt="fbi" />
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
                    <form onSubmit={submitReport} className="font-Carnivalee">
                      <label
                        htmlFor="subject"
                        className="block mb-2  font-medium"
                      >
                        Why do you want to report?:
                      </label>
                      <input
                        required
                        placeholder="Enter subject of report"
                        type="text"
                        id="subject"
                        name="subject"
                        className="text-lg bg-opacity-80  border border-gray-300 text-gray-900  rounded-lg  block w-full p-2.5"
                      />
                      <br />
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
                        onChange={(event)=>setEmail(event.target.value)}
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
                        onChange={(event)=>setName(event.target.value)}
                        className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                      />
                      <br />
                      <label
                        htmlFor="description"
                        className="block mb-2 font-medium"
                      >
                        Description:
                      </label>
                      <textarea
                        required
                        placeholder="Describe here"
                        id="description"
                        name="description"
                        onChange={(event)=>setDesc(event.target.value)}
                        className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                      ></textarea>
                      <br />
                      <input
                        type="submit"
                        value="Submit"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
                      />
                    </form>
                  </Box>
                </ModalContent>
              </Modal>
            </ChakraProvider>
          </div>
        </div>
        <div className="justify-center  mt-16">
          <Tabs
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
            className="font-Carnivalee "
          >
            <TabList className="justify-center">
              <Tab
                _selected={{
                  color: "white",
                  bg: "red.500",
                  backgroundColor: "#A60000",
                }}
                className="px-24 py-2 text-3xl text-white bg-red-500 bg-opacity-30"
              >
                About
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "red.500",
                  backgroundColor: "#A60000",
                }}
                className="px-24 py-2 text-3xl text-white bg-red-700 bg-opacity-30"
              >
                Contributions
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "red.500",
                  backgroundColor: "#A60000",
                }}
                className="px-24 py-2 text-3xl text-white bg-red-500 bg-opacity-30"
              >
                Contribute
              </Tab>
            </TabList>
            <hr
              style={{
                background: "yellow",
                color: "yellow",
                borderColor: "yellow",
                height: "3px",
                width: "900px",
                margin: "0 auto",
              }}
            />
            <TabPanels>
              <TabPanel className="w-full flex justify-center items-center">
                <Box
                  className="my-5 w-full text-center text-white text-2xl"
                  p={4}
                >
                  <About data={clown.about} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box className="my-5 mx-32 text-white text-2xl" p={4}>
                  <Contributions data={clown.contributions} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box className="my-5 mx-32 text-white text-2xl" p={4}>
                  <Contribute roll={clown.roll} />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </BrowserView>
      <MobileView>
        <header
          onClick={() => navigate("/")}
          className="p-2 flex flex-col items-center"
        >
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
        </header>
        <div className="flex flex-col w-screen justify-center space-x-30">
          <div className="flex flex-row">
            <div className="relative">
              <img
                src={border}
                alt="border"
                height={600}
                width={300}
                className="relative rounded-2xl"
              />
              <img
                src={clown.clown_pic}
                height={450}
                width={180}
                className="absolute rounded-lg top-5 left-1.5"
                alt="pic"
              />
            </div>

            <div className="flex flex-col font-Carnivalee px-5">
              <p className="text-white text-6xl">{clown.name}</p>
              <p className="text-white text-4xl">{clown.title}</p>
              <div className="flex flex-row space-x-2 text-[#ffc372] text-3xl py-3">
                {Object.keys(clown.socials).map((social) => {
                  if (social === "Facebook") {
                    return (
                      <FiFacebook
                        onClick={() => openSocial(clown.socials.Facebook)}
                      />
                    );
                  } else if (social === "LinkedIn") {
                    return (
                      <SlSocialLinkedin
                        onClick={() => openSocial(clown.socials.LinkedIn)}
                      />
                    );
                  } else if (social === "Telegram") {
                    return (
                      <PiTelegramLogoLight
                        onClick={() => openSocial(clown.socials.Telegram)}
                      />
                    );
                  } else if (social === "Email") {
                    return (
                      <IoMailOutline
                        onClick={() => openSocial(clown.socials.Email)}
                      />
                    );
                  } else if (social === "Tiktok") {
                    return (
                      <PiTiktokLogoThin
                        onClick={() => openSocial(clown.socials.Tiktok)}
                      />
                    );
                  } else if (social === "Whatsapp") {
                    return (
                      <FaWhatsapp
                        onClick={() => openSocial(clown.socials.Whatsapp)}
                      />
                    );
                  } else if (social === "Instagram") {
                    return (
                      <FaInstagram
                        onClick={() => openSocial(clown.socials.Instagram)}
                      />
                    );
                  } else if (social === "YouTube") {
                    return (
                      <AiOutlineYoutube
                        onClick={() => openSocial(clown.socials.YouTube)}
                      />
                    );
                  } else if (social === "Github") {
                    return (
                      <FaGithub
                        onClick={() => openSocial(clown.socials.Github)}
                      />
                    );
                  } else if (social === "Twitter") {
                    return (
                      <FaXTwitter
                        onClick={() => openSocial(clown.socials.Twitter)}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
              <p className="text-white text-5xl">{clown.course}</p>
            </div>
          </div>

          <div className="flex flex-col font-Carnivalee justify-start">
            <button
              onClick={onRatingOpen}
              className="px-2 justify-center align-middle inline-flex rounded-tl-lg rounded-br-lg bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2  shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 active:bg-yellow-800 active:shadow-inner transition duration-150 ease-in-out glow-yellow bg-opacity-40 text-xl my-5"
            >
              <p className="pt-1 px-2">Rate This Clown </p>
              <img src={pepe} height={70} width={70} alt="fbi" />
            </button>
            <ChakraProvider>
              <Modal
                className="bg-opacity-50"
                isOpen={isRatingOpen}
                onClose={onRatingClose}
                isCentered
              >
                <ModalOverlay />
                <ModalContent
                  bg="transparent"
                  p={4}
                  borderRadius="sm"
                  maxW="700px"
                >
                  <Box className="p-5  rounded-lg bg-opacity-80 bg-red-500 text-2xl">
                    Rate this clown
                    <ReactStars
                      classNames="flex flex-row my-10 "
                      count={5}
                      onChange={(value) => setRating(value)}
                      size={24}
                      isHalf={true}
                      emptyIcon={
                        <img src={empty} height={60} width={60} alt="empty" />
                      }
                      halfIcon={
                        <img src={half} height={60} width={60} alt="half" />
                      }
                      filledIcon={
                        <img src={full} height={60} width={60} alt="full" />
                      }
                    />
                    <input
                      onClick={() => {
                        onRatingClose();
                        return updateRating();
                      }}
                      type="submit"
                      value="Submit"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
                    />
                  </Box>
                </ModalContent>
              </Modal>
            </ChakraProvider>
            <button
              onClick={onOpen}
              className="justify-center inline-flex rounded-tl-xl rounded-br-xl bg-red-500 hover:bg-red-700 text-white font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 active:shadow-inner transition duration-150 ease-in-out glow-red bg-opacity-40 text-xl "
            >
              <p className="pt-2 pr-2">Report Profile</p>{" "}
              <img src={fbipepe} alt="fbi" />
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
                    <form onSubmit={submitReport} className="font-Carnivalee">
                      <label
                        htmlFor="subject"
                        className="block mb-2  font-medium"
                      >
                        Why do you want to report?:
                      </label>
                      <input
                        required
                        placeholder="Enter subject of report"
                        type="text"
                        id="subject"
                        name="subject"
                        className="text-lg bg-opacity-80  border border-gray-300 text-gray-900  rounded-lg  block w-full p-2.5"
                      />
                      <br />
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
                        onChange={(event)=>setEmail(event.target.value)}
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
                        onChange={(event)=>setName(event.target.value)}
                        className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                      />
                      <br />
                      <label
                        htmlFor="description"
                        className="block mb-2 font-medium"
                      >
                        Description:
                      </label>
                      <textarea
                        required
                        placeholder="Describe here"
                        id="description"
                        name="description"
                        onChange={(event)=>setDesc(event.target.value)}
                        className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  block w-full p-2.5 "
                      ></textarea>
                      <br />
                      <input
                        type="submit"
                        value="Submit"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
                      />
                    </form>
                  </Box>
                </ModalContent>
              </Modal>
            </ChakraProvider>
          </div>
        </div>
        <div className="justify-center  mt-16">
          <Tabs
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
            className="font-Carnivalee "
          >
            <TabList className="justify-center">
              <Tab
                _selected={{
                  color: "white",
                  bg: "red.500",
                  backgroundColor: "#A60000",
                }}
                className="px-7 py-2 text-3xl text-white bg-red-500 bg-opacity-30"
              >
                About
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "red.500",
                  backgroundColor: "#A60000",
                }}
                className="px-7 py-2 text-3xl text-white bg-red-700 bg-opacity-30"
              >
                Contributions
              </Tab>
              <Tab
                _selected={{
                  color: "white",
                  bg: "red.500",
                  backgroundColor: "#A60000",
                }}
                className="px-7 py-2 text-3xl text-white bg-red-500 bg-opacity-30"
              >
                Contribute
              </Tab>
            </TabList>
            <hr
              style={{
                background: "yellow",
                color: "yellow",
                borderColor: "yellow",
                height: "3px",

                margin: "0 auto",
              }}
              className="w-full"
            />
            <TabPanels>
              <TabPanel className="w-full flex justify-center items-center">
                <Box
                  className="my-5 w-full text-center text-white text-2xl"
                  p={4}
                >
                  <About data={clown.about} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box className="my-5 mx-0 text-white text-2xl" p={4}>
                  <Contributions data={clown.contributions} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box className="my-5 mx-32 text-white text-2xl" p={4}>
                  <Contribute roll={clown.roll} />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </MobileView>
    </div>
  );
};
