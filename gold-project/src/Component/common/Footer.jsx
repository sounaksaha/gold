import React from "react";
import logoImage from "./logo.png"
import { Link } from "react-router-dom";
export default function Footer() {
  return (
  //   <div className="bg-gray-800">
  //   <div className="max-w-2xl mx-auto text-white py-6">
  //     <div className="text-center">
  //       {/* Replace h3 with img */}
  //       <img
  //         className="mx-auto h-20 w-25 "
  //         src={logoImage} 
  //         alt="Gurukrupa Jewelers"
  //       />
  //       <p> SINCE 1935 </p>
  //       <div className="flex justify-center my-10"></div>
  //     </div>
  //     <div className="mt-5 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
  //       <p className="order-2 md:order-1 mt-4 md:mt-0">
  //         &copy; Incipient Technologies, 2024.
  //       </p>
  //       <div className="order-1 md:order-2">
  //         <Link  to="/dashboard" className="px-2">Dashboard</Link>
          
  //       </div>
  //     </div>
  //   </div>
  // </div>



<footer class="bg-white shadow-sm dark:bg-gray-900 w-full">
    <div class="max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li><a href="#" class="hover:underline me-4 md:me-6">About</a></li>
                <li><a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a></li>
                <li><a href="#" class="hover:underline me-4 md:me-6">Licensing</a></li>
                <li><a href="#" class="hover:underline">Contact</a></li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
    </div>
</footer>




  
  );
}
