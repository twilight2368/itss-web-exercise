const ColorfulBackground = ({ text }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Multiple overlapping color layers with low opacity and different blend modes */}
      <div
        className="absolute inset-0 bg-gradient-to-r 
        from-red-500/10
        via-purple-500/10 
        to-blue-500/10
        animate-gradient-x blur-xl"
      ></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="logo text-6xl font-extrabold text-black p-4 rounded-xl">
          {text}
        </h1>
      </div>
    </div>
  );
};

export default ColorfulBackground;
