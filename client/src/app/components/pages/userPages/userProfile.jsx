import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "../../../redux/users";
import { getCurrentUserCategories } from "../../../redux/categories";
import {
    getCurrentUserOperations,
    loadOperationsList
} from "../../../redux/operations";
import getOperationStat from "../../../utils/getOperationStat";
import { BsFillBrushFill } from "react-icons/bs";
import UserForm from "./userForm";
import * as icons from "react-icons/bs";
import CategoryForm from "../categoryPages/categoryForm";
import Loader from "../../ui/loader";

const UserProfile = () => {
    const [edit, setEdit] = useState(false);
    const [currentCategory, setCurrentCategory] = useState();
    const [changeCategory, setChangeCategory] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const currentCategories = useSelector(getCurrentUserCategories());

    useEffect(() => {
        dispatch(loadOperationsList());
    }, []);
    const currentUserOperations = useSelector(getCurrentUserOperations());

    const handleEdit = () => {
        setEdit((prev) => !prev);
    };
    const handleChangeCategory = (id) => {
        setCurrentCategory(() => id);
        setChangeCategory((prev) => !prev);
    };
    const closeChangeCategory = () => {
        setCurrentCategory(() => "");
        setChangeCategory(false);
    };
    if (!currentUserOperations || !currentUser) return <Loader />;
    if (currentUserOperations && currentUser) {
        const [takeOff, topUp] = getOperationStat(
            currentUserOperations,
            currentCategories
        );

        return (
            <>
                <div className="flex w-full text-2xl justify-center items-center">
                    <div className=" flex justify-center flex-row flex-wrap items-center gap-4">
                        <div className="flex flex-col justify-center items-center">
                            <img
                                alt="user"
                                className="w-[448px] h-[448px] object-cover  flying"
                                src={currentUser.image}
                            />
                            <div className="text-center text-5xl">
                                {currentUser.name}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="mb-5 text-center max-w-[450px]">
                                <div
                                    onClick={handleEdit}
                                    className="hover:scale-150 cursor-pointer transition-all"
                                >
                                    <BsFillBrushFill />
                                </div>
                                <p className="text-5xl pt-20 ">
                                    Баланс: {currentUser.currentBalance}
                                </p>
                                <p className="text-5xl pt-5 ">Доход: {topUp}</p>
                                <p className="text-5xl pt-5">
                                    Расход: {takeOff}{" "}
                                </p>

                                <p className="mb-2">
                                    Телефон: {currentUser.phone}
                                </p>
                                <p className="mb-2">
                                    Email: {currentUser.email}
                                </p>
                                <p className="mb-2">{currentUser.about}</p>
                            </div>
                        </div>
                    </div>
                    {edit && (
                        <div className="min-w-[40%] relative text-center">
                            <div
                                onClick={() => {
                                    setEdit(false);
                                }}
                                data-id="add"
                                className="w-[50px] absolute left-[35rem] top-[2.5rem] z-20 cursor-pointer rounded-lg border textShadow flex justify-center items-center  border-white h-[50px]"
                            >
                                X
                            </div>
                            <UserForm
                                currentUser={currentUser}
                                onEdit={handleEdit}
                            />
                        </div>
                    )}
                </div>
                <div className="flex w-full min-v-[50%] flex-wrap gap-1 text-2xl justify-center items-center">
                    <h2 className="w-full text-center">Категории:</h2>
                    <p className="w-full text-center">
                        * собственные категории можно изменить нажав на них
                    </p>
                    {currentCategories.map((c) => (
                        <div
                            key={c._id}
                            id={c._id}
                            onClick={
                                c.default
                                    ? () => {
                                          return true;
                                      }
                                    : () => handleChangeCategory(c._id)
                            }
                            style={{ backgroundColor: c.color }}
                            className={
                                (c.default
                                    ? ""
                                    : "cursor-pointer hover:scale-105") +
                                " m-2 p-2 border border-white rounded-lg"
                            }
                        >
                            {icons[c.icon]()}
                            {c.name}
                            <span>{}</span>
                        </div>
                    ))}
                </div>
                {changeCategory && (
                    <div className="min-w-[40%] relative text-center">
                        <div
                            onClick={() => {
                                setChangeCategory(false);
                            }}
                            data-id="add"
                            className="w-[50px] absolute left-[35rem] top-[2.5rem] z-20 cursor-pointer rounded-lg border textShadow flex justify-center items-center  border-white h-[50px]"
                        >
                            X
                        </div>
                        <CategoryForm
                            onSubmit={closeChangeCategory}
                            id={currentCategory}
                        />
                    </div>
                )}
            </>
        );
    }
};

export default UserProfile;
