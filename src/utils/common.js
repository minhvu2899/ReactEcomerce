export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
export function formatDateAndHour(date) {
  const d = new Date(date);
  let day = d.getDate();
  day = day < 10 ? "0" + day : day;
  let month = d.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let hour = d.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  let mis = d.getMinutes();
  mis = mis < 10 ? "0" + mis : mis;
  return d.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + mis;
}
export function formatDate(date) {
  const d = new Date(date);
  return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}
export function formatDate1(date) {
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  return date.getFullYear() + "-" + month + "-" + day;
}
export function formatDateToDay(date) {
  const d = new Date(date);
  return `${d.getDate()}`;
}
export function convertUSD(price) {
  return Number.parseFloat(price / 22740).toFixed(2);
}
export function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g, "<");
  htmlStr = htmlStr.replace(/&gt;/g, ">");
  htmlStr = htmlStr.replace(/&quot;/g, '"');
  htmlStr = htmlStr.replace(/&#39;/g, "'");
  htmlStr = htmlStr.replace(/&amp;/g, "&");
  return htmlStr;
}
