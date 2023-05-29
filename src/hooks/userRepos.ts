import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { githubClient } from "../api";

const randomSince = Math.floor(Math.random() * 1000000);

const fetchRepositories = async (
    amount: number,
    setters: Dispatch<SetStateAction<Repo[]>>[]
) => {
    const res = await githubClient.request("GET /search/repositories", {
        q: `is:public stars:>1000 fork:false`,
        sort: "stars",
        order: "desc",
        per_page: amount,
        since: randomSince,
        page: 1,
    });
    setters.forEach((setter) => setter(res.data.items));
};

type useReposReturnType = [Repo[], Dispatch<SetStateAction<Repo[]>>, Repo[]];

const useRepos = (amount: number): useReposReturnType => {
    const [allRepositories, setAllRepositories] = useState<Repo[]>([]);
    const [repositories, setRepositories] = useState<Repo[]>([]);

    useEffect(() => {
        fetchRepositories(amount, [setAllRepositories, setRepositories]);
    }, []);

    return [repositories, setRepositories, allRepositories];
};

export default useRepos;
