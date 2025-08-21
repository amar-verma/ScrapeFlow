import React, { useState, useEffect } from 'react';
import { ChevronDown, Database, TrendingUp, Shield, Zap, Globe, BarChart3, Search, Clock, Star, ArrowRight, CheckCircle, Play } from 'lucide-react';
import './escraper.css';

const EcommerceScraper = ({loginWithGoogle}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    websites: 0,
    dataPoints: 0,
    accuracy: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumbers(prev => ({
        websites: prev.websites < 500 ? prev.websites + 5 : 500,
        dataPoints: prev.dataPoints < 10000000 ? prev.dataPoints + 100000 : 10000000,
        accuracy: prev.accuracy < 99 ? prev.accuracy + 1 : 99
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Database className="icon-w-8 icon-blue" />,
      title: "Multi-Source Data Collection",
      description: "Scrape data from hundreds of ecommerce platforms simultaneously including Amazon, eBay, Shopify, and more."
    },
    {
      icon: <Zap className="icon-w-8 icon-yellow" />,
      title: "Real-Time Processing",
      description: "Get instant access to fresh data with our lightning-fast React frontend and Django backend architecture."
    },
    {
      icon: <Shield className="icon-w-8 icon-green" />,
      title: "Anti-Bot Protection",
      description: "Advanced techniques to bypass detection systems while maintaining ethical scraping practices."
    },
    {
      icon: <BarChart3 className="icon-w-8 icon-purple" />,
      title: "Smart Analytics",
      description: "Built-in analytics to track price trends, inventory levels, and market insights automatically."
    }
  ];

  const useCases = [
    {
      title: "Price Monitoring",
      description: "Track competitor prices across multiple platforms to optimize your pricing strategy.",
      icon: <TrendingUp className="icon-w-12 icon-blue" />
    },
    {
      title: "Market Research",
      description: "Analyze product trends, customer reviews, and market demand patterns.",
      icon: <Search className="icon-w-12 icon-green" />
    },
    {
      title: "Inventory Management",
      description: "Monitor stock levels and availability across different suppliers and platforms.",
      icon: <Database className="icon-w-12 icon-purple" />
    },
    {
      title: "Brand Monitoring",
      description: "Track your brand presence and unauthorized sellers across the web.",
      icon: <Shield className="icon-w-12 icon-red" />
    }
  ];

  const techStack = [
    { name: "React", description: "Modern, responsive frontend with hooks and context API", color: "tech-badge-blue" },
    { name: "Django", description: "Robust Python backend with REST API endpoints", color: "tech-badge-green" },
    { name: "BeautifulSoup", description: "HTML parsing and data extraction library", color: "tech-badge-yellow" },
    { name: "Selenium", description: "Browser automation for dynamic content scraping", color: "tech-badge-purple" },
    { name: "PostgreSQL", description: "Scalable database for storing scraped data", color: "tech-badge-indigo" },
    { name: "Redis", description: "Caching and queue management for better performance", color: "tech-badge-red" }
  ];

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="nav-flex">
            <div className="nav-logo">
              <Globe className="icon-w-8 icon-blue-light" />
              <span className="nav-logo-text">ScrapeFlow</span>
            </div>
            <div className="nav-links">
              <button className="nav-button" onClick={loginWithGoogle}>
                Sign Up / Sign in
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div>
            <span className="hero-badge">
              Powered by React + Django
            </span>
            <h1 className="hero-title">
              Advanced Ecommerce
              <span className="hero-gradient-text"> Data Scraping</span>
            </h1>
            <p className="hero-description">
              Extract, analyze, and monitor product data from hundreds of ecommerce platforms with our cutting-edge scraping technology. Real-time insights for smarter business decisions.
            </p>
          </div>

          <div className="hero-buttons">
            <button className="hero-button-primary" onClick={loginWithGoogle}>
              <Play className="icon-w-5 mr-2" />
              Start Scraping Now free
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stats-number">{animatedNumbers.websites}+</div>
              <div className="stats-label">Supported Websites</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">{(animatedNumbers.dataPoints / 1000000).toFixed(1)}M+</div>
              <div className="stats-label">Data Points Extracted</div>
            </div>
            <div className="stats-card">
              <div className="stats-number">{animatedNumbers.accuracy}%</div>
              <div className="stats-label">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Web Scraping Section */}
      <section className="section section-alt">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Web Scraping for Ecommerce?</h2>
            <p className="section-description">
              In today's competitive market, data is your competitive advantage. Here's why businesses rely on web scraping.
            </p>
          </div>

          <div className="why-scraping-grid">
            <div className="why-scraping-content">
              <div className="why-scraping-item">
                <div className="why-scraping-icon why-scraping-icon-blue">
                  <TrendingUp className="icon-w-6 icon-blue-light" />
                </div>
                <div>
                  <h3 className="why-scraping-item-title">Competitive Intelligence</h3>
                  <p className="why-scraping-item-description">Monitor competitor pricing, product launches, and market strategies in real-time to stay ahead.</p>
                </div>
              </div>
              <div className="why-scraping-item">
                <div className="why-scraping-icon why-scraping-icon-green">
                  <Database className="icon-w-6 icon-green-light" />
                </div>
                <div>
                  <h3 className="why-scraping-item-title">Market Research at Scale</h3>
                  <p className="why-scraping-item-description">Collect massive datasets from multiple sources to identify trends and opportunities.</p>
                </div>
              </div>
              <div className="why-scraping-item">
                <div className="why-scraping-icon why-scraping-icon-purple">
                  <Clock className="icon-w-6 icon-purple-light" />
                </div>
                <div>
                  <h3 className="why-scraping-item-title">Automated Data Collection</h3>
                  <p className="why-scraping-item-description">Replace manual research with automated systems that work 24/7 to keep your data fresh.</p>
                </div>
              </div>
            </div>
            <div className="impact-card">
              <h3 className="impact-title">Real-World Impact</h3>
              <div className="impact-metrics">
                <div className="impact-metric">
                  <span className="impact-metric-label">Revenue Increase</span>
                  <span className="impact-metric-value impact-metric-green">+35%</span>
                </div>
                <div className="impact-metric">
                  <span className="impact-metric-label">Time Saved Weekly</span>
                  <span className="impact-metric-value impact-metric-blue">40+ hours</span>
                </div>
                <div className="impact-metric">
                  <span className="impact-metric-label">Data Accuracy</span>
                  <span className="impact-metric-value impact-metric-purple">99.2%</span>
                </div>
                <div className="impact-metric">
                  <span className="impact-metric-label">Market Coverage</span>
                  <span className="impact-metric-value impact-metric-yellow">500+ sites</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-description">Everything you need for professional ecommerce data extraction</p>
          </div>
          
          <div className="grid-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section section-alt">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Perfect for Every Business Need</h2>
            <p className="section-description">From startups to enterprises, our scraping solution adapts to your requirements</p>
          </div>

          <div className="grid-2">
            {useCases.map((useCase, index) => (
              <div key={index} className="use-case-card">
                <div className="use-case-content">
                  <div className="use-case-icon">
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className="use-case-title">{useCase.title}</h3>
                    <p className="use-case-description">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="technology" className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Built with Modern Technology</h2>
            <p className="section-description">Our robust tech stack ensures reliability, scalability, and performance</p>
          </div>

          <div className="grid-3">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-header">
                  <h3 className="tech-name">{tech.name}</h3>
                  <span className={`tech-badge ${tech.color}`}>
                    Active
                  </span>
                </div>
                <p className="tech-description">{tech.description}</p>
              </div>
            ))}
          </div>

          <div className="architecture-card">
            <h3 className="architecture-title">Architecture Overview</h3>
            <div className="architecture-grid">
              <div className="architecture-item">
                <div className="architecture-icon architecture-icon-blue">
                  <Globe className="icon-w-8 icon-blue-light" />
                </div>
                <h4 className="architecture-item-title">React Frontend</h4>
                <p className="architecture-item-description">Interactive dashboard for monitoring and controlling scraping operations</p>
              </div>
              <div className="architecture-item">
                <div className="architecture-icon architecture-icon-green">
                  <Database className="icon-w-8 icon-green-light" />
                </div>
                <h4 className="architecture-item-title">Django Backend</h4>
                <p className="architecture-item-description">Robust API handling scraping logic, data processing, and storage</p>
              </div>
              <div className="architecture-item">
                <div className="architecture-icon architecture-icon-purple">
                  <Shield className="icon-w-8 icon-purple-light" />
                </div>
                <h4 className="architecture-item-title">Smart Scrapers</h4>
                <p className="architecture-item-description">Advanced scraping engines with anti-detection and data validation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section-alt">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">Simple steps to get your ecommerce data flowing</p>
          </div>

          <div className="steps-grid">
            {[
              { step: "1", title: "Configure Sources", description: "Select target websites and specify data fields you want to extract" },
              { step: "2", title: "Set Parameters", description: "Define scraping frequency, filters, and data processing rules" },
              { step: "3", title: "Start Scraping", description: "Our system begins collecting data automatically with smart scheduling" },
              { step: "4", title: "Access Data", description: "View, analyze, and export your data through our intuitive dashboard" }
            ].map((item, index) => (
              <div key={index} className="step-item">
                <div className="step-number">
                  {item.step}
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-description">{item.description}</p>
                {index < 3 && (
                  <div className="step-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="cta-container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Transform Your Data Strategy?</h2>
            <p className="cta-description">
              Join thousands of businesses already using ScrapeFlow to gain competitive advantages through data-driven insights.
            </p>
          
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle className="cta-feature-icon" />
                No Credit Card Required
              </div>
              <div className="cta-feature">
                <CheckCircle className="cta-feature-icon" />
                14-Day Free Trial
              </div>
              <div className="cta-feature">
                <CheckCircle className="cta-feature-icon" />
                Cancel Anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <Globe className="icon-w-6 icon-blue-light" />
              <span className="footer-logo-text">ScrapeFlow</span>
            </div>
            <div className="footer-copyright">
              © 2024 ScrapeFlow. All rights reserved. Built with React & Django.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceScraper;