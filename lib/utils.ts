import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NavPrimaryLinks = [
  {
    route: "/chats",
    iconLight: "/assets/icons/chat-line.svg",
    iconBlack: "/assets/icons-black/chat-line-bl.svg",
    label: "Chats",
  },
  {
    route: "/friends",
    iconLight: "/assets/icons/friends.svg",
    iconBlack: "/assets/icons-black/friends-bl.svg",
    label: "friends",
  },
  {
    route: "/calls",
    iconLight: "/assets/icons/calls.svg",
    iconBlack: "/assets/icons-black/calls-bl.svg",
    label: "Calls",
  },
];

export const NavSecondaryLinks = [
  {
    route: "/settings",
    iconLight: "/assets/icons/settings.svg",
    iconBlack: "/assets/icons-black/settings-bl.svg",
    label: "Settings",
  },
  {
    route: "/addUser",
    iconLight: "/assets/icons/user-plus.svg",
    iconBlack: "/assets/icons-black/user-plus-bl.svg",
    label: "Add User",
  },
];

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

interface FormUrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: FormUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
