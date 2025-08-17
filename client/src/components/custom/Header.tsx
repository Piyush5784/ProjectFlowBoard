import React from "react";

type props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText }: props) => {
  return (
    <div className=" flex w-full items-center  justify-between">
      <h1
        className={`${
          isSmallText ? "text-lg" : "text-2xl"
        } font-semibold dark:text-black`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
