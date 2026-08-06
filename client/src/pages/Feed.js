import React, { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/recommendations/feed/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecommendations(res.data);
      } catch (error) {
        console.error("Error fetching feed");
      }
    };

    fetchFeed();
  }, []);

  return (
    <div>
      <h2>Personalized Feed</h2>

      {recommendations.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        recommendations.map((rec) => (
          <div key={rec._id} className="book-card">
            <h3>{rec.title}</h3>
            <p>By: {rec.author}</p>
            <p>{rec.description}</p>
            <p>⭐ {rec.averageRating?.toFixed(1) || 0}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;