import React from "react";

export default function FoodCardMini() {
  return (
    <div className="w-full p-2 shadow-sm shadow-gray-400">
      <div className="line-clamp-2 text-sm h-10 font-black">
        Lorem ipsum dolor sit amet lor
      </div>
      <div className="grid grid-cols-4 text-xs gap-0">
        <span className=" before:content-['🔵']">1000 </span>
        <span className=" before:content-['🟢']">1000</span>
        <span className=" before:content-['🟠']">1000</span>
        <span className=" before:content-['🔴']">1000</span>
      </div>
    </div>
  );
}
