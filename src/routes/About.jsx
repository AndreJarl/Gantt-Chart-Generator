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

function About() {
  return (
    <div className='overflow-x-hidden'>
        <div style={{
    backgroundImage: `url(${tela})`,
    imageRendering: 'crisp-edges',
  }} className='ml-72 -mt-8 pt-20  bg-cover bg-center bg-no-repeat text-white flex flex-col
                  items-center gap-10 
        '>
       <p className='text-7xl ml-28 font-bold text-center'>ABOUT US</p>
       <div className='text-center w-[800px] ml-28 flex flex-col justify-center items-center gap-10 border-black bg-white text-black border-2 py-10 px-10 mb-28 rounded-3xl '>
          <p className='font-bold'>ACSL founded on June 08, 2018</p>
          <p className='font-bold'>ACSL Corporate Giveaways and General Merchandise started as a humble sewing business in a small space in Consolacion, Cebu. With just a few machines and a big vision, we began creating customized products to meet the needs of local clients. Through hard work, quality craftsmanship, and strong client relationships, ACSL has grown into a full-fledged manufacturing facility, now operating in a much larger workspace and serving a wide range of customers across various industries. Every product is made with attention to detail, guided by our passion for quality and our commitment to customer satisfaction.</p>
       </div>
       
       </div>
             <div style={{
                backgroundImage: `url(${sewing})`,
            }} className='w-[100%] h-[600px] ml-[10em] bg-cover bg-center bg-no-repeat
        '></div>

             <div style={{
                backgroundImage: `url(${tela2})`,
            }} className='w-[100%] h-[600px] ml-[10em] bg-cover bg-center bg-no-repeat  grid grid-cols-2 justify-center items-center gap-40
        '>
            <div className='flex gap-5  flex-col justify-center items-center ml-52 bg-white  text-black w-[500px] text-center border-2 border-black px-10 py-10 rounded-3xl'>
                <p className='text-xl font-semibold'>Whether you’re a startup, a school, a large corporation, or simply someone looking for customized sewn products, we’re here to deliver high-quality items tailored to your needs. We also accommodate bulk and rush orders with flexible production schedules.</p>
                <p className='text-xl font-semibold'>At ACSL, we’re more than just a sewing shop—we’re your reliable partner in bringing creative ideas to life through well-made, meaningful products.</p>
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

            <div style={{
                backgroundImage: `url(${sewing2})`,
            }} className='w-[100%] h-[600px] ml-[10em] bg-cover bg-center bg-no-repeat flex justify-center items-center
        '>
                <div className='ml-28 bg-white border-2 border-black rounded-3xl py-12 px-16 flex flex-col gap-4'>
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