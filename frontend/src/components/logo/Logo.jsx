import LogoImage from "../../assets/logo.png";
import { useNavigate } from "react-router";
export default function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className="h-full flex flex-row items-center justify-center gap-6 hover:cursor-pointer"
      onClick={() => {
        navigate("/");
      }}
    >
      <img src={LogoImage} alt="" className="h-full aspect-square" />
      <div className=" text-2xl font-black logo">Smart Exercise Plan</div>
    </div>
  );
}
