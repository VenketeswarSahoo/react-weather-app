"use client";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";

const Api_key = "80fc6da94b003e0a3801836f8d54cda8";

const page = () => {
  const inputRef = useRef(null);
  const [apiData, setapiData] = useState(null);
  const [showWeather, setshowWeather] = useState(null);
  const [loading, setloading] = useState(false)
  const weatherType = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef
      .current.value}&units=metric&appid=${Api_key}`;
    // console.log(inputRef.current.value);
    setloading(true)
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setapiData(null);
        if(data.cod == 404 || data.cod == 400){
          setshowWeather([
            {
              type: "Not Found",
              img: "https://as2.ftcdn.net/v2/jpg/02/48/55/45/1000_F_248554561_KNXAIOQFXLHxxG1OnuNwchZDG76Q7pQH.jpg"
            }
          ])
        }
        setshowWeather(
          weatherType.filter(weather => {
            weather.type === data.weather[0].main;
          })
        );
        console.log(data);
        setapiData(data);
        setloading(false)
      })
      .catch(err => {
        console.log(err);
        setloading(false)
      });
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="rounded-md p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl font-semibold uppercase flex-1 outline-none"
          />
          <button type="submit" onClick={fetchWeather}>
            <BsSearch className="text-2xl" />
          </button>
        </div>
        <hr className="mt-4" />
        {loading ? (
        <div>loading...</div>
        ) : (
          showWeather &&
          <div className="text-center flex flex-col gap-6 mt-10">
             {apiData && <p className="text-xl font-semibold">{apiData?.name + "," + apiData?.sys?.country}</p>}
             <img src={showWeather[0]?.img} className="w-52 mx-auto"
                />
            <h3 className="text-2xl font-bold text-zinc-800">
              {showWeather[0]?.type}
            </h3>
            {apiData && <div>
              <div className="flex justify-center">
                <CiTempHigh className="text-xl" />
                <h2 className="ml-1 font-bold">{apiData?.main?.temp}</h2>
                <TbTemperatureCelsius className="text-[23px]" />
              </div>
            </div>
            }
          </div>
          )}
      </div>
    </div>
  );
};

export default page;
