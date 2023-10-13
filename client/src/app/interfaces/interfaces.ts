import {
    ChangeEventHandler,
    FormEventHandler,
    MouseEventHandler,
    ReactNode
} from "react";

export interface IOption {
    name: string;
    value: string;
}

export interface IChangeTarget {
    dataset: { id: string };
    currentOperation: string;
}

export interface IChangeOperation<T> {
    target: T;
}

export interface IOperation {
    category: string;
    comment: string;
    created_at: string;
    sum: string;
    type: "top up" | "take off";
    updatedAt: string;
    userId: string;
    __v: number;
    _id: string;
}

export interface ICategory {
    color: string;
    createdAt: string;
    default?: boolean;
    icon: string;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

export interface InputProps {
    label?: string;
    name?: string;
    id?: string;
    onChange?: ChangeEventHandler;
    value?: string;
    options?: IOption[];
    onAddCategory?: Function;
    placeholder?: string;
    error?: string;
    type?: string;
}

export interface PropsWithFunc extends Omit<InputProps, "onChange"> {
    onChange?: Function;
}
export interface PropsBoolValue extends Omit<InputProps, "value"> {
    value?: boolean;
}

export interface PropsTextArea extends InputProps {
    maxlength: number;
}

export interface IForm {
    onSubmit: FormEventHandler;
    children: ReactNode[];
}

export interface Isort {
    path: string;
    order: "asc" | "desc";
}

export interface IUser {
    name: string;
    about: string;
    image: string;
    categories: string[];
    phone: string;
    email: string;
}

export interface Icons {
    chosenIcon: string;
}
// кнопки
export interface IButton {
    text: string;
    onClick: MouseEventHandler<HTMLAnchorElement>;
}

export interface IHref {
    text: string;
    href: string;
    active?: number;
    onClick?: Function;
}

//формы

export interface IUserForm {
    currentUser: IUser;
    backable: boolean;
    redirectable: boolean;
    onEdit?: Function;
}

export interface IOperationForm {
    onAddCategory: Function;
    backable: boolean;
    redirectable: boolean;
    onSubmit?: Function;
    id?: string;
}

export interface IimgTarget {
    name: string;
    value: string;
    img: string;
}

export interface IimgData {
    target: IimgTarget;
}

export interface ILoginFormData {
    email: string;
    password: string;
    stayIn: false | true;
}

//таблица

export interface ITable {
    columns: string[];
    rows: any[];
    onClick: Function;
    onSort: Function;
    selectedSort: Isort;
}

export interface ITableHead {
    columns: string[];
    onSort: Function;
    selectedSort: Isort;
}

export interface ITableBody {
    columns: string[];
    rows: any[];
    onClick: Function;
}

//навигация

export interface INavProfileProps {
    toggleMenu: MouseEventHandler<HTMLDivElement>;
    isOpen: boolean;
    active: number;
    onClick: MouseEventHandler<HTMLDivElement>;
}

//фильтр
export interface IFilter {
    categories: ICategory[];
    point: string;
    value: string;
    onFilter: Function;
    onClearFilter: MouseEventHandler<HTMLDivElement>;
}

export interface IFilterData {
    point: string; //переделать бы на основания
    value: string;
}
//ошибки

export interface Errors {
    password?: string;
    email?: string;
    passwordRepeat?: string;
    name?: string;
}
