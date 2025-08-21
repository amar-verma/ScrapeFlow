```markdown
# News Aggregator Platform - ScrapeFlow

A modern news aggregation platform built with React (Vite) and Django, featuring Google authentication and real-time news scraping from multiple sources.

## 🚀 Features

- **Interactive UI**: Modern, responsive interface built with React and Vite
- **Google Authentication**: Secure login using Django-allauth
- **News Scraping**: Automated news collection from multiple websites using BeautifulSoup4
- **JWT Authentication**: Secure API communication between frontend and backend
- **Real-time Updates**: Fresh news content from various sources
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern gradients and animations
- **Axios** - HTTP client for API requests

### Backend
- **Django 4.x** - Web framework
- **Django REST Framework** - API development
- **Django-allauth** - Authentication with Google OAuth
- **BeautifulSoup4** - Web scraping
- **Pillow** - Image processing
- **PyJWT** - JSON Web Token implementation
- **django-cors-headers** - CORS handling

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Google OAuth credentials

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/amar-verma/ScrapeFlow.git
cd news-aggregator
```

### 2. Backend Setup (Django)

#### Create Virtual Environment

```bash
cd backend_data
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Requirements.txt
```txt
Django==4.2.0
djangorestframework==3.14.0
django-allauth==0.54.0
django-cors-headers==4.0.0
Pillow==9.5.0
beautifulsoup4==4.12.0
requests==2.31.0
PyJWT==2.7.0
python-decouple==3.8
```
#some libraries are not used like fastapi, uvicorn,.. ignore

#### Environment Variables

Check a `.env` file in the backend_data and frontend_view directory:

```env

# backend_data
CLIENT_ID=
CLIENT_SECRET=
GOOGLE_REDIRECT_URL=http://localhost:3000/
MAIN_URL=http://127.0.0.1:8000

# frontend_view
VITE_GOOGLE_LINK=
VITE_GOOGLELOGIN="http://127.0.0.1:8000/google/login/"
VITE_USERME="http://127.0.0.1:8000/users/me/"
VITE_BLACKLIST="http://127.0.0.1:8000/token/blacklist/"
VITE_REFRESHTOKEN="http://127.0.0.1:8000/token/refresh/"

# get the client id and secret key from google cloud -- https://cloud.google.com/
# google_link(replace) : https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=<CALLBACK_URL_YOU_SET_ON_GOOGLE>&prompt=consent&response_type=token&client_id=<YOUR CLIENT ID>&scope=openid%20email%20profile
```

#### Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

#### Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:8000`
   - `http://localhost:3000`

#### Run Django Server

```bash
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup (React + Vite)

#### Navigate to Frontend Directory

```bash
cd ../frontend_view
```

#### Install Dependencies

```bash
npm install
# or
yarn install
```

#### Environment Variables

Create a `.env` file in the frontend directory:

```env
# frontend_view
VITE_GOOGLE_LINK(replace)= https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=<CALLBACK_URL_YOU_SET_ON_GOOGLE>&prompt=consent&response_type=token&client_id=<YOUR CLIENT ID>&scope=openid%20email%20profile
```

#### Run Development Server

```bash
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000`


## 🔌 API Endpoints

### Authentication
- `POST /api/auth/google/` - Google OAuth login
- `POST /api/auth/refresh/` - Refresh JWT token
- `POST /api/auth/logout/` - Logout user

### News
- `GET /api/news/` - Get all news article

## 🚀 Deployment

### Backend Deployment

1. Update `settings.py` for production:
```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
```

2. Collect static files:
```bash
python manage.py collectstatic
```

3. Use a production server (Gunicorn):
```bash
pip install gunicorn
gunicorn news_aggregator.wsgi:application
```


## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**
   - Ensure `django-cors-headers` is properly configured
   - Check that frontend URL is in `CORS_ALLOWED_ORIGINS`

2. **Google OAuth Not Working**
   - Verify redirect URIs in Google Console
   - Check client ID and secret in `.env`

3. **News Scraping Fails**
   - Check if target websites are accessible
   - Verify BeautifulSoup selectors are up-to-date

4. **JWT Token Issues**
   - Ensure token is included in request headers
   - Check token expiration settings

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Amar Kumar Verma - [GitHub Profile](https://github.com/amar-verma)

## 🙏 Acknowledgments

- Django documentation
- React documentation
- BeautifulSoup4 documentation
- Google OAuth implementation guides

