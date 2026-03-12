import axios from 'axios';

const PHENOTYPES_API = 'https://dev.rejuve.bio:5051/phenotypes';
const token = process.env.REACT_APP_API_TOKEN || localStorage.getItem('token');

export async function fetchPhenotypes(
  search: string,
  skip = 0,
  limit = 100,
): Promise<{ items: Record<string, any>[]; total: number }> {
  const { data } = await axios.get(PHENOTYPES_API, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: { search: search.trim(), skip, limit },
  });

  const items = data?.phenotypes ?? [];
  const total = items?.length ?? 0;

  console.log('items: ', total);

  return { items, total };
}
