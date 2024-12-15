import BreadcrumbMain from "../breadcrumb/BreadcrumbMain";
import ChangeLang from "../locales/ChangeLang";
import UserMenu from "../menu/UserMenu";
import NotificationPopover from "../notification/NotificationPopover";

export default function MainHeader() {
  return (
    <div className="w-full h-full flex justify-between items-center px-8 bg-white ">
      <div className="w-2/3">
        <BreadcrumbMain />
      </div>
      <div className="w-1/3 flex flex-row justify-end items-center gap-3">
        <ChangeLang />
        <NotificationPopover />
        <UserMenu />
      </div>
    </div>
  );
}
