import { useAuth } from "../hooks/useAuth";
import { UserCircleIcon } from "@heroicons/react/24/solid";
function Header() {
  const authContext = useAuth();

  return (
    <div className="bg-purple-800 h-12 mb-5 flex justify-end px-5">
      <div className="flex items-center">
        <span className="text-white text-sm px-3">{authContext.user?.username}</span>
        <UserCircleIcon className="h-8 w-8 text-white"/>
      </div>
    </div>
  );
}
export default Header;
