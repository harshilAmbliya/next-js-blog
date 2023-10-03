"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function EditBlog({ params }) {
    const [filterBlog, setFilterBlog] = useState(null);

    const router = useRouter();
    const { toast } = useToast();
    const { id } = params;
    // console.log(id)

    useEffect(() => {
        try {
            const fetchBlog = async () => {
                const data = await axios.get("/api/blog");
                const blogs = await data.data;
                // console.log(blogs)

                const filterBlogData = blogs?.filter((blog) => blog.id === id);
                setFilterBlog(filterBlogData[0]);

            }
            fetchBlog()
        } catch (error) {
            console.log(error)
        }
    }, [id])


    if (!filterBlog) {
        return <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-spinner loading-md"></span>
        </div>
    }

    const handleChange = (e) => {
            setFilterBlog({
                ...filterBlog,[e.target.name]: e.target.value
            })
    };

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();
        // console.log(filterBlog);
        try {
            const response = await axios.put('/api/blog/update',{
               filterBlog
            });

            if (response.status === 200) {
                toast({
                    description: 'Blog updated successfully',
                });
                router.push(`/blog/${id}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className=" min-h-screen flex flex-col items-center justify-center py-6">

            <div className="border w-full md:w-1/2 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center">Edit Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="mb-2">
                            <Label htmlFor="image" className="text-sm font-bold ">Image :</Label>
                        </div>

                        <Input type="text"
                            id="image"
                            name='image'
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter the blog title"
                            value={filterBlog?.image}
                            onChange={handleChange}
                            required />

                    </div>

                    <div className="mb-4 w-ful">
                        <div className="mb-2">
                            <Label htmlFor="slug" className="text-sm font-bold ">Slug :</Label>
                        </div>

                        <select className="select select-bordered w-full rounded-lg dark:bg-[#020817] dark:border-[#1e293b] dark:text-white" id='slug' name='slug' onChange={handleChange} >
                            <option disabled value={filterBlog?.slug} className='p-2'>Select Slug</option>
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
                            value={filterBlog?.title}
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
                            value={filterBlog?.description}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <Button type="submit">Update Blog</Button>
                </form>
            </div>
        </div>
    );
}

export default EditBlog;

