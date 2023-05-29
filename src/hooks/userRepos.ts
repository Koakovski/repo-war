import { useEffect, useState, Dispatch, SetStateAction } from "react";

const fetchRepositories = async (
    amount: number,
    setters: Dispatch<SetStateAction<any[]>>[]
) => {
    const response = { data: ["repo1", "repo2"] };

    setters.forEach((setter) => setter(response.data));
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
