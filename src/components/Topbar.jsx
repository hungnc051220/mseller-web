import { Avatar } from "antd";
import { IoNotificationsOutline } from 'react-icons/io5';
import { useSelector } from "react-redux";

const Topbar = () => {
    const { company } = useSelector(state => state.auth.user);
  return (
    <div className="w-full bg-primary p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Avatar size="large" />
        <div>
        <p className="font-medium text-white">{company?.companyName}</p>
        <p className="text-white text-sm">{company?.address}</p>
        </div>
      </div>
      <IoNotificationsOutline size={24} color="white"/>
    </div>
  );
};

export default Topbar;
