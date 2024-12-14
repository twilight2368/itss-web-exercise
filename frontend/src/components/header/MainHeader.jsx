import BreadcrumbMain from "../breadcrumb/BreadcrumbMain";
import ChangeLang from "../locales/ChangeLang";
import UserMenu from "../menu/UserMenu";
import NotificationPopover from "../notification/NotificationPopover";

export default function MainHeader() {
  return (
    <div className="w-full h-full flex justify-between items-center px-8 bg-white/10 backdrop-blur">
      <div className="w-2/3">
        <BreadcrumbMain />
      </div>
      <div className="w-1/3 flex flex-row justify-end items-center">
        <div>
          <ChangeLang />
        </div>
        <div className="">
          <NotificationPopover />
        </div>
        <div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
