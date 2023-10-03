"use client"


import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

function    CreateBlog() {
    const router = useRouter();
    const { toast } = useToast();
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        slug: '',
        image: ''
    })

    const handleChange = (e) => {
        // console.log(e.target.name)
        if (e.target.name === 'slug') {
            // Handle the slug value separately
            setBlog({
                ...blog,
                slug: e.target.value,
            });
        } else {
            // Handle other input fields
            setBlog({
                ...blog,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(blog)
        const post = await axios.post("/api/blog/create", blog)
        if (post.status === 201) {
            toast({
                description: 'Blog created successfully'
            })
            router.push("/blog");
            router.refresh();
        }
        setBlog({
            title: '',
            description: '',
            slug: '',
            image: ''
        })
    };

    return (
        <div className=" min-h-screen flex flex-col items-center justify-center py-6">
            <div className=" w-full md:2/3 lg:w-1/2 md:py-16 md:px-20 p-5 rounded-lg shadow-lg md:border border-0">
                <h2 className="text-2xl font-semibold mb-6 text-center">Create a New Blog </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="mb-2">
                            <Label htmlFor="image" className="text-sm font-bold ">Image :</Label>
                        </div>
                        {/* <input
                            type="text"
                            id="image"
                            name='image'
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter the blog title"
                            value={blog.image}
                            onChange={handleChange}
                            required
                        /> */}
                        <Input type="text"
                            id="image"
                            name='image'
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter the blog title"
                            value={blog.image}
                            onChange={handleChange}
                            required />

                    </div>

                    <div className="mb-4 w-ful">
                        <div className="mb-2">
                            <Label htmlFor="slug" className="text-sm font-bold ">Slug :</Label>
                        </div>

                        {/* <Select onChange={(value) => setBlog({ ...blog, slug: value })} >
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder="Select Slug" />
                            </SelectTrigger>
                            <SelectContent   >
                                <SelectItem value="light" >AI</SelectItem>
                                <SelectItem value="dark" >Webframeworks</SelectItem>

                            </SelectContent>
                        </Select> */}
                        <select className="select select-bordered w-full rounded-lg dark:bg-[#020817] dark:border-[#1e293b] dark:text-white" id='slug' name='slug' onChange={handleChange} >
                            <option disabled value={blog.slug} className='p-2'>Select Slug</option>
                            <option className='p-2' value={'AI'} >AI</option>
                            <option className='p-2' value='Webframeworks'>Webframeworks</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <div className="mb-2">
                            <Label htmlFor="title" className="text-sm font-bold ">Title :</Label>
                        </div>
                        <Input
                            type="text"
                            id="title"
                            name='title'
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter the blog title"
                            value={blog.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <div className="mb-2">
                            <Label htmlFor="content" className="text-sm font-bold ">Content :</Label>
                        </div>

                        <Textarea
                            id="content"
                            name='description'
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-40"
                            placeholder="Write your blog content here"
                            value={blog.description}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <Button type="submit" className=''>
                        Create Blog
                    </Button>

                </form>
            </div>
        </div>
    );
}

export default CreateBlog;
