import {
  PostImage,
  PostItem,
  PostPublishedAt,
  PostTitle,
} from "@/components/blog";
import { cms } from "@/lib/cms";
import Link from "next/link";

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { data: posts } = await cms.posts.list({
    limit: 50,
    offset: 0,
    category: params.slug,
  });

  const firstPost = posts[0];

  if (!firstPost) {
    return (
      <div className="text-center text-2xl flex-col tracking-tighter min-h-[80vh] flex items-center justify-center font-mono">
        <h1>😅 No posts in this category yet</h1>
        <Link className="underline mt-2 text-lg" href="/blog">
          Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold py-12 text-center">
          {firstPost.category?.name}
        </h1>
      </header>
      <div className="grid md:grid-cols-2 gap-12">
        {posts.map((post) => (
          <PostItem className="group" key={post.slug} slug={post.slug}>
            <PostImage src={post.cover_image} alt={post.title} />
            <PostTitle title={post.title} as="h2" />
            <PostPublishedAt publishedAt={post.published_at} />
          </PostItem>
        ))}
      </div>
    </div>
  );
}
