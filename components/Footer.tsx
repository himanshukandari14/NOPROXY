"use client";

import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black rounded-lg shadow dark:bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
           
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
             No Proxy
            </span>
          </a>
          
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <p  className="hover:underline">No Proxy by Himanshu Kandari All Rights Reserved ❤️‍🔥.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
