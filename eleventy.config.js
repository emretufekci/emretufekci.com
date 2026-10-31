import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import site from "./src/_data/site.js";

export const CATEGORIES = {
  startup: "Startup",
  rtc: "RTC",
  engineering: "Engineering",
  personal: "Personal",
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Drafts render with `npm start` but never reach the production build.
  eleventyConfig.addPreprocessor("drafts", "md", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addGlobalData("categories", CATEGORIES);
  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readingTime", (html = "") => {
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 220))} min read`;
  });
  eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));
  eleventyConfig.addFilter("byCategory", (posts, cat) => posts.filter((p) => p.data.category === cat));
  eleventyConfig.addFilter("absolute", (path) => new URL(path, site.url).href);
  eleventyConfig.addFilter("encode", (s) => encodeURIComponent(s));
  // Accepts a full YouTube URL or a bare video id.
  eleventyConfig.addFilter("youtubeId", (v) => {
    const m = String(v).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : v;
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 0 },
    metadata: {
      language: "en",
      title: `${site.name} — Blog`,
      subtitle: site.description,
      base: site.url,
      author: { name: site.name, email: site.email },
    },
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
