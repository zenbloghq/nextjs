/* eslint-disable @next/next/no-img-element */
import { cms } from "@/lib/cms";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: post } = await cms.posts.get({ slug: params.slug });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="prose mx-auto">
      <img
        height="300"
        width="300"
        className="rounded-lg object-cover w-full max-h-[300px] mt-8"
        src={post.cover_image}
        alt={post.title}
      />
      <h1 className="mt-8">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
    </div>
  );
}
