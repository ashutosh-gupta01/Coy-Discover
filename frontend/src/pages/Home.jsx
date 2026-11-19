
import { Link } from "react-router-dom";
import { Heart, Users, MessageCircle, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">

        <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium">
          <Heart size={16} />
          Welcome to Coy
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mt-8 leading-tight">
          Find Your
          <span className="text-pink-500"> Perfect </span>
          Connection.
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto mt-6 text-lg">
          Meet new people, discover meaningful connections
          and make every moment special.
        </p>

        <Link
          to="/discover"
          className="inline-flex items-center gap-2 mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg shadow-pink-200"
        >
          Start Discovering
          <ArrowRight size={20} />
        </Link>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <Users size={35} className="mx-auto text-pink-500" />
            <h2 className="font-bold text-xl mt-4">Meet People</h2>
            <p className="text-gray-500 text-sm mt-3">
              Discover interesting people and expand your circle.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <Heart size={35} className="mx-auto text-pink-500" />
            <h2 className="font-bold text-xl mt-4">Find Matches</h2>
            <p className="text-gray-500 text-sm mt-3">
              Connect with people who share your interests.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <MessageCircle size={35} className="mx-auto text-pink-500" />
            <h2 className="font-bold text-xl mt-4">Start Conversations</h2>
            <p className="text-gray-500 text-sm mt-3">
              Build connections through meaningful conversations.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;
