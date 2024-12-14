const ColorfulBackground = ({ text }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Multiple overlapping color layers with low opacity and different blend modes */}
      <div
        className="absolute inset-0 bg-gradient-to-r 
        from-blue-500/25
        via-pink-500/25 
        to-red-500/25
         blur-3xl "
      ></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="logo text-6xl font-extrabold text-black p-6 rounded-xl">
          {text}
        </h1>
      </div>
    </div>
  );
};

export default ColorfulBackground;
