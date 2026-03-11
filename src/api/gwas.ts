import axios from 'axios';

const GWAS_API = 'https://dev.rejuve.bio:5051/gwas-files';

export async function fetchGwasFiles(
  search: string,
  skip = 0,
  limit = 50,
): Promise<{ items: Record<string, unknown>[]; total: number }> {
  const { data } = await axios.get(GWAS_API, {
    params: { search: search.trim(), skip, limit },
  });
  const items = data?.items ?? [];
  const total = data?.length ?? 0;
  return { items, total };
}
