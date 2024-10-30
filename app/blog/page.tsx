/* eslint-disable @next/next/no-img-element */
import { cms } from "@/lib/cms";
import Link from "next/link";

export default async function BlogPage() {
  let posts;
  try {
    posts = await cms.posts.list();
  } catch (error) {
    console.error(error);
  }

  if (!posts) {
    return <div>Error trying to fetch posts.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold my-8">Blog</h1>
      <div className="grid grid-cols-2 gap-8">
        {posts.data.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <img
              height="230"
              width={"300"}
              className="rounded-lg object-cover w-full max-h-[230px]"
              src={post.cover_image}
              alt={post.title}
            />
            <h2 className="text-2xl font-bold my-2">{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
