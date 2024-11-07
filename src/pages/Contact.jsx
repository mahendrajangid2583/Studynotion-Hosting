import React from 'react'
import Footer from '../components/common/Footer'
import ContactDetails from '../components/core/ContactPage/ContactDetails'
import ContactUs from '../components/core/ContactPage/ContactUs'

const Contact = () => {
  return (
    <div >
        <div className=' flex lg:flex-row flex-col justify-center gap-[52px] lg:max-w-maxContent mt-20 w-11/12 mx-auto'>
            <div><ContactDetails/></div>
            <div><ContactUs/></div>
        </div>

        <div>
            Reviews from Other learners
        </div>

        <Footer/>
    </div>
  )
}

export default Contact