import React from "react";
import { Link } from "react-router-dom";
import footer from '../../../assets/images/footer-bg.png'

const Footer = () => {
  return (
    <footer className="pt-10"
    style={{
        background: `url(${footer})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }}
    >
      <div className="footer justify-between pr-14 pl-8">
        <div>
          <span className="footer-title">Services</span>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Branding
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Design
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Marketing
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Advertisement
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            About us
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Contact
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Jobs
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Press kit
          </Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Terms of use
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Privacy policy
          </Link>
          <Link to="/" className="link link-hover font-bold text-gray-500">
            Cookie policy
          </Link>
        </div>
      </div>
      <div className="mt-10 p-6 text-center text-gray-600 font-bold text-lg">
        <p>Copyright © {new Date().getFullYear()} - All right reserved by <Link className="text-primary underline">doctors portal</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
