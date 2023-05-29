import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { githubClient } from "../api";

const randomSince = Math.floor(Math.random() * 1000000);

const fetchRepositories = async (
    amount: number,
    setters: Dispatch<SetStateAction<any[]>>[]
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

type useReposResult = [any[], Dispatch<SetStateAction<any[]>>, any[]];

const useRepos = (amount: number): useReposResult => {
    const [allRepositories, setAllRepositories] = useState<any[]>([]);
    const [repositories, setRepositories] = useState<any[]>([]);

    useEffect(() => {
        fetchRepositories(amount, [setAllRepositories, setRepositories]);
    }, []);

    return [repositories, setRepositories, allRepositories];
};

export default useRepos;
