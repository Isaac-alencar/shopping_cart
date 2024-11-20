import { ReactElement } from "react";

type HeaderProps = {
  pageTitle: string;
  headerLink: () => ReactElement;
};

export const Header = ({ headerLink, pageTitle }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full my-2">
      <h2 className="text-blue-800 font-bold text-xl md:text-4xl">
        {pageTitle}
      </h2>
      {headerLink()}
    </div>
  );
};
