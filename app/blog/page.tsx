/* eslint-disable @next/next/no-img-element */
import { cms } from "@/lib/cms";
import Link from "next/link";
import {
  PostCategory,
  PostDescription,
  PostImage,
  PostPublishedAt,
  PostTitle,
} from "@/components/blog";

// Next.js will invalidate the cache when a
// request comes in, at most once every 5 minutes.
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await cms.posts.list();
  const { data: categories } = await cms.categories.list();
  const lastPost = posts.data[posts.data.length - 1];
  const postsWithoutLast = posts.data.slice(0, -1);

  return (
    <div className="p-4 space-y-12">
      <div>
        <h1 className="md:text-3xl text-2xl font-bold mt-12">Blog</h1>
        <p className="text-slate-500 text-lg mt-2">
          Stay up to date with the latest news and updates from the team!
        </p>
      </div>
      <article className="md:flex group">
        <Link
          href={`/blog/${lastPost.slug}`}
          className="flex-1 overflow-hidden rounded-xl"
        >
          <PostImage src={lastPost.cover_image} alt={lastPost.title} />
        </Link>
        <div className="md:max-w-sm flex-1 flex flex-col gap-2 mt-4 p-6">
          <div className="flex justify-between items-center">
            {lastPost.category?.slug ? (
              <PostCategory category={lastPost.category} />
            ) : null}
            <PostPublishedAt publishedAt={lastPost.published_at} />
          </div>
          <Link
            className="space-y-3 text-center md:text-left"
            href={`/blog/${lastPost.slug}`}
          >
            <PostTitle as="h2" title={lastPost.title} size="lg" />
            <PostDescription description={lastPost.excerpt || ""} />
          </Link>
        </div>
      </article>

      <section className="flex flex-col gap-1">
        <ul className="flex gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                className="px-3 font-medium text-slate-800 hover:text-orange-600 py-2 bg-white border rounded-full"
                href={`/blog/categories/${category.slug}`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <div className="grid md:grid-cols-2 gap-12">
        {postsWithoutLast.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <img
                height="230"
                width={"300"}
                className="rounded-lg object-cover w-full max-h-[230px]"
                src={post.cover_image}
                alt={post.title}
              />
            </Link>
            <div className="mt-2">
              <div className="flex justify-between items-center">
                {post.category ? (
                  <PostCategory category={post.category} />
                ) : null}
                <PostPublishedAt publishedAt={post.published_at} />
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="md:text-2xl text-xl font-bold">{post.title}</h2>
                <PostDescription description={post.excerpt || ""} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
