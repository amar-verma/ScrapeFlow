from django.shortcuts import render
import os
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import UserSerializer
from rest_framework.response import Response
import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import time
import random
from datetime import datetime, timedelta
from urllib.parse import urljoin, urlparse
import re

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = os.getenv("GOOGLE_REDIRECT_URL")
    client_class = OAuth2Client

class UserMe(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
# Create your views here.


class NewsAggregator:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def safe_text(self, element):
        return element.get_text(strip=True) if element else ""

    def safe_attr(self, element, attr, default=""):
        return element.get(attr, default) if element else default

    def clean_url(self, url, base_url):
        if url.startswith('http'):
            return url
        return urljoin(base_url, url)

    def extract_date(self, date_text):
        """Extract and normalize date from various formats"""
        if not date_text:
            return datetime.now().isoformat()
        
        try:
            # Handle relative dates
            date_text = date_text.lower().strip()
            now = datetime.now()
            
            if 'ago' in date_text:
                if 'hour' in date_text:
                    hours = int(re.findall(r'\d+', date_text)[0]) if re.findall(r'\d+', date_text) else 1
                    return (now - timedelta(hours=hours)).isoformat()
                elif 'minute' in date_text:
                    minutes = int(re.findall(r'\d+', date_text)[0]) if re.findall(r'\d+', date_text) else 1
                    return (now - timedelta(minutes=minutes)).isoformat()
                elif 'day' in date_text:
                    days = int(re.findall(r'\d+', date_text)[0]) if re.findall(r'\d+', date_text) else 1
                    return (now - timedelta(days=days)).isoformat()
            
            return now.isoformat()
        except:
            return datetime.now().isoformat()

    def scrape_times_of_india(self, category="home"):
        """Scrape Times of India"""
        try:
            url = f"https://timesofindia.indiatimes.com/{category}"
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = []
            
            # Main articles
            for article in soup.select('.content .list5 li, .content .list9 li, .M21lurb'):
                title_elem = article.select_one('a[href*="/articleshow/"]')
                if not title_elem:
                    continue
                    
                title = self.safe_text(title_elem)
                link = self.clean_url(self.safe_attr(title_elem, 'href'), 'https://timesofindia.indiatimes.com')
                
                # Try to get summary
                summary_elem = article.select_one('p, .synopsis')
                summary = self.safe_text(summary_elem)
                
                # Try to get date
                date_elem = article.select_one('.time, .date')
                published_date = self.extract_date(self.safe_text(date_elem))
                
                if title and link:
                    articles.append({
                        'source': 'Times of India',
                        'title': title,
                        'summary': summary,
                        'url': link,
                        'published_date': published_date,
                        'category': category
                    })
            
            return articles[:10]  # Limit to 10 articles
            
        except Exception as e:
            print(f"TOI Error: {e}")
            return []

    def scrape_hindustan_times(self):
        """Scrape Hindustan Times"""
        try:
            url = "https://www.hindustantimes.com/latest-news"
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = []
            
            for article in soup.select('.story-box, .cartHolder, .listView'):
                title_elem = article.select_one('h2 a, h3 a, .hdg3 a')
                if not title_elem:
                    continue
                    
                title = self.safe_text(title_elem)
                link = self.clean_url(self.safe_attr(title_elem, 'href'), 'https://www.hindustantimes.com')
                
                summary_elem = article.select_one('p, .ancdesc')
                summary = self.safe_text(summary_elem)
                
                date_elem = article.select_one('.dateTime, .updated')
                published_date = self.extract_date(self.safe_text(date_elem))
                
                if title and link:
                    articles.append({
                        'source': 'Hindustan Times',
                        'title': title,
                        'summary': summary,
                        'url': link,
                        'published_date': published_date,
                        'category': 'latest'
                    })
            
            return articles[:10]
            
        except Exception as e:
            print(f"HT Error: {e}")
            return []

    def scrape_indian_express(self):
        """Scrape Indian Express"""
        try:
            url = "https://indianexpress.com/latest-news/"
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = []
            
            for article in soup.select('.articles, .story-list .snaps'):
                title_elem = article.select_one('h2 a, h3 a, .title a')
                if not title_elem:
                    continue
                    
                title = self.safe_text(title_elem)
                link = self.clean_url(self.safe_attr(title_elem, 'href'), 'https://indianexpress.com')
                
                summary_elem = article.select_one('p, .synopsis')
                summary = self.safe_text(summary_elem)
                
                date_elem = article.select_one('.date, .posted-by')
                published_date = self.extract_date(self.safe_text(date_elem))
                
                if title and link:
                    articles.append({
                        'source': 'Indian Express',
                        'title': title,
                        'summary': summary,
                        'url': link,
                        'published_date': published_date,
                        'category': 'latest'
                    })
            
            return articles[:10]
            
        except Exception as e:
            print(f"IE Error: {e}")
            return []

    def scrape_ndtv(self):
        """Scrape NDTV"""
        try:
            url = "https://www.ndtv.com/latest"
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = []
            
            for article in soup.select('.news_Itm, .story-list li'):
                title_elem = article.select_one('h2 a, h3 a, .newsHdng a')
                if not title_elem:
                    continue
                    
                title = self.safe_text(title_elem)
                link = self.clean_url(self.safe_attr(title_elem, 'href'), 'https://www.ndtv.com')
                
                summary_elem = article.select_one('p, .newsCont')
                summary = self.safe_text(summary_elem)
                
                date_elem = article.select_one('.posted-by, .time')
                published_date = self.extract_date(self.safe_text(date_elem))
                
                if title and link:
                    articles.append({
                        'source': 'NDTV',
                        'title': title,
                        'summary': summary,
                        'url': link,
                        'published_date': published_date,
                        'category': 'latest'
                    })
            
            return articles[:10]
            
        except Exception as e:
            print(f"NDTV Error: {e}")
            return []

    def scrape_cnn(self):
        """Scrape CNN International"""
        try:
            url = "https://edition.cnn.com/"
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = []
            
            for article in soup.select('.card, .cd'):
                title_elem = article.select_one('h3 a, .cd__headline a')
                if not title_elem:
                    continue
                    
                title = self.safe_text(title_elem)
                link = self.clean_url(self.safe_attr(title_elem, 'href'), 'https://edition.cnn.com')
                
                summary_elem = article.select_one('.cd__description, p')
                summary = self.safe_text(summary_elem)
                
                if title and link:
                    articles.append({
                        'source': 'CNN',
                        'title': title,
                        'summary': summary,
                        'url': link,
                        'published_date': datetime.now().isoformat(),
                        'category': 'international'
                    })
            
            return articles[:8]
            
        except Exception as e:
            print(f"CNN Error: {e}")
            return []

    def scrape_bbc(self):
        """Scrape BBC News"""
        try:
            url = "https://www.bbc.com/news"
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = []
            
            for article in soup.select('[data-testid="card-headline"], .gs-c-promo'):
                title_elem = article.select_one('a, h3 a')
                if not title_elem:
                    continue
                    
                title = self.safe_text(title_elem)
                link = self.clean_url(self.safe_attr(title_elem, 'href'), 'https://www.bbc.com')
                
                summary_elem = article.select_one('p, .gs-c-promo-summary')
                summary = self.safe_text(summary_elem)
                
                if title and link and '/news/' in link:
                    articles.append({
                        'source': 'BBC',
                        'title': title,
                        'summary': summary,
                        'url': link,
                        'published_date': datetime.now().isoformat(),
                        'category': 'international'
                    })
            
            return articles[:8]
            
        except Exception as e:
            print(f"BBC Error: {e}")
            return []

    def scrape_reuters(self):
        """Scrape Reuters"""
        try:
            url = "https://www.reuters.com/world/"
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = []
            
            for article in soup.select('[data-testid="ArticleCard"], .story-card'):
                title_elem = article.select_one('a[data-testid="Headline"], h3 a')
                if not title_elem:
                    continue
                    
                title = self.safe_text(title_elem)
                link = self.clean_url(self.safe_attr(title_elem, 'href'), 'https://www.reuters.com')
                
                summary_elem = article.select_one('[data-testid="Body"], p')
                summary = self.safe_text(summary_elem)
                
                if title and link:
                    articles.append({
                        'source': 'Reuters',
                        'title': title,
                        'summary': summary,
                        'url': link,
                        'published_date': datetime.now().isoformat(),
                        'category': 'international'
                    })
            
            return articles[:8]
            
        except Exception as e:
            print(f"Reuters Error: {e}")
            return []

    def aggregate_all_news(self, categories=['latest', 'sports', 'business', 'tech']):
        """Aggregate news from all sources"""
        all_articles = []
        
        print("Starting news aggregation...")
        
        # Indian sources
        sources = [
            ('TOI', self.scrape_times_of_india),
            ('HT', self.scrape_hindustan_times),
            ('IE', self.scrape_indian_express),
            ('NDTV', self.scrape_ndtv),
            ('CNN', self.scrape_cnn),
            ('BBC', self.scrape_bbc),
            ('Reuters', self.scrape_reuters)
        ]
        
        for source_name, scraper_func in sources:
            try:
                print(f"Scraping {source_name}...")
                articles = scraper_func()
                all_articles.extend(articles)
                print(f"✅ {source_name}: {len(articles)} articles")
                
                # Add delay between sources
                time.sleep(random.uniform(1, 2))
                
            except Exception as e:
                print(f"❌ {source_name} failed: {e}")
                continue
        
        # Remove duplicates based on title similarity
        unique_articles = []
        seen_titles = set()
        
        for article in all_articles:
            title_key = article['title'][:50].lower()  # First 50 chars for similarity
            if title_key not in seen_titles:
                seen_titles.add(title_key)
                unique_articles.append(article)
        
        # Sort by recency (most recent first)
        unique_articles.sort(key=lambda x: x['published_date'], reverse=True)
        
        return unique_articles

# Django Views
@csrf_exempt
def get_aggregated_news(request):
    """Django view to get aggregated news"""
    category = request.GET.get('category', 'latest')
    limit = int(request.GET.get('limit', 50))
    
    aggregator = NewsAggregator()
    
    try:
        articles = aggregator.aggregate_all_news()
        
        # Filter by category if specified
        if category != 'all':
            articles = [a for a in articles if category.lower() in a.get('category', '').lower()]
        
        # Limit results
        articles = articles[:limit]
        
        return JsonResponse({
            'status': 'success',
            'category': category,
            'total_articles': len(articles),
            'articles': articles,
            'last_updated': datetime.now().isoformat()
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e),
            'articles': []
        })

# Standalone function for direct use
def get_latest_news(limit=50):
    """Get latest news without Django"""
    aggregator = NewsAggregator()
    articles = aggregator.aggregate_all_news()
    
    return {
        'status': 'success',
        'total_articles': len(articles),
        'articles': articles[:limit],
        'last_updated': datetime.now().isoformat()
    }

# Test function
if __name__ == "__main__":
    print("Testing News Aggregator...")
    result = get_latest_news(20)
    print(f"✅ Found {result['total_articles']} articles")
    
    for i, article in enumerate(result['articles'][:5]):
        print(f"\n{i+1}. [{article['source']}] {article['title']}")
        print(f"   URL: {article['url']}")
        if article['summary']:
            print(f"   Summary: {article['summary'][:100]}...")