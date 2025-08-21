import React, { useState, useEffect } from 'react';
import './Scrapdata1.css';

const Scrapdata = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call - replace with your actual API call
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        const response = await fetch('http://127.0.0.1:8000/api/news/'); // Your API endpoint
        const data = await response.json();
        
        if (data.status === 'success') {
          setArticles(data.articles);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        setError('Error loading news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 150) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="news-container">
        <div className="loader-container">
          <div className="loader">
            <div className="loader-spinner"></div>
            <p>Loading latest news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <header className="news-header">
        <h1>Latest News</h1>
        <p className="news-subtitle">Stay updated with the latest headlines</p>
        <div className="news-stats">
          <span className="article-count">{articles.length} Articles</span>
          <span className="last-updated">Last updated: {formatDate(new Date())}</span>
        </div>
      </header>

      <div className="news-grid">
        {articles.map((article, index) => (
          <article key={index} className="news-card">
            <div className="news-card-header">
              <span className="news-source">{article.source}</span>
              <span className="news-date">{formatDate(article.published_date)}</span>
            </div>
            
            <div className="news-content">
              <h2 className="news-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>
              
              <p className="news-summary">
                {truncateText(article.summary)}
              </p>
            </div>
            
            <div className="news-card-footer">
              <span className="news-category">{article.category}</span>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="read-more-btn"
              >
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Scrapdata;