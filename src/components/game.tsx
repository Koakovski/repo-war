import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface GameProps {
    repos: Repo[];
    setRepos: Dispatch<SetStateAction<Repo[]>>;
    originalRepos: Repo[];
    setShowGame: Dispatch<SetStateAction<boolean>>;
}

const Game: React.FC<GameProps> = ({ originalRepos, setShowGame }) => {
    const [isOver, setIsOver] = useState<boolean>(false);

    const [repoOne, setRepoOne] = useState<Repo | null>(null);
    const [repoTwo, setRepoTwo] = useState<Repo | null>(null);

    useEffect(() => {
        setRepoOne(originalRepos[0]);
        setRepoTwo(originalRepos[1]);
    }, []);

    return (
        <div className="game">
            {isOver && <div className="score"></div>}
            {!isOver && (
                <>
                    {!!(repoOne && repoTwo) && (
                        <div className="repos">
                            <h1 className="title">
                                Choose the Repository with most Stars!
                            </h1>
                            <div className="container">
                                <div>
                                    <h1>
                                        {repoOne.name} - {repoOne.full_name}
                                    </h1>
                                </div>
                                <div className="dashboard">Versus</div>
                                <div>
                                    <h1>
                                        {repoTwo.name} - {repoTwo.full_name}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            <div className="buttons">
                <button
                    type="submit"
                    className="button gradient"
                    onClick={() => setShowGame(false)}
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="button gradient"
                    onClick={() => setShowGame(false)}
                >
                    Skip
                </button>
            </div>
        </div>
    );
};

export default Game;
