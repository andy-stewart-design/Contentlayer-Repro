// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
var Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: "posts/*.mdx",
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, "")
    }
  },
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false
    }
  }
}));
var rehypePrettyCodeOptions = {
  theme: "github-dark",
  tokensMap: {
    fn: "entity.name.function",
    objKey: "meta.object-literal.key"
  },
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word--highlighted"];
  }
};
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    cwd: process.cwd(),
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions]
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-GJZ37YNL.mjs.map
