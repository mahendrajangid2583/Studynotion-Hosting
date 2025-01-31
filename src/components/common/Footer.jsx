import React from 'react'
import { FooterLink2 } from '../../data/footer-links';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png'

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];


const Footer = () => {
  return (
    <div className=' bg-richblack-800'>
        
        <div className='w-11/12 max-w-[1200px] mx-auto  text-richblack-400 text-[14px] font-[400] border-b py-10 '>
             {/*Upper section  */}
            <div className='flex lg:flex-row flex-col gap-7 max-w-maxContent mx-auto justify-between pb-8 border-b border-richblack-700'>
               {/* left section */}
              <div className=' lg:w-[50%] max-w-maxContent flex flex-row justify-between'>
                <div className=' w-[30%] flex flex-col gap-[12px]'>
                  <img src={Logo} className=' w-[150px] '/>
                  <h1 className=' text-[16px] font-[600] text-richblack-100'>Company</h1>
                  <div className=' flex flex-col gap-[8px]'>
                    {
                        ["About", "Careers", "Affiliates"].map((ele,i)=>{
                            return ( 
                                <div key={i} className=''>
                                    <Link to={"/signup"}>{ele}</Link>
                                </div>
                            )
                        })
                    }
                  </div>
                  {/* icon */}
                  <div className=' flex flex-row gap-3'>
                    <FaFacebook size={"23px"}/>
                    <FaGoogle size={"23px"}/>
                    <FaTwitter size={"23px"}/>
                    <FaYoutube size={"23px"}/>
                  </div>
                </div>

                <div className='w-[30%] flex flex-col gap-[36px]'>
                    
                    <div className=' flex flex-col gap-[12px]'>
                        <h1 className=' text-[16px] font-[600] text-richblack-100'>Resources</h1>
                        <div className=' flex flex-col gap-[8px]'>
                            {
                                Resources.map((ele,i)=>{
                                    return (
                                        <div key={i}>
                                        {ele}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className=' flex flex-col gap-[12px]'>
                        <h2 className=' text-[16px] font-[600] text-richblack-100'>Support</h2>
                        <Link to={"/support"}>Help Centre</Link>
                        </div>

                </div>

                <div className='w-[30%] flex flex-col gap-[36px]'>
                    <div className=' flex flex-col gap-[12px]'>
                        <h1 className=' text-[16px] font-[600] text-richblack-100'>Plans</h1>
                        <div className='flex flex-col gap-[8px]'>
                            {
                                Plans.map((ele,i)=>{
                                    return (
                                        <div key={i}>
                                            {ele}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className=' flex flex-col gap-[12px]'>
                        <h1 className=' text-[16px] font-[600] text-richblack-100'>Community</h1>
                        <div className=' flex flex-col gap-[8px]'>
                            {Community.map((ele,i)=>{
                                return (<div key={i}>{ele}</div>)
                            })}
                        </div>
                    </div>

                </div>
              </div>

              <div className=' lg:border-l border-b lg:mx-4  border-richblack-700'></div>

              {/* right section */}
              <div className=' lg:w-[50%] max-w-maxContent flex flex-row justify-between'>
                {
                  FooterLink2.map((element1,index)=>{
                    return ( 
                      <div key={index} className='w-[30%] flex flex-col'>
                        <div className=' text-[16px] font-[600] text-richblack-100'>{element1.title}</div>
                        <div className=' flex flex-col gap-[8px]'>
                          {
                            element1.links.map((element2,index)=>{
                              return ( 
                                <Link key={index} to={element2.link}>
                                  {element2.title}
                                </Link>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            {/* lower section */}
            <div className=' flex lg:flex-row flex-col justify-between mt-7 gap-2 '>
                <div className=' flex flex-row gap-3 lg:mx-0 mx-auto'>
                    {
                        BottomFooter.map((ele,i)=>{
                            return (
                                <div key={i} className=' flex flex-row'>
                                   {ele}
                                   {
                                    BottomFooter.length-1 === i ?
                                        (<div></div>):
                                        (<div className='border-r border-richblack-600 my-1 ml-3'></div>)
                                   }
                                </div>
                            )
                        })
                    }
                </div>
                <div className=' flex  items-center gap-1 lg:mx-0 mx-auto'>
                  Made by <FaHeart color='red'/>  Mahendra © 2023 Studynotion
                </div>
            </div>

          </div>
    </div>
  )
}

export default Footer;
