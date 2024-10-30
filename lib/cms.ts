import { createZenblogClient } from "zenblog";

const accessToken = process.env.ZENBLOG_ACCESS_TOKEN;
const blogId = process.env.ZENBLOG_BLOG_ID;

if (!accessToken || !blogId) {
  throw new Error("ZENBLOG_ACCESS_TOKEN and ZENBLOG_BLOG_ID must be set");
}

export const cms = createZenblogClient({
  accessToken,
  blogId,
});
