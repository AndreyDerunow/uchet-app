import React, { FC, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "./app/redux/createStore";
import { getUsersIsLogedIn } from "./app/redux/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./app/components/layouts/main";
import NavBar from "./app/components/ui/navbar";
import AppLoader from "./app/components/hoc/appLoader";
import LogOut from "./app/components/layouts/logOut";
import User from "./app/components/pages/userPages/userPage";

const LazyOperations = lazy(
    () => import("./app/components/layouts/operations")
);
const LazyLogin = lazy(() => import("./app/components/layouts/login"));
const LazyOperationForm = lazy(
    () => import("./app/components/pages/operationPages/operationForm")
);
const LazyCategoryForm = lazy(
    () => import("./app/components/pages/operationPages/operationForm")
);
const LazyNotFound = lazy(
    () => import("./app/components/pages/redirect/notFound")
);

function App() {
    const isLoggedIn = useAppSelector(getUsersIsLogedIn());
    return (
        <div className="p-2 w-full h-full transition-all text-white">
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/logOut" component={LogOut} />
                    <Route
                        path="/operations/create"
                        exact
                        render={() => (
                            <Suspense fallback={<AppLoader />}>
                                <LazyOperationForm />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/operations/:operationId?/:edit?"
                        render={() => (
                            <Suspense fallback={<AppLoader />}>
                                <LazyOperations />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/categories/create"
                        exact
                        render={() => (
                            <Suspense fallback={<AppLoader />}>
                                <LazyCategoryForm />
                            </Suspense>
                        )}
                    />
                    <Route
                        path="/categories/:categoryId?/:edit?"
                        render={() => (
                            <Suspense fallback={<AppLoader />}>
                                <LazyCategoryForm />
                            </Suspense>
                        )}
                    />
                    <Route path="/user/:userId?/:action?" component={User} />
                    <Route
                        path="/login/:type?"
                        render={() => {
                            return isLoggedIn ? (
                                <Redirect to="/" />
                            ) : (
                                <Suspense fallback={<AppLoader />}>
                                    <LazyLogin />
                                </Suspense>
                            );
                        }}
                    />
                    <Route
                        path="/404"
                        render={() => (
                            <Suspense fallback={<AppLoader />}>
                                <LazyNotFound />
                            </Suspense>
                        )}
                    />
                    <Redirect to="/404" />
                </Switch>
            </AppLoader>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </div>
    );
}

export default App;
