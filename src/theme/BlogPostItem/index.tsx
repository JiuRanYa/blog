/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import clsx from 'clsx';
import {MDXProvider} from '@mdx-js/react';
import styled from "@emotion/styled";
//@ts-ignore
import Eye from "@site/static/icons/eye.svg";
import styles from './styles.module.css';

import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import MDXComponents from '@theme/MDXComponents';
import Seo from '@theme/Seo';
import type {Props} from '@theme/BlogPostItem';
import ThemeContext from "@theme/ThemeContext";
import {usePluralForm} from '@docusaurus/theme-common';

//@ts-ignore
import { FlexWrapper } from '@site/src/components/lib'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];



// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

//@ts-ignore
function BlogPostItem(props: Props): JSX.Element {
  const readingTimePlural = useReadingTimePlural();
  const {
    children,
    frontMatter,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const {date, formattedDate, permalink, tags, readingTime} = metadata;
  const {title, image, keywords} = frontMatter;

  // date处理
  const match = date.substring(0, 10).split('-');
  const year = match[0];
  const month = parseInt(match[1], 10);
  const day = parseInt(match[2], 10);

  // 是否为黑暗主题：
  // TODO: 修改黑暗主题样式
  const theme = useContext(ThemeContext);
  // @ts-ignore
  const { isDarkTheme } = theme

  // auth信息
  // const authorURL = frontMatter.author_url || frontMatter.authorURL;
  // const authorTitle = frontMatter.author_title || frontMatter.authorTitle;
  // const authorImageURL =
    frontMatter.author_image_url || frontMatter.authorImageURL;

  // tag部分
  const renderTags = () => {
    return(
      <div>
        {(tags.length > 0 || truncated) && (
          <div className="col margin-vert--lg">
            {isBlogPostPage && (
              <div className={clsx(
                "margin-vert--md",
                isBlogPostPage ? "text--center" : '',
                "margin-vert--lg"
              )}>
                <time dateTime={date} className={styles.blogPostDate}>
                  {year}年{month}月{day}日, {' '}
                  推荐阅读时间:{readingTime && <> {Math.ceil(readingTime)}分钟</>}
                </time>
              </div>
            )}

            {tags.length > 0 && (
              <div className={clsx(
                "col",
                isBlogPostPage ? "text--center" : ''
              )}>
                {tags.map(({label, permalink: tagPermalink}) => (
                  <TagStyle>
                    <Link
                      key={tagPermalink}
                      className="margin-horiz--sm"
                      to={tagPermalink}>
                      {label}
                    </Link>
                  </TagStyle>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    )
  }


  // header
  const renderPostHeader = () => {
    const TitleHeading = isBlogPostPage ? 'h1' : 'h2';

    // TODO: 添加发布时间
    return (
      <header>
        <TitleHeading
          className={
            clsx('margin-bottom--sm',
            styles.blogPostTitle,
            isBlogPostPage ? "text--center" : ""
            )}>
          {isBlogPostPage ? title : <Link style={{textDecoration: "none", color: "black"}} to={permalink}>{title}</Link>}
        </TitleHeading>
      </header>
    );
  };

  return (
    <>
      <Seo {...{title, keywords, image}} />

      <article className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}>
        {renderPostHeader()}
        {renderTags()}
        <div className="markdown">
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </div>
        {(tags.length > 0 || truncated) && (
          <footer className="col">
            {truncated && (
              <FlexWrapper className="col" between marginTop={50}>
                <ReadMoreBtn
                  to={metadata.permalink}
                  aria-label={`Read more about ${title}`}
                >
                  {!isBlogPostPage && (<strong>阅读原文</strong>)}
                </ReadMoreBtn>

                {!isBlogPostPage && (
                  <span className="footer__read_count">
                    <Eye
                      color={isDarkTheme ? "#76baff" : "#1e81e3"}
                      style={{ verticalAlign: "middle" }}
                      className="text-right"
                    />{" "}
                  </span>
                )}
              </FlexWrapper>
            )}
          </footer>
        )}
      </article>
    </>
  );
}

const ReadMoreBtn = styled(Link)`
  /* background-color: var(--ifm-link-color);
  color: white; */
  border-radius: 8px;
  background: linear-gradient(
          90deg,
          var(--ifm-color-primary),
          var(--ifm-color-primary-dark)
  );
  color: white;
  padding: 0.75em 2em;
  margin-top: 50px;
  border-radius: 4px;
  box-shadow: 0 0 32px rgba(0,105,165,.35);
  text-decoration: none;
`

const TagStyle = styled.div`
    display: inline-block;
    text-align: center;
    padding: 1px 0;
    margin: 0 10px;
    border-radius: 6px;
    background-color: rgba(0,179,255,.09019607843137255);
    &:first-child{
        margin-left: 0;
    }
    .margin-horiz--sm{
        color: #5d89e2;
        font-size: 15px;
    }
`

export default BlogPostItem;
