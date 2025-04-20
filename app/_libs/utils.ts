import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// dayjsのUTC(協定世界時)を使うプラグイン
dayjs.extend(utc);
// dayjsのタイムゾーンを考慮するためのプラグイン
dayjs.extend(timezone);

// 日付の文字列を受け取り、日本時間を考慮した表示に変換して文字列を返すformatDate関数を定義しexport
export const formatDate = (date: string) => {
  return dayjs.utc(date).tz("Asia/Tokyo").format("YYYY/MM/DD");
};
