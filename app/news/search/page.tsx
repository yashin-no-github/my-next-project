import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import SearchField from "@/app/_components/SearchField";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function page({ searchParams }: Props) {
  const { contents: news } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    q: searchParams.q,
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
