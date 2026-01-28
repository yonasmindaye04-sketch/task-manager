function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-lg text-center border border-white/20">
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          Tailwind v4 Works! 🎉
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Gradient background, blur, shadow, rounded corners — all from Tailwind classes
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;