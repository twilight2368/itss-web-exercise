import ImageLogo from "../../assets/logo.png";
import { NavLink } from "react-router";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export default function MainSidebar() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full pt-6 flex flex-col gap-12">
        <div className=" text-4xl text-center font-black logo ">Regress</div>
        <div className="px-3 flex flex-col gap-3 justify-start items-start ">
          <LinkItem text={"links.dashboard"} to="" end={true} />
          <LinkItem text={"links.schedule"} to="/schedule" end={false} />
          <LinkItem text={"links.target"} to="/target" end={false} />
          <LinkItem text={"links.statistics"} to="/statistics" end={false} />
          <LinkItem text={"links.nutrition"} to="/nutrition" end={false} />
        </div>
      </div>
      <div className="flex justify-center items-center mb-3">
        <img src={ImageLogo} alt="" className="h-16 aspect-square" />
      </div>
    </div>
  );
}

const LinkItem = ({ text, to, end }) => {
  const { t } = useTranslation();
  return (
    <>
      <NavLink
        to={`/home${to}`}
        end={end}
        className={({ isActive }) =>
          classNames(
            "py-3 px-3 w-full text-lg rounded-md",
            isActive
              ? "background-primary-link font-bold before:content-['🌟'] shadow shadow-blue-400"
              : " before:content-['⭐']"
          )
        }
      >
        {t(text)}
      </NavLink>
    </>
  );
};
