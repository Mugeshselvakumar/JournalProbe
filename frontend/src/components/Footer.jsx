import React from 'react';
import { GrGoogle } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { BiLogoGmail } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className=" bottom-0 left-0 right-0 bg-green-700 text-white">
      <div className="footer-nav py-10 bg-green-800">
        <div className="container mx-auto flex flex-wrap justify-between">
        <ul className="footer-nav-list my-5 w-full md:w-auto md:ml-20">
         
              <h2 className="nav-title text-xl font-bold">Journal Probe</h2>
              <br>
              </br>
              <li className="flex items-center my-2">
               Help Desk
              </li>
              <li className="flex items-center my-2">
                blog
              </li >
             
              <li className=" flex items-center my-2">
                Plugins
              </li>
              <li className="flex items-center my-2">
              Privacy Policy
              </li>
           
         </ul>

          <ul className="footer-nav-list my-5 w-full md:w-auto">
            <li className="footer-nav-item">
              <h2 className="nav-title text-xl font-bold">Contact</h2>
            </li>
            <br>
            </br>
            <li className="footer-nav-item flex items-center my-2">
              <div className="icon-box mr-2">
              <FaRegAddressCard />
              </div>
              <address className="content not-italic">
                Golf Rd, Arivoli Nagar, Kovaipudur, Tamil Nadu ,641042.
              </address>
            </li>
            <li className="footer-nav-item flex items-center my-2">
              <div className="icon-box mr-2">
              <GiRotaryPhone />
              </div>
              <a href="tel:+607936-8058" className="footer-nav-link">91+ 6374474731</a>
            </li>
            <li className="footer-nav-item flex items-center my-2">
              <div className="icon-box mr-2">
              <BiLogoGmail />
              </div>
              <a href="mailto:example@gmail.com" className="footer-nav-link">JournalProbe@gmail.com</a>
            </li>
          </ul>

          <ul className="footer-nav-list my-5 w-full md:w-auto md:mr-20">
            <li className="footer-nav-item">
              <h2 className="nav-title text-xl font-bold">Find Us On</h2>
            </li>
          <li className="footer-nav-item flex items-center my-2">
          <div className="footer-nav-item flex items-center my-2 mr-4">
           <GrGoogle />
           </div>
           <div className="footer-nav-item flex items-center my-2 mr-4">
           <FaFacebookF />
           </div>
           <div className="footer-nav-item flex items-center my-2 mr-4">
           <FaYoutube />
           </div>
           </li>
           <li className="footer-nav-item">
              <h2 className="nav-title text-xl font-xl">Get Connected</h2>
            </li>
            <li className="footer-nav-item flex items-center my-2">
          <div className="footer-nav-item flex items-center my-2 mr-4">
          <FaInstagram />
           </div>
           <div className="footer-nav-item flex items-center my-2 mr-4">
           <BiLogoGmail />
           </div>
           <div className="footer-nav-item flex items-center my-2 mr-4">
           <FaXTwitter />
           </div>
           </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom py-5 bg-green-900">
        <div className="container mx-auto text-center">
          <p className="copyright">
            Copyright &copy; <a href="#" className="text-white">JP</a> all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
