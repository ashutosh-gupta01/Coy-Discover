
import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, X, HeartHandshake, RotateCcw } from "lucide-react";
import Profile from "../components/Profile";

const API_URL =import.meta.env.VITE_API_URL || "http://localhost:5000/api/profiles";

function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startX = useRef(null);
  const dragXRef = useRef(0);
  const feedbackTimer = useRef(null);
  const submittingRef = useRef(false);

  // Fetch profiles from MongoDB through the backend API
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/feed`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load profiles");
      }

      setProfiles(data.profiles);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Backend se connection nahi ho pa raha. Please check your server."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();

    return () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, [fetchProfiles]);

  const currentProfile = profiles[0];

  // Show Like / Pass feedback
  const showFeedback = (type, name) => {
    setLastAction({ type, name });

    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current);
    }

    feedbackTimer.current = setTimeout(() => {
      setLastAction(null);
    }, 1800);
  };

  // Send swipe action to backend
  const submitSwipe = async (action) => {
    if (!currentProfile || submittingRef.current) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/swipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: currentProfile._id,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to process swipe");
      }

      showFeedback(action, currentProfile.name);

      // Remove swiped profile from the current feed
      setProfiles((prev) =>
        prev.filter((profile) => profile._id !== currentProfile._id)
      );

      setDragX(0);
      dragXRef.current = 0;

      // Show match popup only for mutual likes
      if (data.isMatch && data.profile) {
        setMatchedProfile(data.profile);
      }
    } catch (err) {
      setError(err.message);
      setDragX(0);
      dragXRef.current = 0;
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleLike = () => submitSwipe("like");
  const handlePass = () => submitSwipe("pass");

  // Super Like currently works as a normal Like
  const handleSuperLike = () => submitSwipe("like");

  // Drag gesture handlers
  const handlePointerDown = (e) => {
    if (submittingRef.current || e.target.closest("button")) return;

    startX.current = e.clientX;
    dragXRef.current = 0;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (startX.current === null || submittingRef.current) return;

    const distance = e.clientX - startX.current;

    dragXRef.current = distance;
    setDragX(distance);
  };

  const handlePointerUp = () => {
    if (startX.current === null) return;

    const distance = dragXRef.current;

    startX.current = null;
    setIsDragging(false);

    if (distance > 100) {
      handleLike();
    } else if (distance < -100) {
      handlePass();
    } else {
      setDragX(0);
      dragXRef.current = 0;
    }
  };

  const handlePointerCancel = () => {
    startX.current = null;
    setIsDragging(false);
    setDragX(0);
    dragXRef.current = 0;
  };

  const closeMatchPopup = () => {
    setMatchedProfile(null);
  };

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Discover People
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Find someone who shares your interests.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[450px] flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500" />
            <p className="mt-4 text-sm text-gray-500">
              Finding people for you...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
            <p className="font-semibold text-red-500">{error}</p>
            <button
              onClick={fetchProfiles}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Profile Card */}
        {!loading && !error && currentProfile && (
          <div className="flex flex-col items-center">

            <div
              className={`relative w-full max-w-[420px] ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              style={{
                touchAction: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              {/* Swipe Labels */}
              {dragX > 35 && (
                <div className="pointer-events-none absolute left-5 top-8 z-20 rotate-[-15deg] rounded-lg border-4 border-green-400 px-4 py-2 text-2xl font-bold text-green-400">
                  LIKE
                </div>
              )}

              {dragX < -35 && (
                <div className="pointer-events-none absolute right-5 top-8 z-20 rotate-[15deg] rounded-lg border-4 border-red-400 px-4 py-2 text-2xl font-bold text-red-400">
                  PASS
                </div>
              )}

              <div
                className="transition-transform duration-200 ease-out"
                style={{
                  transform: `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`,
                  transition: isDragging ? "none" : "transform 0.3s ease",
                }}
              >
                <Profile
                  profile={currentProfile}
                  onLike={handleLike}
                  onPass={handlePass}
                  onSuperLike={handleSuperLike}
                />
              </div>
            </div>

            {/* Swipe Feedback */}
            {lastAction && (
              <div
                className={`mt-5 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm ${lastAction.type === "like"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-gray-100 text-gray-600"
                  }`}
              >
                {lastAction.type === "like" ? (
                  <Heart size={18} fill="currentColor" />
                ) : (
                  <X size={18} />
                )}

                {lastAction.type === "like"
                  ? `You liked ${lastAction.name}`
                  : `You passed ${lastAction.name}`}
              </div>
            )}

            {isSubmitting && (
              <p className="mt-3 text-xs text-gray-400">
                Saving your choice...
              </p>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && !currentProfile && (
          <div className="mx-auto flex min-h-[450px] max-w-md flex-col items-center justify-center rounded-3xl bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-pink-100">
              <HeartHandshake size={38} className="text-pink-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              You've seen everyone!
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              There are no more profiles to discover right now. Come back later
              to meet new people.
            </p>

            <button
              onClick={fetchProfiles}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              <RotateCcw size={17} />
              Discover Again
            </button>
          </div>
        )}
      </div>

      {/* Match Popup */}
      {matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-7 text-center shadow-2xl">

            <button
              onClick={closeMatchPopup}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={22} />
            </button>

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
              <Heart size={32} fill="currentColor" className="text-pink-500" />
            </div>

            <h2 className="text-3xl font-bold text-pink-500">
              It's a Match!
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You and {matchedProfile.name} liked each other.
            </p>

            <div className="mx-auto my-6 h-36 w-36 overflow-hidden rounded-full border-4 border-pink-200 shadow-lg">
              <img
                src={matchedProfile.photo || matchedProfile.image}
                alt={matchedProfile.name}
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              {matchedProfile.name}, {matchedProfile.age}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {matchedProfile.city || matchedProfile.location}
            </p>

            <button
              onClick={closeMatchPopup}
              className="mt-7 w-full rounded-full bg-pink-500 py-3 font-semibold text-white transition hover:bg-pink-600"
            >
              Continue Discovering
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Discover;
