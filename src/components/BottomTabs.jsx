import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { MdOutlineEventNote } from 'react-icons/md';
import { Link, useLocation } from "react-router-dom";
import { classNames } from "../utils/common";

const BottomTabs = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 w-full border-t border-gray-200 bg-white py-6">
        <div className="flex items-center justify-center gap-10">
          <Link to="/" className="flex flex-col items-center justify-center gap-2 cursor-pointer">
            <AiOutlineHome size={32} className={classNames(location.pathname === "/" && "text-primary")}/>
            <p className={classNames(location.pathname === "/" && "text-primary", "font-medium text-xl")}>Trang chủ</p>
          </Link>
          <Link to="/orders" className="flex flex-col items-center justify-center gap-2 cursor-pointer">
            <MdOutlineEventNote size={32} className={classNames((location.pathname === "/orders" || location.pathname === "/order-detail") && "text-primary")}/>
           <p className={classNames((location.pathname === "/orders" || location.pathname === "/order-detail") && "text-primary", "font-medium text-xl")}>Đơn bàn</p>
          </Link>
          <Link to="/waiting" className="flex flex-col items-center justify-center gap-2 cursor-pointer">
            <BiCategory size={32} className={classNames(location.pathname === "/waiting" && "text-primary")}/>
           <p className={classNames(location.pathname === "/waiting" && "text-primary", "font-medium text-xl")}>Món đang chờ</p>
          </Link>
          {/* <Link to="/profile" className="flex flex-col items-center justify-center gap-2 cursor-pointer">
            <AiOutlineUser size={32} className={classNames(location.pathname === "/profile" && "text-primary")}/>
           <p className={classNames(location.pathname === "/profile" && "text-primary", "font-medium text-xl")}>Cá nhân</p>
          </Link> */}
        </div>
      </div>
  )
}

export default BottomTabs