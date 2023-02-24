import { Menu } from "@headlessui/react";
import { UserCircle } from "phosphor-react";
import { Fragment } from "react";
import { Button } from "ui/atoms";

interface UserProps {
  userName: string;
}

const links = [
  { href: "/settings", label: "Nastavení" },
  { href: "sign-in", label: "Přihlásit se" },
];

export const User = ({ userName }: UserProps) => {
  return (
    <Menu>
      <Menu.Button>{userName}</Menu.Button>
      <Menu.Items>
        {links.map((link) => (
          /* Use the `active` state to conditionally style the active item. */
          <Menu.Item key={link.href} as={Fragment}>
            {({ active }) => (
              <a
                href={link.href}
                className={`${
                  active ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
              >
                {link.label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
