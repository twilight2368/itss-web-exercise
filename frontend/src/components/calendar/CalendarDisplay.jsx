import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS, vi, ja } from "date-fns/locale"; // Import necessary locales for date-fns
import "react-big-calendar/lib/css/react-big-calendar.css";

// Language-specific translations for the calendar
const lang = {
  vi: {
    week: "Tuần",
    work_week: "Tuần làm việc",
    day: "Ngày",
    month: "Tháng",
    previous: "Trước",
    next: "Sau",
    today: "Hôm nay",
    agenda: "Lịch trình",
    showMore: (total) => `+${total} thêm`,
  },
  ja: {
    week: "週",
    work_week: "勤務週",
    day: "日",
    month: "月",
    previous: "前",
    next: "次",
    today: "今日",
    agenda: "予定表",
    showMore: (total) => `+${total} さらに`,
  },
};

export default function CalendarDisplay({ events }) {
  const { i18n } = useTranslation();

  const [culture, setCulture] = useState(i18n.language || "vi");

  useEffect(() => {
    const currentLang = i18n.language || "vi";
    setCulture(currentLang);
  }, [i18n.language]);

  const { defaultDate, messages } = useMemo(() => {
    return {
      defaultDate: new Date(),
      messages: lang[culture] || lang["vi"],
    };
  }, [culture]);

  // Localizer using date-fns
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: {
      vi,
      ja,
      enUS,
    },
  });

  return (
    <div className="h-[800px]">
      <Calendar
        events={events}
        localizer={localizer}
        culture={culture}
        defaultDate={defaultDate}
        defaultView="week"
        messages={messages}
      />
    </div>
  );
}
