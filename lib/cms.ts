import { createZenblogClient } from "zenblog";

const blogId = process.env.ZENBLOG_BLOG_ID;

if (!blogId) {
  throw new Error(
    "ZENBLOG_BLOG_ID must be set. Get it from zenblog.com and set it in the .env file."
  );
}

export const cms = createZenblogClient({
  blogId,
});
