import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import NewsList from "./components/NewsList";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedCredential = localStorage.getItem("google_credential");
    if (storedCredential) {
      try {
        const decoded = jwtDecode(storedCredential);

        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          setUser({
            ...decoded,
            access_token: storedCredential,
          });
        } else {
          localStorage.removeItem("google_credential");
          setError("Session expired. Please sign in again.");
        }
      } catch (error) {
        console.error("Stored credential decode error:", error);
        localStorage.removeItem("google_credential");
        setError("Invalid session. Please sign in again.");
      }
    }
  }, []);


  useEffect(() => {
    if (user) {
      fetchNews();
    }
  }, [user]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/scrape/news", {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        ...decoded,
        access_token: credentialResponse.credential,
      };
      setUser(userData);
      localStorage.setItem("google_credential", credentialResponse.credential);
    } catch (error) {
      console.error("JWT decode error:", error);
      setError("Failed to process login. Please try again.");
    }
  };

  const handleLoginFailure = () => {
    setError("Login failed. Please try again.");
  };

  const handleLogout = () => {
    localStorage.removeItem("google_credential");
    setUser(null);
    setNews([]);
    setError(null);
  };

  console.log(news);

  return (
    <GoogleOAuthProvider clientId="265810879126-tbvak0qlsgped0nvd3k73v6s9fd10rii.apps.googleusercontent.com">
      <div className="App p-4 min-h-screen bg-gray-50">
        <div className="flex justify-center items-center mb-8 space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 font-medium">
                Welcome, {user.name}
              </span>
              <button
                onClick={fetchNews}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh News"}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              buttonText="Sign in with Google"
            />
          )}
        </div>

        {error && (
          <p className="text-center text-red-600 mb-6">{error}</p>
        )}

        {user ? (
          loading && news.length === 0 ? (
            <div className="text-center">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <p className="text-gray-600 mt-2">Fetching news data...</p>
            </div>
          ) : (
            <NewsList news={news} />
          )
        ) : (
          <p className="text-center text-gray-600">Please sign in to view news.</p>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;