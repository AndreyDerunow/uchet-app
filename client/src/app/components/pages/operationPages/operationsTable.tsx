import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
    getCurrentUserOperations,
    getOperationsList
} from "../../../redux/operations";
import Table from "../../common/table/table";
import BalanceCanv from "../../ui/balanceCanv";
import StatCanv from "../../ui/statCanv";
import {
    getCategoriesList,
    getCurrentUserCategories
} from "../../../redux/categories";
import { BsCurrencyExchange, BsFillPiggyBankFill } from "react-icons/bs";
import OperationForm from "./operationForm";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import Loader from "../../ui/loader";
import FilterBy from "../../common/filterBy";
import _ from "lodash";
import sortByNum from "../../../utils/sortByNum";
import CategoryForm from "../categoryPages/categoryForm";
import getOperationStat from "../../../utils/getOperationStat";
import { useAppSelector } from "../../../redux/createStore";
import {
    ICategory,
    IChangeOperation,
    IChangeTarget,
    IFilterData,
    IOperation,
    Isort
} from "../../../interfaces/interfaces";

const OperationsTable = () => {
    const [active, setActive] = useState("my");
    const [add, setAdd] = useState(false);
    const [currentOperation, setCurrentOperation] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<IFilterData | null>(null);
    const defaultSort: Isort = {
        path: "created_at",
        order: "asc"
    };
    const [selectedSort, setSelectedSort] = useState<Isort>(defaultSort);
    const [addCategory, setAddCategory] = useState<boolean>(false);
    const currentUserOperations = useAppSelector<IOperation[] | null>(
        getCurrentUserOperations()
    );
    const operations = useAppSelector<IOperation[] | null>(getOperationsList());
    const categories = useAppSelector<ICategory[] | null>(getCategoriesList());
    const currentCategories = useAppSelector<ICategory[] | null>(
        getCurrentUserCategories()
    );
    const addRef = useRef(null);

    const pageSize = 8;
    let balance = 0;
    useEffect(() => {
        setCurrentPage(1);
        setCurrentOperation("");
        setAdd(false);
        setFilter(null);
    }, [active]);
    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    const arrOperations =
        currentUserOperations &&
        currentUserOperations.map((o) => {
            balance += +((o.type === "top up" ? "+" : "-") + o.sum);

            return [o.created_at, balance];
        });
    useEffect(() => {
        if (add && addRef.current) {
            (addRef.current as HTMLElement).scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }, [add]);
    const handleChangeOperationsOwner = ({
        target
    }: React.SyntheticEvent<HTMLDivElement>) => {
        (target as HTMLDivElement).id === "my"
            ? setActive("my")
            : setActive("all");
    };
    const handleOperation = ({
        target
    }:
        | React.SyntheticEvent<HTMLDivElement>
        | IChangeOperation<IChangeTarget>) => {
        //чел нажал на добавить, закрыть или изменить
        if ("currentOperation" in target) {
            setCurrentOperation((target as IChangeTarget).currentOperation);
            setAdd((prev) => !prev);
            return;
        } else if ((target as HTMLDivElement).dataset.id === "add") {
            setAdd((prev) => !prev);
            return;
        }
    };
    const handleSubmit = () => {
        setCurrentOperation("");
        setAdd(false);
    };
    const handleAddCategory = () => {
        setAddCategory(true);
    };
    const handleCloseCategory = () => {
        setAddCategory(false);
    };
    if (!currentUserOperations || !operations) return <Loader />;
    if (!currentUserOperations.length || !operations.length)
        return (
            <div className="w-full flex-col flex justify-center items-center">
                <h1 className="text-4xl m-6">Добро пожаловать в Uchet!</h1>
                <h2 className="text-xl m-2">Здесь пока еще ничего нет :( </h2>
                <h2 className="text-xl m-2">Добавим операцию?</h2>
                <div className="w-full flex justify-center items-center">
                    <div className="min-w-[50%]">
                        <OperationForm
                            onAddCategory={handleAddCategory}
                            backable={false}
                            redirectable={false}
                        />
                    </div>
                    {addCategory && (
                        <div className="min-w-[50%]">
                            <CategoryForm onSubmit={handleCloseCategory} />
                        </div>
                    )}
                </div>
            </div>
        );
    const columns = Object.keys(operations[0]);

    const currentOperationsList =
        active === "my" ? currentUserOperations : operations;
    const currentCategoriesList =
        active === "my" ? currentCategories : categories;
    const [, , takeOff, topUp] = getOperationStat(
        currentOperationsList,
        currentCategoriesList
    );
    const handleFilter = ({ point, value }: IFilterData) => {
        setFilter({ point, value });
    };
    const handleClear = () => {
        setFilter(null);
    };

    const handleSort = (sort: Isort) => {
        setSelectedSort(sort);
    };

    const filteredOperations =
        filter && filter.value
            ? currentOperationsList.filter(
                  (o) => o[filter.point as keyof IOperation] === filter.value
              )
            : currentOperationsList;

    const sortedOperations =
        selectedSort.path === "sum"
            ? sortByNum(filteredOperations, selectedSort.order)
            : _.orderBy(
                  filteredOperations,
                  [selectedSort.path],
                  [selectedSort.order]
              );
    const count = sortedOperations.length;
    const operationsCrop =
        filter && Object.keys(filter).length
            ? filteredOperations
            : paginate(sortedOperations, currentPage, pageSize);
    return (
        <div className="grid grid-cols-12 w-full h-full justify-center content-start">
            <div className="grid col-span-8 grid-cols-2 col-start-3 text-center items-center">
                <div className=" grid justify-start text-center items-center">
                    <div
                        role="button"
                        id="all"
                        onClick={handleChangeOperationsOwner}
                        className={
                            (active === "all" && "scale-110") +
                            " col-start-1 transition-all m-2 mr-5 mb-0 rounded-t-lg p-2 cursor-pointer textShadow  border min-w-[150px] border-white border-b-4 border-b-mainColor"
                        }
                    >
                        Все
                    </div>
                    <div
                        role="button"
                        id="my"
                        onClick={handleChangeOperationsOwner}
                        className={
                            (active === "my" && "scale-110") +
                            " col-start-3 m-2 mb-0 p-2 cursor-pointer rounded-t-lg border textShadow min-w-[150px] border-white border-b-4 border-b-mainColor"
                        }
                    >
                        Мои
                    </div>
                </div>

                <div
                    role="button"
                    data-id="add"
                    id="add"
                    title="Добавить операцию"
                    onClick={handleOperation}
                    className={
                        "w-[50px] place-self-end m-2 mb-0 p-2 cursor-pointer rounded-t-lg textShadow font-extrabold text-xl border scale-110 textShadow border-white border-b-0"
                    }
                >
                    +
                </div>
            </div>
            <div className="col-start-1 col-span-2">
                {filter && currentCategoriesList && (
                    <FilterBy
                        categories={currentCategoriesList}
                        point="category"
                        value={filter.value}
                        onFilter={handleFilter}
                        onClearFilter={handleClear}
                    />
                )}
            </div>

            <div className="grid py-7 col-start-3 min-h-[450px] col-span-8 border border-warmGray-50 mb-5">
                <h1 className="text-center text-2xl">Операции</h1>
                <Table
                    selectedSort={selectedSort}
                    onSort={handleSort}
                    columns={columns}
                    rows={operationsCrop}
                    onClick={handleOperation}
                />
                <Pagination
                    count={count}
                    onPageChange={handlePageChange}
                    pageSize={pageSize}
                    currentPage={currentPage}
                />
            </div>
            {add && (
                <div className="grid relative col-span-8 col-start-3">
                    * чтобы добавить нужную категорию, нажмите "создать новую"
                    при выборе
                    <div className="w-full flex justify-center items-center">
                        <div className="min-w-[70%] relative" ref={addRef}>
                            <div
                                onClick={handleOperation}
                                data-id="add"
                                className="w-[50px] absolute left-[42rem] top-10 z-20 cursor-pointer rounded-lg border textShadow flex justify-center items-center  border-white h-[50px]"
                            >
                                X
                            </div>
                            <OperationForm
                                backable={true}
                                redirectable={false}
                                onAddCategory={handleAddCategory}
                                id={currentOperation}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        {addCategory && (
                            <div className=" relative min-w-[70%]">
                                <div
                                    onClick={() => {
                                        setAddCategory(false);
                                    }}
                                    data-id="add"
                                    className="w-[50px] absolute left-[42rem] top-[2.5rem] z-20 cursor-pointer rounded-lg border textShadow flex justify-center items-center  border-white h-[50px]"
                                >
                                    X
                                </div>
                                <CategoryForm onSubmit={handleCloseCategory} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {active === "my" && currentUserOperations.length > 1 && (
                <>
                    <h2 className="col-start-3 col-span-8 text-center mb-4 text-2xl text-white">
                        Последние операции
                    </h2>
                    <h2 className="col-start-3 col-span-8 text-center mb-4 text-base text-white">
                        * если вдруг график потерялся, это значит, что в рабочем
                        окне слайдера недостаточно точек для построения хотя бы
                        одной прямой. Исправить это очень хорошо помогают новые
                        платежные операции!
                    </h2>
                    <BalanceCanv
                        arr={arrOperations}
                        info={currentUserOperations}
                    />
                </>
            )}

            {currentOperationsList.length > 1 ? (
                <>
                    <h2 className="col-start-3 col-span-8 text-center mb-4 text-2xl text-white">
                        Статистика
                    </h2>
                    <div className="grid text-center grid-cols-2 col-start-3 col-span-8 ">
                        <div>
                            <BsFillPiggyBankFill
                                title="Доходы"
                                className="w-20 h-20"
                            />
                        </div>
                        <div>
                            <BsCurrencyExchange
                                title="Расходы"
                                className="w-20 h-20"
                            />
                        </div>
                        {topUp.length && (
                            <StatCanv
                                arr={topUp}
                                categories={currentCategoriesList}
                            />
                        )}
                        {takeOff.length && (
                            <StatCanv
                                arr={takeOff}
                                categories={currentCategoriesList}
                            />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h2 className="col-start-3 col-span-8 text-center m-3 text-3xl">
                        Отлично!
                    </h2>
                    <h2 className="col-start-3 col-span-8 text-center m-3 text-2xl">
                        После добавления еще нескольких операций здесь можно
                        будет посмотреть и даже "потрогать" статистику по вашему
                        профилю, поискать тенденции и просто поиграться{" "}
                        <span className="opacity-0 cursor-pointer hover:animate-textShy replace">
                            {" "}
                            с прекрасным, по нашему скромному мнению,
                        </span>{" "}
                        графическим представлением журнала. :)
                    </h2>
                </>
            )}
        </div>
    );
};

OperationsTable.propTypes = {
    currentUserOperations: PropTypes.arrayOf(PropTypes.object)
};

export default OperationsTable;
