import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { Button } from "ui/atoms";

interface UserProps {
  userName: string;
}

const links = [
  { href: "/settings", label: "Nastavení" },
  { href: "sign-in", label: "Přihlásit se" },
];

//todo potrebuje to tu trosku lasky

export const User = ({ userName }: UserProps) => {
  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <div>
        <Menu.Button as={Button} color="secondary" variant="tinted">
          {userName}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-light-orange text-main-orange" : "text-black"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profil
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-light-orange text-main-orange" : "text-black"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Moje trasy
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-light-orange text-main-orange" : "text-black"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => signOut()}
                >
                  Odhlásit se
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
// export const User = ({ userName }: UserProps) => {
//   return (
//     <Menu>
//       <Menu.Button as={Button} color="secondary" variant="tinted">
//         {userName}
//       </Menu.Button>
//       <Menu.Items>
//         {links.map((link) => (
//           /* Use the `active` state to conditionally style the active item. */
//           <Menu.Item key={link.href} as={Fragment}>
//             {({ active }) => (
//               <a
//                 href={link.href}
//                 className={`${
//                   active ? "bg-blue-500 text-white" : "bg-white text-black"
//                 }`}
//               >
//                 {link.label}
//               </a>
//             )}
//           </Menu.Item>
//         ))}
//       </Menu.Items>
//     </Menu>
//   );
// };
