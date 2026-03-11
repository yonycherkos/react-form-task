import axios from 'axios';

const GWAS_API = 'https://dev.rejuve.bio:5051/gwas-files';
const token = process.env.REACT_APP_API_TOKEN || localStorage.getItem('token');

export async function fetchGwasFiles(
  search: string,
  skip = 0,
  limit = 50,
): Promise<{ items: Record<string, unknown>[]; total: number }> {
  const { data } = await axios.get(GWAS_API, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: { search: search.trim(), skip, limit },
  });

  const items = data?.gwas_files ?? [];
  const total = items?.length ?? 0;

  console.log('items: ', total);

  return { items, total };
}
