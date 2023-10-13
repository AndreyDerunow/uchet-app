import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getUsersIsLogedIn } from "../../redux/users";
import NavProfile from "./navProfile";
import history from "../../utils/history";
import { useAppSelector } from "../../redux/createStore";

const NavBar = () => {
    const [active, setActive] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const isLogedIn = useAppSelector(getUsersIsLogedIn());
    const ANCHORS = isLogedIn
        ? ["/", "/operations", "", "profile"]
        : ["/", "", "/login"];
    useEffect(() => {
        const activeLink = ANCHORS.findIndex((a) => {
            if (a !== "/") {
                if (
                    a === "/users" &&
                    history.location.pathname.includes("profile")
                ) {
                    return false;
                }
                return a && history.location.pathname.includes(a);
            } else {
                return a && history.location.pathname.endsWith(a);
            }
        });
        setActive(activeLink);
    }, [history.location.pathname]);
    // Todo убрать эни
    const timeOut = useRef<any>(null);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
            timeOut.current = setTimeout(() => {
                setIsOpen((prev) => !prev);
            }, 4000);
        } else {
            timeOut.current !== null && clearTimeout(timeOut.current);
        }
    };

    const handleClick = () => {
        const activeLink = ANCHORS.findIndex(
            (a) => a === history.location.pathname
        );
        setActive(activeLink);
    };
    return (
        <>
            <ul
                id="ul-nav"
                className="grid mb-6 text-center text-2xl grid-cols-10 text-warmGray-100"
            >
                {ANCHORS.map((a, i) => {
                    if (a) {
                        if (a !== "profile") {
                            return (
                                <li
                                    onClick={handleClick}
                                    key={Math.random + a}
                                    className="col-span-1"
                                >
                                    <Link
                                        className={
                                            "inline-block relative p-2.5 before:content-[''] before:absolute  before:h-1 before:bg-white before:bottom-0 before:transition-all before:duration-700" +
                                            (i === active
                                                ? " before:w-full before:left-0"
                                                : " hover:before:w-full hover:before:left-0 before:w-0  before:left-2/4")
                                        }
                                        to={a}
                                    >
                                        {a === "/"
                                            ? "Main"
                                            : a.substring(1, 2).toUpperCase() +
                                              a.substring(2, a.length)}
                                    </Link>
                                </li>
                            );
                        } else if (active) {
                            return (
                                <li className="col-span-1" key={i}>
                                    <NavProfile
                                        onClick={handleClick}
                                        isOpen={isOpen}
                                        toggleMenu={toggleMenu}
                                        active={active}
                                    />
                                </li>
                            );
                        }
                    } else {
                        return (
                            <li
                                key={Math.random + a}
                                className={
                                    isLogedIn ? "col-span-7" : "col-span-8"
                                }
                            ></li>
                        );
                    }
                })}
            </ul>
        </>
    );
};

export default NavBar;
