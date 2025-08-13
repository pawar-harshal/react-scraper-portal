News Scraper Portal
A simple app to log in with Google OAuth 2.0 and view news headlines from BBC News. Uses React with Vite for the frontend and Spring Boot for the backend.
Features

Google OAuth 2.0 login.
Scrapes news titles and details from BBC News.
Responsive card-based UI with a refresh button.

Tech Used

Frontend: React with Vite.
Backend: Spring Boot (with Jsoup for scraping).

Setup Instructions
1. Unzip the Project

Unzip the react-scraper-portal.zip file to a folder (e.g., react-scraper-portal).

2. Set Up Google OAuth

Go to Google Cloud Console.
Create a project (e.g., "News Scraper").
Go to APIs & Services > Credentials.
Create an OAuth 2.0 Client ID:
Application type: Web application
Authorized JavaScript origins: http://localhost:3000
Authorized redirect URIs: http://localhost:3000


Copy the Client ID.
Open scraper-frontend/src/App.jsx in VS Code.
Find the line with googleClientId (e.g., const googleClientId = "paste-here";) and paste your Client ID there. Save the file.

3. Set Up the Frontend

Open the scraper-frontend folder in VS Code.
Install dependencies by running this in the terminal:npm install


Start the app:npm run dev


Open http://localhost:3000 in your browser.

4. Set Up the Backend

Open the scraper folder in Spring Tool Suite (STS) or any IDE.
Check pom.xml to ensure all dependencies are there (no changes needed, just review).
Update src/main/resources/application.properties with:spring.application.name=scraper
server.port=8080
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://accounts.google.com
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=https://www.googleapis.com/oauth2/v3/certs


Run the Spring Boot app:
In STS: Right-click project > Run As > Spring Boot App.


Backend runs on http://localhost:8080.

5. How It Works

Click "Login with Google" to log in.
See news headlines in cards.
Use the refresh button to update data.

6. Troubleshooting

Login Fails: Check the Client ID in App.jsx.
No News: Ensure backend is running on http://localhost:8080.
CORS Error: Should work automatically with frontend.

7. GitHub Repository

https://github.com/your-username/react-scraper-portal(Update with your repo link after uploading.)
