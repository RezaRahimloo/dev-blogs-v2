import PostCard from '@/components/common/PostCard';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';
import { useState } from 'react';

interface Props { }
const posts = [
    {
        title: "this is my post",
        slug: "this-is-my-post",
        content: "<p>this is body</p>",
        meta: "this is meta",
        tags: ["javascript"],
        thumbnail: "https://res.cloudinary.com/dsyzyj6x0/image/upload/v1693025364/dev-blogs/cr2xbmunhuwyng1sleqz.jpg",
        createdAt: "2023-08-26T04:49:24.530+00:00"
    },
    {
        title: "this is my post",
        slug: "this-is-my-post",
        content: "<p>this is body</p>",
        meta: "this is meta",
        tags: ["javascript"],
        thumbnail: "https://res.cloudinary.com/dsyzyj6x0/image/upload/v1693025364/dev-blogs/cr2xbmunhuwyng1sleqz.jpg",
        createdAt: "2023-08-26T04:49:24.530+00:00"
    },
    {
        title: "this is my post",
        slug: "this-is-my-post",
        content: "<p>this is body</p>",
        meta: "this is meta",
        tags: ["javascript"],
        thumbnail: "https://res.cloudinary.com/dsyzyj6x0/image/upload/v1693025364/dev-blogs/cr2xbmunhuwyng1sleqz.jpg",
        createdAt: "2023-08-26T04:49:24.530+00:00"
    },
    {
        title: "this is my post",
        slug: "this-is-my-post",
        content: "<p>this is body</p>",
        meta: "this is meta",
        tags: ["javascript"],
        thumbnail: "https://res.cloudinary.com/dsyzyj6x0/image/upload/v1693025364/dev-blogs/cr2xbmunhuwyng1sleqz.jpg",
        createdAt: "2023-08-26T04:49:24.530+00:00"
    },
    {
        title: "this is my post",
        slug: "this-is-my-post",
        content: "<p>this is body</p>",
        meta: "this is meta",
        tags: ["javascript"],
        thumbnail: "https://res.cloudinary.com/dsyzyj6x0/image/upload/v1693025364/dev-blogs/cr2xbmunhuwyng1sleqz.jpg",
        createdAt: "2023-08-26T04:49:24.530+00:00"
    },
    {
        title: "this is my post",
        slug: "this-is-my-post",
        content: "<p>this is body</p>",
        meta: "this is meta",
        tags: ["javascript"],
        thumbnail: "https://res.cloudinary.com/dsyzyj6x0/image/upload/v1693025364/dev-blogs/cr2xbmunhuwyng1sleqz.jpg",
        createdAt: "2023-08-26T04:49:24.530+00:00"
    },
    {
        title: "this is my post",
        slug: "this-is-my-post",
        content: "<p>this is body</p>",
        meta: "this is meta",
        tags: ["javascript"],
        thumbnail: "https://res.cloudinary.com/dsyzyj6x0/image/upload/v1693025364/dev-blogs/cr2xbmunhuwyng1sleqz.jpg",
        createdAt: "2023-08-26T04:49:24.530+00:00"
    },

]

const Posts: NextPage<Props> = () => {
    const [postsToRender, setPostsToRender] = useState(posts);
    return (
        <AdminLayout>
            <div className='max-w-4xl mx-auto p-3'>
                <div className="grid grid-cols-3 gap-4">
                {postsToRender.map((post) => {
                    return <PostCard post={post}/>
                })}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Posts;