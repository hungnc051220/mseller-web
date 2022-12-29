import {
  AiOutlineHome,
  AiOutlineQrcode,
  AiOutlineSetting,
} from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineEventNote } from "react-icons/md";
import { BiStore } from "react-icons/bi";

const menus = [
  {
    name: "dashboard",
    route: "/",
    icon: AiOutlineHome,
  },
  {
    name: "storeOwner",
    route: "/store-owner",
    icon: BiStore,
  },
  {
    name: "storeCode",
    route: "store-code",
    icon: AiOutlineQrcode,
  },
  {
    name: "order",
    route: "order",
    icon: MdOutlineEventNote,
  },
  {
    name: "reports",
    route: "report",
    icon: HiOutlineDocumentReport,
    children: [
      {
        name: "report.sales",
        route: "sales",
      },
      {
        name: "report.synthesis",
        route: "synthesis",
      },
    ],
  },
  {
    name: "settings",
    route: "settings",
    icon: AiOutlineSetting,
  },
];

export default menus;
