import React from 'react'
import tela from '../assets/tela.png'
import tela2 from '../assets/tela2.png'
import tote from '../assets/tote.png'
import sewing from '../assets/sewing.png'
import sewing2 from '../assets/sewing2.png'
import jersey from '../assets/jersey.png'
import uni1 from '../assets/uni1.png'
import uni2 from '../assets/uni2.png'
import { IoIosCall } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import bg from "../assets/bg.png"
import logo from "../assets/logo.png"
function About() {
  return (
    <div className='overflow-x-hidden'>
        <div style={{
    backgroundImage: `url(${bg})`,
    imageRendering: 'crisp-edges',
  }} className='ml-72 -mt-2 pt-20 h-[550px]  bg-cover bg-center bg-no-repeat text-white flex flex-col
                  items-center gap-10 
        '>
       <p id='about-p' className='text-7xl ml-24 font-bold text-center'>ACSL GIVEAWAYS AND GENERAL MERCHANDISE</p>
        <p className='text-center w-[500px]'>We’re dedicated to quality, sustainability, and on-time delivery. Whether for business giveaways or daily use, we bring your ideas to life with care and craftsmanship.</p>
       
       </div>
             <div className='w-[100%] h-[500px] ml-[10em] mx-9 flex items-center  bg-cover bg-center bg-no-repeat
        '>
                <img className='ml-28' width={400} src={logo} alt="" srcset="" />
                <div className='flex flex-col gap-10 w-[500px] '>
                <p>Founded in 2016, ACSL Corporate Giveaways and General Merchandise started as a humble sewing business in a small space in Consolacion, Cebu. With just a few machines and a big vision, we began creating customized products to meet the needs of local clients. </p>
                <p>Through hard work, quality craftsmanship, and strong client relationships, ACSL has grown into a full-fledged manufacturing facility, now operating in a much larger workspace and serving a wide range of customers across various industries. </p>
               <p>Every product is made with attention to detail, guided by our passion for quality and our commitment to customer satisfaction.</p>
       </div>
        </div>


             <div className='w-[100%] h-[600px] ml-[10em] bg-cover bg-center bg-no-repeat bg-black  grid grid-cols-2 justify-center items-center gap-40
        '>
            <div className='flex gap-5  flex-col justify-center items-center ml-52 bg-white  text-black w-[500px] text-center border-2 border-black px-10 py-10 rounded-3xl'>
                <p className='text-lg font-normal'>Whether you’re a startup, a school, a large corporation, or simply someone looking for customized sewn products, we’re here to deliver high-quality items tailored to your needs. We also accommodate bulk and rush orders with flexible production schedules.</p>
                <p className='text-lg font-normal'>At ACSL, we’re more than just a sewing shop—we’re your reliable partner in bringing creative ideas to life through well-made, meaningful products.</p>
            </div>
            <div className='flex flex-col gap-10'>
                  <p className='text-3xl text-white font-bold '>WHAT WE OFFER:</p>
                  <div className='flex flex-col justify-center ml-10 '>
                  <div className='flex gap-5 text-white'>
                       <div>
                          <img width={150} src={tote} alt="" srcset="" />
                          <p>TOTE BAG</p>
                       </div>
                        <div>
                          <img width={160} src={jersey} alt="" srcset="" />
                          <p>JERSEYS</p>
                       </div>
                  </div>
                    <div className='flex items-center gap-5 -ml-11 text-white'>
                       <div>
                          <img width={200} src={uni1} alt="" srcset="" />
                          <p>SCHOOL UNIFORMS</p>
                       </div>
                        <div>
                          <img width={200} src={uni2} alt="" srcset="" />
                       </div>
                  </div>
                  </div>
            </div>
        </div>

            <div className='w-[100%] h-[600px] ml-[10em] bg-cover bg-gray-900 bg-center bg-no-repeat flex justify-center items-center
        '>
                <div className='ml-28 bg-white border-2 border-black w-[600px] rounded-3xl py-12 px-16 flex flex-col gap-4'>
                    <p className='text-4xl font-bold'>Contact Info</p>
                    <p className='text-xl font-semibold flex gap-2 items-center'><IoIosCall/>09175876644</p>
                    <p className='text-xl font-semibold flex gap-2 items-center'><FaFacebookSquare/>Charlita S. Luar</p>
                    <p className='text-xl font-semibold flex gap-2 items-center'><MdLocationPin/>9WJQ+36Q, Cebu City, Cebu</p>
                </div>
        </div>
    </div>
  )
}

export default About