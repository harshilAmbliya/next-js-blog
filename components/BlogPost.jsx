"use client"

import React, { useState } from "react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {BsWhatsapp} from "react-icons/bs"
import {LiaCopy} from "react-icons/lia"

const BlogPost = ({ id, title, description, slug }) => {
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${slug}&id=${id}&description=${description}`);
  };


  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // You can also provide user feedback here, e.g., a toast notification
    alert("URL copied to clipboard!");
  };
  return (
    <div className="py-3">
      {/* <div className="p-4 bg-white rounded-2xl ">
                <h2 className="text-xl first-letter:text-2xl font-semibold">{title}</h2>
                <p className='p-2'>{description}</p>
                <h4 className="p-1">{slug}</h4>
            </div> */}
      <Link href={`/blog/${id}`} className="h-[10rem]">
        <Card
          className="max-w-xl w-full py-4 h-full relative"
          onMouseEnter={() => setShowShareDropdown(true)}
          onMouseLeave={() => setShowShareDropdown(false)}
        >
          <CardHeader>
            <CardTitle>{title.slice(0, 25)}</CardTitle>
            <CardDescription>{`${description.slice(
              0,
              250
            )}...`}</CardDescription>
          </CardHeader>
          <CardContent>
            {showShareDropdown && (
              <div className="absolute bottom-2 right-3 z-10">
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white  p-2  hover:bg-green-600 rounded-full"
                    onClick={shareOnWhatsApp}
                  >
                     <BsWhatsapp />
                  </button>
                  <button
                    className="bg-gray-500 text-white  p-2  hover:bg-gray-600 rounded-full"
                    onClick={copyToClipboard}
                  >
                    <LiaCopy />
                  </button>
                  {/* You can add more share options here */}
                </div>
              </div>
            )}
            <div className="absolute top-2 right-3">
              <div className="">
                {/* <span className="indicator-item indicator-top indicator-end badge bg-gray-800  text-white p-2">{slug}</span> */}
                <Badge variant="outline" className="">
                  {slug}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default BlogPost;
