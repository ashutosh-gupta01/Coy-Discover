
import { useEffect, useState } from "react";
import { Heart, MapPin } from "lucide-react";

const API_URL =import.meta.env.VITE_API_URL || "http://localhost:5000/api/profiles";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/matches`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch matches");
        }

        // Backend returns populated profile inside user2Id
        const matchedProfiles = data.matches.map((match) => ({
          ...match.user2Id,
          matchId: match._id,
        }));

        setMatches(matchedProfiles);
      } catch (err) {
        setError(err.message || "Unable to load matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Your Matches
          </h1>

          <p className="mt-2 text-gray-500">
            People who liked you back.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-gray-500">Loading your matches...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <p className="font-medium text-red-500">{error}</p>
            <p className="mt-2 text-sm text-gray-500">
              Please check that your backend server is running.
            </p>
          </div>
        ) : matches.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <Heart
              size={48}
              className="mx-auto mb-4 text-pink-400"
            />

            <h2 className="text-2xl font-bold text-gray-800">
              No Matches Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Keep discovering. Your connections are waiting!
            </p>
          </div>
        ) : (
          <>
            <p className="mb-5 font-medium text-gray-600">
              {matches.length} mutual{" "}
              {matches.length === 1 ? "match" : "matches"}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((profile) => (
                <div
                  key={profile.matchId}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800">
                      {profile.name}, {profile.age}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} />
                      {profile.city}
                    </p>

                    <p className="mt-3 text-sm text-gray-600">
                      {profile.bio}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.interests?.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-2 rounded-lg bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-600">
                      <Heart size={16} fill="currentColor" />
                      It's a Match!
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Matches;
