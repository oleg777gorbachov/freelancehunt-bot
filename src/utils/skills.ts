import api from "../api";

interface SkillI {
  id: number;
  name: string;
}

interface ProjectI {
  id: number;
  type: string;
  attributes: {
    name: string;
    description: string;
    description_html: string;
    skills: SkillI[];
    status: {
      id: number;
      name: string;
    };
    budget: null | {
      amount: number;
      currency: string;
    };
    bid_count: string;
    is_remote_job: boolean;
    is_premium: boolean;
    is_only_for_plus: boolean;
    published_at: string;
    expired_at: string;
  };
  links: {
    self: {
      api: string;
      web: string;
    };
    comments: string;
    bids: string;
  };
}

interface projectsResponse {
  data: ProjectI[];
}

interface skillsResponse {
  data: SkillI[];
}

export async function fetchSkills(): Promise<skillsResponse | null> {
  try {
    const response = await api.get<skillsResponse>(
      "https://api.freelancehunt.com/v2/skills"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Api error");
    return null;
  }
}

let items: skillsResponse | null = null;
let lastFetch: null | Date = null;

export async function skills(
  page = 1,
  counter = 10
): Promise<{ items: SkillI[]; isEnd: boolean; page: number }> {
  if ((lastFetch && lastFetch.getDate() < 3600) || lastFetch === null) {
    items = await fetchSkills();
    lastFetch = new Date();
  }

  if (!items) throw new Error("Fetch error");

  const arr = items.data.slice(page * counter, (page + 1) * counter);

  return { items: arr, isEnd: arr.length < 10, page };
}

export async function skillsFilter(filter: string) {
  if ((lastFetch && lastFetch.getDate() < 3600) || lastFetch === null) {
    items = await fetchSkills();
    lastFetch = new Date();
  }

  if (!items) throw new Error("Fetch error");

  const filtered = items.data.filter((e) =>
    e.name.toLowerCase().includes(filter.toLowerCase())
  );
  return filtered;
}

export async function getSkillById(id: number): Promise<null | SkillI> {
  if ((lastFetch && lastFetch.getDate() < 3600) || lastFetch === null) {
    items = await fetchSkills();
    lastFetch = new Date();
  }

  if (!items) throw new Error("Fetch error");

  let res: null | SkillI = null;

  items.data.forEach((e) => (e.id === id ? (res = e) : null));

  return res;
}

export async function getProjects(): Promise<projectsResponse | null> {
  try {
    const response = await api.get<projectsResponse>(
      "https://api.freelancehunt.com/v2/projects"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Api error");
    return null;
  }
}
