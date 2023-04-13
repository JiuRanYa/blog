/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";

import Layout from "@theme/Layout";
import BlogPostItem from "@theme/BlogPostItem";
import Link from "@docusaurus/Link";
import type { Props } from "@theme/BlogTagsPostsPage";
import Translate, { translate } from "@docusaurus/Translate";
import { ThemeClassNames, usePluralForm } from "@docusaurus/theme-common";
import { uppercaseNameFir } from "../../utils";

// Very simple pluralization: probably good enough for now
function useBlogPostsPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          id: "theme.blog.post.plurals",
          description:
            'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One post|{count} posts",
        },
        { count }
      )
    );
}
// en --> blogPostsPlural(count)
function BlogTagsPostPageTitle({
  tagName,
  count,
}: {
  tagName: string;
  count: number;
}) {
  const blogPostsPlural = useBlogPostsPlural();

  return (
    <Translate
      id="theme.blog.tagTitle"
      description="The title of the page for a blog tag"
      values={{ nPosts: count, tagName: uppercaseNameFir(tagName) }}
    >
      {'"{tagName}": {nPosts} 篇'}
    </Translate>
  );
}

//@ts-ignore
function BlogTagsPostPage(props: Props): JSX.Element {
  const { metadata, items } = props;
  const { allTagsPath, name: tagName, count } = metadata;

  return (
    <Layout
      title={`Posts tagged "${tagName}"`}
      description={`Blog | Tagged "${tagName}"`}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogTagsPostPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: "blog_tags_posts",
      }}
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col col--10">
            <h1>
              <BlogTagsPostPageTitle count={count} tagName={tagName} />
            </h1>
            <Link href={allTagsPath}>
              <Translate
                id="theme.tags.tagsPageLink"
                description="The label of the link targeting the tag list page"
              >
                {"查看所有标签"}
              </Translate>
            </Link>
            <div className="margin-vert--xl">
              {items.map(({ content: BlogPostContent }) => (
                <BlogPostItem
                  key={BlogPostContent.metadata.permalink}
                  frontMatter={BlogPostContent.frontMatter}
                  metadata={BlogPostContent.metadata}
                  truncated
                >
                  <BlogPostContent />
                </BlogPostItem>
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default BlogTagsPostPage;
