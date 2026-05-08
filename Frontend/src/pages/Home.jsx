import React from "react";
import { ChevronRight } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaApple,
  FaGooglePlay,
  FaFire,
} from "react-icons/fa";

export default function Home() {
  const getImg = (name) =>
    new URL(`../assets/images/${name}`, import.meta.url).href;

  const SectionHeader = ({ title, bgClass, colorHex, className = "mt-16" }) => (
    <div className={`w-full mb-6 ${className}`}>
      <div
        className={`w-full h-1.5`}
        style={{ backgroundColor: colorHex }}
      ></div>
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-0 flex items-start">
        <div
          className={`${bgClass} text-white font-black text-[28px] px-4 pt-3 pb-2 flex items-center tracking-tight leading-none border-t-[6px] border-[#3D0026] relative z-10`}
        >
          {title}
        </div>
        <div className="ml-3 mt-4 text-[11px] font-black uppercase tracking-widest text-[#1a0a22] flex items-center cursor-pointer hover:underline group">
          VIEW ALL{" "}
          <ChevronRight
            className="ml-0.5 w-3 h-3 group-hover:translate-x-1 transition-transform"
            strokeWidth={3}
          />
        </div>
      </div>
    </div>
  );

  const PopularAvatars = ({ title, avatars }) => (
    <div className="mb-10 w-full">
      <h3 className="text-[17px] font-black text-[#3D0026] mb-5 tracking-tight">
        {title}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {avatars.map((av, i) => (
          <div key={i} className="flex flex-col cursor-pointer group">
            <div className="w-full aspect-square overflow-hidden mb-2">
              <img
                src={getImg(av.img)}
                alt={av.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-[12px] md:text-[13px] font-black text-[#A20044] leading-tight group-hover:underline mb-1">
              {av.name}
            </span>
            <span className="text-[10px] md:text-[11px] font-bold text-[#3D0026] leading-tight flex items-start group-hover:text-blue-600">
              <svg
                className="w-3 h-3 mr-1 opacity-70 shrink-0 mt-px"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.5 0-4.5-2-4.5-4.5S8.5 7.5 11 7.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5zm1-7l-2 3h4l-2 3z" />
              </svg>
              {av.wiki || `${av.name} Wiki`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const StoryCard = ({ img, tag, title, author, date }) => (
    <div className="bg-white rounded overflow-hidden shadow group cursor-pointer flex flex-col h-full">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={getImg(img)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="relative flex justify-center -mt-3.5 z-10 shrink-0">
        <span className="bg-[#FA005A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">
          {tag}
        </span>
      </div>
      <div className="p-4 pt-3 text-center flex flex-col flex-grow justify-between">
        <h4 className="font-extrabold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
          {title}
        </h4>
        <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-auto">
          by <span className="font-bold text-[#FA005A]">{author}</span> •{" "}
          <span className="text-gray-400">{date}</span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full font-sans bg-[#f2f2f2] overflow-x-hidden min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="relative flex flex-col w-full bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${getImg("bigback.webp")}), linear-gradient(135deg, #A20044 0%, #36002A 100%)`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex flex-col items-center pt-10 md:pt-16 px-4 md:px-6 max-w-7xl mx-auto w-full">
          <img
            src={getImg("Fandom_logo_2021_lockup_2.webp")}
            alt="Fandom"
            className="h-16 md:h-20 mb-8 drop-shadow-xl"
          />

          <div className="w-full max-w-3xl relative mb-12 mx-auto">
            <input
              type="text"
              placeholder="Search the world's largest fan wiki platform"
              className="w-full bg-[#3D0026] text-white placeholder-gray-300 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg outline-none shadow-xl border border-[#F9EDD8] focus:border-white transition-colors pr-14 md:pr-16"
            />
            <span className="absolute right-2 md:right-3 top-1.5 md:top-2.5 bg-white text-[#3D0026] rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
          </div>

          {/* Trending News Row */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mb-12 md:mb-16">
            {[
              {
                img: "ellietlou.webp",
                title:
                  "Mixtape Review - Please Don't Skip This Musical Coming-Of-Age Story",
                tag: "GAMES",
              },
              {
                img: "starfire.webp",
                title: "Star Fox For Nintendo Switch 2 Announced",
                tag: "GAMES",
              },
              {
                img: "og-image-6.webp",
                title:
                  "Remember 1990s Arcade Shooters? They're Back, In Roguelite Form",
                tag: "GAMES",
              },
              {
                img: "static-assets-upload6419670657434733820.webp",
                title:
                  "The Complete History Of The Xbox Logo: From Green Glow To Modern Minimal",
                tag: "GAMES",
              },
              {
                img: "theboys1.webp",
                title:
                  "House of the Dragon Season 3 Unveils New Trailer and Premiere Date",
                tag: "TV",
              },
              {
                img: "neomatrix.webp",
                title:
                  "The X-Files Reboot: Everything To Know About Ryan Coogler's Hulu Pilot",
                tag: "TV",
              },
            ].map((news, i) => (
              <div
                key={i}
                className="bg-[#1A0A22] rounded-lg flex flex-col overflow-hidden text-white group cursor-pointer shadow-md h-full"
              >
                <div className="relative h-36 md:h-32 overflow-hidden shrink-0">
                  <img
                    src={getImg(news.img)}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 bg-[#FA005A] text-[11px] font-black px-2 py-1 uppercase tracking-widest">
                    {news.tag}
                  </span>
                </div>
                <div className="p-4 text-sm font-bold leading-tight group-hover:underline transition-colors flex-grow">
                  {news.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOP WIKIS BANNER */}
      <div className="w-full bg-[#1A0A22] text-white py-10 px-4 md:px-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="bg-[#FFC500] text-black font-black uppercase text-sm px-6 py-3 flex items-center shrink-0 tracking-widest">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            TOP WIKIS
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="text-[#FFC500] font-extrabold text-[11px] mb-3 tracking-widest uppercase">
                GAMES
              </span>
              <div className="space-y-1 text-[13px] font-bold">
                <div className="hover:underline cursor-pointer">Terraria</div>
                <div className="hover:underline cursor-pointer">Minecraft</div>
                <div className="hover:underline cursor-pointer">
                  Genshin Impact
                </div>
              </div>
            </div>
            <div className="flex flex-col border-l border-[#3e1b4d] pl-6">
              <span className="text-[#FFC500] font-extrabold text-[11px] mb-3 tracking-widest uppercase">
                MOVIES
              </span>
              <div className="space-y-1 text-[13px] font-bold">
                <div className="hover:underline cursor-pointer">Star Wars</div>
                <div className="hover:underline cursor-pointer">
                  Harry Potter
                </div>
                <div className="hover:underline cursor-pointer">Marvel</div>
              </div>
            </div>
            <div className="flex flex-col border-l border-[#3e1b4d] pl-6">
              <span className="text-[#FFC500] font-extrabold text-[11px] mb-3 tracking-widest uppercase">
                TV
              </span>
              <div className="space-y-1 text-[13px] font-bold">
                <div className="hover:underline cursor-pointer">
                  Memory Alpha
                </div>
                <div className="hover:underline cursor-pointer">Arrowverse</div>
                <div className="hover:underline cursor-pointer">
                  SpongeBobia
                </div>
              </div>
            </div>
            <div className="flex flex-col border-l border-[#3e1b4d] pl-6">
              <span className="text-[#FFC500] font-extrabold text-[11px] mb-3 tracking-widest uppercase">
                ANIME
              </span>
              <div className="space-y-1 text-[13px] font-bold">
                <div className="hover:underline cursor-pointer">One Piece</div>
                <div className="hover:underline cursor-pointer">Naruto</div>
                <div className="hover:underline cursor-pointer">
                  My Hero Academia
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center shrink-0 border-l border-[#3e1b4d] pl-8">
            <div className="text-[13px] font-bold leading-tight mr-6">
              Plus over{" "}
              <span className="text-white font-black text-sm">250,000</span>
              <br />
              more to explore
            </div>
            <button className="bg-[#FFC500] text-black p-2 hover:bg-yellow-400 transition-colors shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="pb-16 w-full">
        {/* MOVIES SECTION */}
        <SectionHeader
          title="MOVIES"
          bgClass="bg-[#FA005A]"
          colorHex="#FA005A"
          className="mt-0"
        />
        <div className="mb-6"></div>

        <div className="max-w-[1240px] mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-[70%] flex flex-col">
            <PopularAvatars
              title="Popular Wiki Pages in Movies"
              avatars={[
                {
                  img: "harrypotter.webp",
                  name: "Harry Potter",
                  wiki: "Harry Potter Wiki",
                },
                { img: "neomatrix.webp", name: "Neo", wiki: "Matrix Wiki" },
                {
                  img: "harleyquinn.webp",
                  name: "Harley Quinn",
                  wiki: "DC Extended Universe",
                },
                {
                  img: "snakeeyes.webp",
                  name: "Snake Eyes",
                  wiki: "G.I. Joe Wiki",
                },
                {
                  img: "disneyprincess.webp",
                  name: "Disney Princesses",
                  wiki: "Disney Wiki",
                },
                {
                  img: "godzilla.webp",
                  name: "Godzilla",
                  wiki: "Monster Verse Wiki",
                },
              ]}
            />

            <h3 className="text-[17px] font-black text-[#3D0026] mb-5 tracking-tight">
              Top News Stories in movies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <StoryCard
                img="grogu.webp"
                tag="FANDOM"
                title="Ultimate Grogu Is The Closest You Can Get To Owning The Real Thing"
                author="RYAN PETERS"
                date="NOV 10, 2021"
              />
              <StoryCard
                img="ellietlou.webp"
                tag="FANDOM"
                title="Fortnite Players Can Watch 10 Minutes Of The Next Star Wars Movie In-Game Soon"
                author="RYAN PETERS"
                date="NOV 10, 2021"
              />
              <StoryCard
                img="neomatrix.webp"
                tag="FANDOM"
                title="Resident Evil Movie Trailer Debuts, Highlighting A Terrifying New Vision"
                author="RYAN PETERS"
                date="NOV 10, 2021"
              />
              <StoryCard
                img="mortalkombatmileena.webp"
                tag="FANDOM"
                title="Street Fighter Movie Trailer Knows Exactly How Ridiculous It Is And Runs With It"
                author="RYAN PETERS"
                date="NOV 10, 2021"
              />
            </div>
          </div>

          <div className="md:w-[30%] hidden md:block mt-8 md:mt-0">
            <div className="sticky top-[100px] flex justify-center w-full">
              <div className="w-full max-w-[300px] h-[600px] relative overflow-hidden bg-[#0A101D] text-white flex flex-col pt-10 px-6 items-center shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-pink-600/20 to-black/90 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400 blur-[80px] rounded-full opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500 blur-[80px] rounded-full opacity-40"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 w-[150%] opacity-80 mix-blend-screen pointer-events-none">
                  <img
                    src={getImg("laracroft.webp")}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <img
                    src={getImg("neomatrix.webp")}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <img
                    src={getImg("godzilla.webp")}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                </div>

                <div className="z-10 flex flex-col items-center mt-[220px]">
                  <div className="bg-[#FF8800] rounded px-3 py-1.5 text-black font-black flex items-center mb-6 shadow-lg text-[11px] tracking-widest">
                    <span className="text-xl mr-2 font-serif font-extrabold">
                      F
                    </span>{" "}
                    FANATICAL
                  </div>
                  <h2 className="text-3xl font-black text-center mb-4 tracking-tight leading-tight">
                    OFFICIAL KEYS.
                    <br />
                    FANATICAL PRICES.
                  </h2>
                  <p className="text-center text-sm font-bold text-gray-300">
                    Dive into 1000s of officially licensed PC games and bundles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GAMES SECTION */}
        <SectionHeader
          title="GAMES"
          bgClass="bg-[#FA005A]"
          colorHex="#FA005A"
        />
        <div className="mb-6"></div>

        <div className="max-w-[1240px] mx-auto px-4 md:px-0 mb-16">
          <PopularAvatars
            title="Popular Wiki Pages in Games"
            avatars={[
              {
                img: "laracroft.webp",
                name: "Tomb Raider",
                wiki: "Tomb Raider Wiki",
              },
              {
                img: "nathandrake.webp",
                name: "Uncharted",
                wiki: "Uncharted Wiki",
              },
              { img: "link.webp", name: "Zelda", wiki: "Zelda Wiki" },
              { img: "pikachu.webp", name: "Pokemon", wiki: "Pokemon Wiki" },
              {
                img: "rathalos.webp",
                name: "Monster Hunter",
                wiki: "Monster Hunter Wiki",
              },
              {
                img: "mortalkombatmileena.webp",
                name: "Mortal Kombat",
                wiki: "Mortal Kombat Wiki",
              },
            ]}
          />

          <h3 className="text-[17px] font-black text-[#3D0026] mb-5 tracking-tight">
            Top News Stories in games
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StoryCard
              img="ellietlou.webp"
              tag="FANDOM"
              title="Review: Please Don't Play This Musical Coming Of Age Story"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="starfire.webp"
              tag="FANDOM"
              title="Star Fox For Nintendo Switch 2 Announced"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="og-image-6.webp"
              tag="FANDOM"
              title="Remember 1990s Arcade Shooters? They're Back In Pogs Form"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="snakeeyes.webp"
              tag="FANDOM"
              title="Future Upcoming Star Wars Game, Including Face Of The Old Republic"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="static-assets-upload6419670657434733820.webp"
              tag="FANDOM"
              title="Steam Controller Goes Out Of Stock After Payment Processing Issues"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="ahsokatano.webp"
              tag="FANDOM"
              title="The Best Star Wars Games Of All Time"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
          </div>
        </div>

        {/* TV SECTION */}
        <SectionHeader title="TV" bgClass="bg-[#FA005A]" colorHex="#FA005A" />
        <div className="mb-6"></div>

        <div className="max-w-[1240px] mx-auto px-4 md:px-0 mb-8">
          <PopularAvatars
            title="Popular Wiki Pages in TV"
            avatars={[
              {
                img: "grogu.webp",
                name: "The Mandalorian",
                wiki: "Star Wars Wiki",
              },
              { img: "theboys1.webp", name: "The Boys", wiki: "The Boys Wiki" },
              { img: "geralt.webp", name: "The Witcher", wiki: "Witcher Wiki" },
              { img: "zuko.webp", name: "Avatar", wiki: "Avatar Wiki" },
              { img: "starfire.webp", name: "Titans", wiki: "Titans Wiki" },
              {
                img: "spongebob.webp",
                name: "SpongeBob",
                wiki: "SpongeBob Wiki",
              },
            ]}
          />

          <h3 className="text-[17px] font-black text-[#3D0026] mb-5 tracking-tight">
            Top News Stories in tv
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StoryCard
              img="theboys1.webp"
              tag="FANDOM"
              title="House of the Dragon Season 4 Drops New Trailer and Premiere Date"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="sexeducation.webp"
              tag="FANDOM"
              title="AMC Unveils the First Full Trailer for The Vampire Lestat"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="neomatrix.webp"
              tag="FANDOM"
              title="The A-Files Reboot: Everything To Know About Chris Carter's New Pilot"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="zuko.webp"
              tag="FANDOM"
              title="Here Are The New Killers Coming to Dexter: Resurrection Season 2"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="snakeeyes.webp"
              tag="FANDOM"
              title="Titan One Bubble 2024: Which Shows Will Be Back Next Season?"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
            <StoryCard
              img="spongebob.webp"
              tag="FANDOM"
              title="Battle for Dream Island Built Its Fandom By Doing The Best of New and Old Media"
              author="RYAN PETERS"
              date="NOV 10, 2021"
            />
          </div>
        </div>
      </main>

      {/* Newsletter Footer */}
      <div className="bg-[#3D0026] relative overflow-hidden flex justify-center border-b-[6px] border-[#1A0A22]">
        <div
          className="absolute inset-0 bg-repeat bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url(${getImg("bigback.webp")})` }}
        ></div>

        <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row items-end justify-between px-6 md:px-0 relative z-10 pt-16 md:pt-20">
          <div className="md:w-[55%] text-white pb-16 md:pb-20 pr-0 md:pr-10">
            <h2 className="text-[32px] md:text-[44px] font-black mb-6 uppercase leading-[1.05] tracking-tight text-[#FFC500]">
              THE LATEST TRENDS,
              <br />
              DELIVERED STRAIGHT
              <br />
              TO YOUR INBOX.
            </h2>
            <p className="text-[15px] font-bold mb-8 text-white">
              Stay up to date on all the latest in gaming and entertainment.
            </p>

            <div className="flex flex-col w-full max-w-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-white text-white placeholder-white outline-none font-bold text-[13px] py-2 mb-6"
              />
              <div>
                <button className="bg-[#FFC500] text-[#1a0a22] font-black uppercase text-[12px] px-8 py-3 hover:bg-yellow-400 transition-colors rounded-sm tracking-widest shadow-md">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-[45%] flex justify-center md:justify-end self-end">
            <img
              src={getImg("Newsletter-Signup-Image.webp")}
              alt="Newsletter"
              className="w-full max-w-[380px] rounded-t-[32px] block"
            />
          </div>
        </div>
      </div>

      {/* Dark Footer Links */}
      <footer className="bg-[#1A0A22] text-white pt-16 pb-20 px-6 text-sm">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col">
            <img
              src={getImg("Fandom_logo_2021_lockup_1.png")}
              alt="Fandom"
              className="h-8 mb-10 object-contain self-start"
            />
            <h4 className="font-extrabold text-white uppercase mb-4 text-[11px] tracking-widest">
              EXPLORE PROPERTIES
            </h4>
            <ul className="space-y-3 text-xs font-bold text-[#FFC500] mb-10">
              <li className="cursor-pointer hover:underline transition-all">
                Fandom
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Fanatical
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                GameSpot
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Metacritic
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                TV Guide
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Honest Entertainment
              </li>
            </ul>

            <h4 className="font-extrabold text-white uppercase mb-4 text-[11px] tracking-widest">
              FOLLOW US
            </h4>
            <div className="flex space-x-4">
              <span className="cursor-pointer hover:text-[#FA005A] transition-colors">
                <FaFacebook className="w-5 h-5" />
              </span>
              <span className="cursor-pointer hover:text-[#FA005A] transition-colors">
                <FaTwitter className="w-5 h-5" />
              </span>
              <span className="cursor-pointer hover:text-[#FA005A] transition-colors">
                <FaYoutube className="w-5 h-5" />
              </span>
              <span className="cursor-pointer hover:text-[#FA005A] transition-colors">
                <FaInstagram className="w-5 h-5" />
              </span>
              <span className="cursor-pointer hover:text-[#FA005A] transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-extrabold text-white uppercase mb-4 text-[11px] tracking-widest">
              OVERVIEW
            </h4>
            <ul className="space-y-3 text-xs font-bold text-[#FFC500]">
              <li className="cursor-pointer hover:underline transition-all">
                What is Fandom?
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Essentials
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                About
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Careers
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Press
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Contact
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Terms of Use
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Privacy Policy
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Digital Services Act
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Global Sitemap
              </li>
              <li className="cursor-pointer hover:underline transition-all">
                Cookies Settings
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="mb-10">
              <h4 className="font-extrabold text-white uppercase mb-4 text-[11px] tracking-widest">
                COMMUNITY
              </h4>
              <ul className="space-y-3 text-xs font-bold text-[#FFC500]">
                <li className="cursor-pointer hover:underline transition-all">
                  Community Central
                </li>
                <li className="cursor-pointer hover:underline transition-all">
                  Support
                </li>
                <li className="cursor-pointer hover:underline transition-all">
                  Help
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-extrabold text-white uppercase mb-4 text-[11px] tracking-widest">
                ADVERTISE
              </h4>
              <ul className="space-y-3 text-xs font-bold text-[#FFC500]">
                <li className="cursor-pointer hover:underline transition-all">
                  Media Kit
                </li>
                <li className="cursor-pointer hover:underline transition-all">
                  Contact
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col max-w-[280px]">
            <h4 className="font-extrabold text-white uppercase mb-4 text-[11px] tracking-widest">
              FANDOM APPS
            </h4>
            <p className="text-[13px] font-bold text-white mb-6 leading-tight">
              Take your favorite fandoms with you and never miss a beat.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-[60px] h-[60px] bg-white rounded-xl flex items-center justify-center shrink-0 shadow">
                <FaFire className="w-8 h-8 text-[#FA005A]" />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="bg-black border border-gray-600 px-3 py-1.5 rounded flex items-center cursor-pointer hover:border-gray-400 transition-colors w-32">
                  <FaApple className="w-5 h-5 mr-2 text-white" />
                  <div className="flex flex-col">
                    <span className="text-[7px] text-gray-300 uppercase leading-none">
                      Download on the
                    </span>
                    <span className="text-[11px] font-bold leading-tight">
                      App Store
                    </span>
                  </div>
                </div>
                <div className="bg-black border border-gray-600 px-3 py-1.5 rounded flex items-center cursor-pointer hover:border-gray-400 transition-colors w-32">
                  <FaGooglePlay className="w-4 h-4 mr-2 text-white ml-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[7px] text-gray-300 uppercase leading-none">
                      GET IT ON
                    </span>
                    <span className="text-[11px] font-bold leading-tight">
                      Google Play
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
