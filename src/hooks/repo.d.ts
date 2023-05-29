interface Repo {
    id: number;
    name: string;
    description: string | null;
    full_name: string;
    forks_count: number;
    stargazers_count: number;
    topics?: string[];
    owner: {
        avatar_url: string;
    } | null;
    has_discussions?: boolean;
    has_downloads: boolean;
    has_issues: boolean;
    has_pages: boolean;
    has_projects: boolean;
    has_wiki: boolean;
}
