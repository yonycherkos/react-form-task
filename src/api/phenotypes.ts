import axios from 'axios';

const PHENOTYPES_API = 'https://dev.rejuve.bio:5051/phenotypes';

export async function fetchPhenotypes(
  search: string,
  skip = 0,
  limit = 100,
): Promise<{ items: Record<string, unknown>[]; total: number }> {
  const { data } = await axios.get(PHENOTYPES_API, {
    params: { search: search.trim(), skip, limit },
  });
  const items = data?.items ?? [];
  const total = data?.total ?? items.length;
  return { items, total };
}
