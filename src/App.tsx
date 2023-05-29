import { useState } from "react";
import "./app.css";

const App = () => {
    const [showGame, setShowGame] = useState<boolean>(false);
    const [repos] = useState([1]);

    const handleStartClick = () => {
        setShowGame(true);
    };

    return (
        <main>
            {!showGame && (
                <>
                    <h1 className="title">Welcome to RepoWars</h1>
                    <h2 className="headline gradient text">
                        A developer-driven guessing game
                    </h2>
                    {repos.length === 0 ? (
                        <p className="loading">Loading Game...</p>
                    ) : (
                        <button
                            className="button gradient"
                            type="submit"
                            onClick={handleStartClick}
                        >
                            Start
                        </button>
                    )}
                </>
            )}
            {showGame && (
                // TODO: Create Game Component
                <>
                    <h1>Game</h1>
                </>
            )}
        </main>
    );
};

export default App;
