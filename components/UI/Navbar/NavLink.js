import { MdHomeFilled } from "react-icons/md";
import {
  MusicLibrary2,
  Radio,
  VideoHorizontal,
  Profile,
  LogoutCurve,
} from "iconsax-react";

export const NavLink = [
  {
    id: 1,
    path: "/",
    text: "Home",
    icon: <MdHomeFilled className="h-[32px] w-[32px]" />,
  },
  {
    id: 2,
    path: "/collections",
    text: "My Collections",
    icon: <MusicLibrary2 size="32" variant="Bold" />,
  },
  {
    id: 3,
    path: "/radio",
    text: "Radio",
    icon: <Radio size="32" variant="Bold" />,
  },
  {
    id: 4,
    path: "/musicvideos",
    text: "Music Videos",
    icon: <VideoHorizontal size="32" variant="Bold" />,
  },
  {
    id: 5,
    path: "/profile",
    text: "Profile",
    icon: <Profile size="32" variant="Bold" />,
  },

  {
    id: 6,
    path: "/logout",
    text: "Log out",
    icon: <LogoutCurve size="32" variant="Bold" />,
  },
];
