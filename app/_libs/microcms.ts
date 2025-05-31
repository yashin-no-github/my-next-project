import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

// APIからメンバー情報を取得
export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

// APIからカテゴリー情報を取得
export type Category = {
  name: string;
} & MicroCMSListContent;

// APIからニュース情報を取得
export type News = {
  title: string;
  description: string;
  content: string;
  // ↓APIスキーマでサムネイル画像が必須ではないため、?を付けて画像がない場合に対応する
  // （TypeScriptにおけるオプショナルプロパティの記法、undefinedの可能性を明示）
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// メンバーリストを取得する関数
export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Member>({
    endpoint: "members",
    queries,
  });
  return listData;
};

// ニュース一覧を取得する関数
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return listData;
};

// ニュースの詳細情報を取得する関数
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
  return detailData;
};

// カテゴリーのコンテンツを取得する関数
export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
  });
  return detailData;
};
