"use client"


import BlogPost from "@/components/BlogPost";
import axios from "axios";
import React, { useEffect, useState } from "react";

const dashboard = () => {
  const [blogs, setBlogs] = useState(null);
  const [searchBlog, setSearchBlog] = useState("");
  useEffect(() => {
    try {
      const handleFetchAllBlogs = async () => {
        const data = await axios.get("api/blog");
        const blogPosts = await data.data;
        console.log(blogPosts);
        setBlogs(blogPosts);
      };
      handleFetchAllBlogs();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filteredBlogs = blogs
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchBlog.toLowerCase())
      )
    : [];

  if (!blogs) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  const handleSerachBlog = (e) => {
    setSearchBlog(e.target.value);
  };

  return (
    <div className="container mx-auto mt-4 h-screen">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Welcome to Your Blog
        </h1>
        {/* <div className="form-control relative">
          <span className="absolute h-5 w-5 top-3 left-3 cursor-pointer">
            <BiSearchAlt className="h-full w-full" />
          </span>
          <Input
            type="text"
            placeholder="Search by title"
            className="input input-bordered w-24 md:w-auto px-10 py-1"
            value={searchBlog}
            onChange={handleSerachBlog}
          />
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.map((post) => {
          return <BlogPost key={post.id} {...post} />;
        })}
      </div>
    </div>
  );
};

export default dashboard;
