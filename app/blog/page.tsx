/* eslint-disable @next/next/no-img-element */
import { cms } from "@/lib/cms";
import { formatDate } from "@/lib/dates";
import Link from "next/link";

function PostPublishedAt({ publishedAt }: { publishedAt: string }) {
  return (
    <time className="text-sm font-medium text-slate-500">
      {formatDate(publishedAt)}
    </time>
  );
}

function PostCategory({
  category,
}: {
  category: { slug: string; name: string };
}) {
  return (
    <Link
      href={`/blog/categories/${category.slug}`}
      className="text-orange-500 font-medium hover:underline"
    >
      {category.name}
    </Link>
  );
}

function PostDescription({ description }: { description: string }) {
  return <p className="text-slate-600 text-balance">{description}</p>;
}

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
      <article className="md:flex gap-8">
        <Link className="w-full" href={`/blog/${lastPost.slug}`}>
          <img
            loading="lazy"
            width={800}
            height={400}
            className="rounded-lg object-cover w-full max-h-[360px]"
            src={lastPost.cover_image}
            alt={lastPost.title}
          />
        </Link>
        <div className="md:max-w-xs flex flex-col gap-2 py-2">
          <div className="flex justify-between items-center">
            {lastPost.category?.slug ? (
              <PostCategory category={lastPost.category} />
            ) : null}
            <PostPublishedAt publishedAt={lastPost.published_at} />
          </div>
          <Link href={`/blog/${lastPost.slug}`}>
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-bold">{lastPost.title}</h2>
              <PostDescription description={lastPost.excerpt || ""} />
            </div>
          </Link>
        </div>
      </article>
      <hr />
      <section className="flex flex-col gap-1 items-center">
        <h2 className="text-sm font-semibold text-slate-500 tracking-wider">
          CATEGORIES
        </h2>
        <ul className="flex gap-1 justify-center">
          {categories.map((category) => (
            <li
              key={category.slug}
              className="text-xl font-medium text-slate-800 hover:text-orange-600"
            >
              <Link
                className="px-3 py-1 rounded-full hover:bg-orange-50"
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
