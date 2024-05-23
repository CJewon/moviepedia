export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 0,
}) {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/6915/film-reviews?${query}`
  );
  const body = await response.json();
  return body;
}
