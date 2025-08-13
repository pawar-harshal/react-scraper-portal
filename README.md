# News Scraper Portal

A simple app to log in with Google OAuth 2.0 and view news headlines from BBC News. Uses React with Vite for the frontend and Spring Boot for the backend.

## Features

- Google OAuth 2.0 login.
- Scrapes news titles and details from BBC News.
- Responsive card-based UI with a refresh button.

## Tech Used

- Frontend: React with Vite.
- Backend: Spring Boot (with Jsoup for scraping).

## Setup Instructions (Command-Line Style)

### 1. Unzip the Project

# Unzip the project zip file
unzip react-scraper-portal.zip -d react-scraper-portal
cd react-scraper-portal

# Go to Google Cloud Console
# Create a project named "News Scraper"
# Go to APIs & Services > Credentials
# Create OAuth 2.0 Client ID:
#   Application type: Web application
#   Authorized JavaScript origins: http://localhost:3000
#   Authorized redirect URIs: http://localhost:3000
# Copy the Client ID




# Open App.jsx to add your Client ID
# Edit scraper-frontend/src/App.jsx
# Replace: const googleClientId = "paste-here";
# With your Client ID and save



cd scraper-frontend
npm install
npm run dev
# Open browser at http://localhost:3000


cd ../scraper
# Check pom.xml for dependencies
# Edit application.properties
echo "
spring.application.name=scraper
server.port=8080
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://accounts.google.com
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://www.googleapis.com/oauth2/v3/certs
" > src/main/resources/application.properties



# Run Spring Boot app
# Using Maven:
mvn spring-boot:run
# OR using IDE: Right-click > Run As > Spring Boot App
# Backend runs at http://localhost:8080



# Open frontend in browser
# Click "Login with Google"
# View news headlines
# Use refresh button to update


# Login Fails: Check Client ID in App.jsx
# No News: Ensure backend is running on http://localhost:8080
# CORS Error: Should work automatically



