import {
  AiOutlineCheckCircle,
  AiOutlineCalendar,
  AiOutlineCloseCircle,
} from "react-icons/ai";

export default function NotificationItem({ type, message }) {
  let icon;
  let bgColor;
  let textColor;

  // Conditional rendering based on the "type" prop
  switch (type) {
    case "done":
      icon = <AiOutlineCheckCircle className="text-green-500 mr-3" />;
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      break;
    case "today":
      icon = <AiOutlineCalendar className="text-yellow-500  mr-3" />;
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
      break;
    case "missed":
      icon = <AiOutlineCloseCircle className="text-red-500  mr-3" />;
      bgColor = "bg-red-100";
      textColor = "text-red-700";
      break;
    default:
      icon = <AiOutlineCalendar className="text-gray-500 mr-3" />;
      bgColor = "bg-gray-100";
      textColor = "text-gray-700";
      break;
  }

  return (
    <div
      className={`w-full rounded-md shadow-md shadow-gray-300 h-16 flex items-center px-4 ${bgColor}`}
    >
      {icon}
      <span className={`text-sm ${textColor}`}>{message}</span>
    </div>
  );
}
