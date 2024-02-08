import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import SearchIcon from './search-icon.svg';
import gameStyles from './Game.module.css';

const KEY = "";
const API_URL = `https://api.rawg.io/api/games?key=${KEY}`;

const GamePage = () => {
    const [Games, setGames] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const SearchGames = async (title) => {
        const response = await fetch(`${API_URL}&search=${title}`);
        const data = await response.json();

        setGames(data.results);
    };

    useEffect(() => {
        SearchGames('');
    }, []);

    const handleSearchInputChange = (event) => {
        const title = event.target.value;
        SearchGames(title);
    };
    const handleOrderChange = (event) => {
        setOrderBy(event.target.value);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };
    return (
        <>
            <div className={gameStyles.app}>
                <h1 className={gameStyles.title}>
                    Dive into the ultimate gaming experience with our <b><u>Game Hub</u></b> — your go-to hub for comprehensive game information and authentic player reviews. Explore, discover, and make informed choices as you navigate the gaming universe with confidence.
                </h1>
            </div>
            <div className={gameStyles.search}>
                <input
                    placeholder='Search for games'
                    onChange={handleSearchInputChange}
                />
                <img src={SearchIcon} alt="Search" onClick={handleSearchInputChange} />
                <select className={gameStyles.select} value={orderBy} onChange={handleOrderChange}>
                    <option value="name">Name</option>
                    <option value="date_added">Date Added</option>
                    <option value="date_added">Average Rating</option>
                </select>
                <div className={gameStyles.change}>
                    <label className={gameStyles.changebtn}>
                        <input 
                            type="radio"
                            value="grid"
                            checked={viewMode === 'grid'}
                            onChange={() => handleViewModeChange('grid')}
                        />
                        Grid View
                    </label>
                    <label className={gameStyles.changebtn}>
                        <input
                            type="radio"
                            value="oneByOne"
                            checked={viewMode === 'oneByOne'}
                            onChange={() => handleViewModeChange('oneByOne')}
                        />
                        One-by-One View
                    </label>
                </div>
            </div>
            {
                Games?.length > 0
                    ? (
                        <div className={gameStyles.container + (viewMode === 'oneByOne' ? ` ${gameStyles.oneByOneView}` : '')}>
                            {Games.map((game, index) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    ) : (
                        <div className={gameStyles.empty}>
                            <h2>No games found</h2>
                        </div>
                    )
            }
        </>
    );

};

export default GamePage;