
import {
  X,
  Heart,
  Star,
  MapPin,
  BadgeCheck,
  BriefcaseBusiness,
  Info,
} from "lucide-react";

const Profile = ({ profile, onLike, onPass, onSuperLike }) => {
  const profileImage = profile.photo || profile.image;
  const profileLocation = profile.city || profile.location;

  return (
    <div className="w-full max-w-[420px]">
      <div className="relative h-[580px] overflow-hidden rounded-3xl shadow-xl">

        <img
          src={profileImage}
          alt={profile.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Top Section */}
        <div className="absolute left-5 right-5 top-5 flex justify-between">
          <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
            Discover
          </span>

          <button className="rounded-full bg-white/20 p-2.5 text-white backdrop-blur-md">
            <Info size={20} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              {profile.name}, {profile.age}
            </h2>

            {profile.verified && (
              <BadgeCheck className="text-blue-400" size={23} />
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-200">
            <MapPin size={16} />
            {profileLocation}
            {profile.distance && ` · ${profile.distance}`}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-200">
            <BriefcaseBusiness size={16} />
            {profile.profession}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-100">
            {profile.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(profile.interests || []).map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-white/20 bg-white/20 px-3 py-1.5 text-xs backdrop-blur-md"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-7">
        <button
          onClick={onPass}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-500 shadow-lg transition hover:scale-110"
        >
          <X size={30} />
        </button>

        <button
          onClick={onSuperLike}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-500 shadow-lg transition hover:scale-110"
        >
          <Star size={23} />
        </button>

        <button
          onClick={onLike}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg transition hover:scale-110 hover:bg-pink-600"
        >
          <Heart size={30} fill="currentColor" />
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        Like someone to show your interest ❤️
      </p>
    </div>
  );
};

export default Profile;
