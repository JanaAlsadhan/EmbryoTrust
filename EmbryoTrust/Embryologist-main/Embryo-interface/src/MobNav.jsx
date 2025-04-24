import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import logo from "../src/assets/logo.png";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const MobNav = ({ setisOpen }) => {
 
    const links = [
        
        
            "about us",
            "Our Features",
            "Contact Us",
            <Link to='/login'>Log In</Link>
    ]

    

    return (
        <div className='block lg:hidden'>

            <div className='fixed inset-0 bg-[white] px-[20px] py-[20px]'>
                <div className='relative h-full'>
                <div className="bg-[#480CBF]/20 h-[700px] blur-[200px] w-[700px] rounded-full absolute z-0 left-28 top-0  "></div>
                    <div className='flex relative z-10 justify-between items-center'>
                   <Link to="/"><div className="flex justify-center items-center gap-2">
          <img className="w-[200px]" src={logo} alt="" />
         
          
        </div>
        </Link>

                        <XMarkIcon
                            onClick={() => setisOpen(false)} className='w-[35px] text-[#480CBF]'
                        />
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className='lg:pt-[90px] relative z-10'
                    >
                        <div className='mt-[89px] justify-center items-center flex flex-col gap-[36px]'>
                            {links.map((item, i) => {


                                let x = item
                                {/* if (x === 'Staking') {
                                    x = 'buy'
                                }
                                if (x === 'About') {
                                    x = 'about'
                                }
                                if (x === 'RoadMap') {
                                    x = 'road'
                                } */}
                                return <motion.a
                                    key={i}
                                    className={'text-center  bg-[#480CBF] w-full max-w-[400px] h-[35px]  font-normal leading-7 font-inter text-[20px] hover:scale-105 duration-300  text-white rounded-lg'}
                                    viewport={{ once: true }}
                                    href={`#${x}`}
                                    onClick={() => setisOpen(false)}
                                >
                                    {item}
                                </motion.a>
                            })}

                        </div>
                    </motion.div>


                    
                </div>
            </div>

        </div>

    )
}

export default MobNav