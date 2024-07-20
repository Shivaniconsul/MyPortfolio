import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection } from 'firebase/firestore';
import { db, getImageUrl } from '../../firebase';

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'shivani_portfolio'));
                const data = querySnapshot.docs.map(doc => doc.data());
                
                // Fetch URLs for all images
                const updatedPortfolio = await Promise.all(
                    data.map(async (item) => {
                        if (item.cover) {
                            const url = await getImageUrl(item.cover);
                            return { ...item, cover: url };
                        }
                        return item;
                    })
                );

                setPortfolio(updatedPortfolio);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, []);

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {portfolio.length ? (
                    portfolio.map((port, idx) => (
                        <div className="image-box" key={idx}>
                            <img 
                                src={port.cover} // URL of the image
                                className="portfolio-image" 
                                alt={port.title} 
                            />
                            <div className="content">
                                <p className="title">{port.title}</p>
                                <h4 className="description">{port.description}</h4>
                                <button
                                    className="btn"
                                    onClick={() => window.open(port.url, "_blank")}
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No portfolio items found.</p>
                )}
            </div>
        );
    };

    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>
                {loading ? <Loader type="pacman" /> : (error ? <p>Error: {error}</p> : renderPortfolio(portfolio))}
            </div>
        </>
    );
}

export default Portfolio;
