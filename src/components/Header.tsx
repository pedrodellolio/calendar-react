import { useAuth } from "../hooks/useAuth";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Dropdown from "./Dropdown";
function Header() {
  const authContext = useAuth();

  return (
    <div className="bg-purple-800 h-12 mb-5 flex justify-end px-5">
      <div className="flex items-center">
        <Dropdown userName={authContext.user?.username!}/>
      </div>
    </div>
  );
}
export default Header;
