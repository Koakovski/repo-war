import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./game.css";
import RepoCard from "./RepoCard";
import { FaCheckCircle, FaExchangeAlt, FaTimesCircle } from "react-icons/fa";

interface GameProps {
    repos: Repo[];
    setRepos: Dispatch<SetStateAction<Repo[]>>;
    originalRepos: Repo[];
    setShowGame: Dispatch<SetStateAction<boolean>>;
}

const Game: React.FC<GameProps> = ({ repos, setRepos, originalRepos, setShowGame }) => {
    // States:
    const [isOver, setIsOver] = useState<boolean>(false);

    const [repoOne, setRepoOne] = useState<Repo | null>(null);
    const [repoTwo, setRepoTwo] = useState<Repo | null>(null);

    const [correct, setCorrect] = useState<number>(0);
    const [wrong, setWrong] = useState<number>(0);

    // Random Repo Selection Logic:
    const randomSelect = (arr: Repo[]) => {
        // If there are less than 2 repositories, reset the list
        if (arr.length < 2) {
            setRepos(originalRepos);
            setIsOver(true);
            return;
        }

        // Select two random indexes from the array
        const generateRandom = () => Math.floor(Math.random() * arr.length);
        const randomIndexOne = generateRandom();
        let randomIndexTwo = generateRandom();
        // Make sure that both indexes are different
        while (randomIndexOne === randomIndexTwo) {
            randomIndexTwo = generateRandom();
        }

        // Select the two repositories with those indexes
        const randomRepoOne = arr[randomIndexOne];
        const randomRepoTwo = arr[randomIndexTwo];
        // Remove the two repositories from the array
        const updatedArr = arr.filter(
            (repo) => repo.id !== randomRepoOne.id && repo.id !== randomRepoTwo.id
        );

        // Set repos with the repo values
        setRepoOne(randomRepoOne);
        setRepoTwo(randomRepoTwo);

        // Update the array
        setRepos(updatedArr);
    };

    //   Set Initial Repos
    useEffect(() => {
        randomSelect(repos);
    }, []);

    //  Handlers:
    const handleChoice = (r: Repo) => {
        const chosenRepo = r.id === repoOne?.id ? repoOne : repoTwo;
        const winner =
            repoOne?.stargazers_count! > repoTwo?.stargazers_count! ? repoOne : repoTwo;

        if (chosenRepo?.id === winner?.id) {
            setCorrect((prev) => prev + 1);
        } else {
            setWrong((prev) => prev + 1);
        }
        randomSelect(repos);
    };
    return (
        <div className="game">
            {isOver && (
                <div className="score">
                    <h1 className="title">Congratulations, you did it!</h1>
                    <div className="container">
                        <p className="text">Final Score:</p>
                        <div className="result correct">
                            <p>{correct}</p>
                            <FaCheckCircle />
                        </div>
                        <div className="result wrong">
                            <p>{wrong}</p>
                            <FaTimesCircle />
                        </div>
                    </div>
                </div>
            )}
            {!isOver && (
                <>
                    {!!(repoOne && repoTwo) && (
                        <div className="repos">
                            <h1 className="title">
                                Choose the Repository with most Stars!
                            </h1>
                            <div className="container">
                                <RepoCard content={repoOne} handler={handleChoice} />

                                <div className="dashboard">
                                    <div className="result correct">
                                        <p>{correct}</p>

                                        <FaCheckCircle />
                                    </div>

                                    <FaExchangeAlt className="icon-versus" />

                                    <div className="result wrong">
                                        <p>{wrong}</p>
                                        <FaTimesCircle />
                                    </div>
                                </div>

                                <RepoCard content={repoTwo} handler={handleChoice} />
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="buttons">
                <button
                    type="submit"
                    className="button gradient alternate"
                    onClick={() => setShowGame(false)}
                >
                    {isOver ? "Play Again" : "Back"}
                </button>
                {!isOver && (
                    <button
                        type="submit"
                        className="button gradient"
                        onClick={() => randomSelect(repos)}
                    >
                        Skip
                    </button>
                )}
            </div>
        </div>
    );
};

export default Game;
