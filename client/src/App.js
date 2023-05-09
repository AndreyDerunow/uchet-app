import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./app/components/layouts/main";
import Login from "./app/components/layouts/login";
import NavBar from "./app/components/ui/navbar";
import AppLoader from "./app/components/hoc/appLoader";
import Operations from "./app/components/layouts/operations";
import OperationForm from "./app/components/pages/operationPages/operationForm";
import CategoryForm from "./app/components/pages/categoryPages/categoryForm";
import LogOut from "./app/components/layouts/logOut";
import NotFound from "./app/components/pages/redirect/notFound";
import { getUsersIsLogedIn } from "./app/redux/users";
import { useSelector } from "react-redux";
import User from "./app/components/pages/userPages/userPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const isLoggedIn = useSelector(getUsersIsLogedIn());
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
                        component={OperationForm}
                    />
                    <Route
                        path="/operations/:operationId?/:edit?"
                        component={Operations}
                    />
                    <Route
                        path="/categories/create"
                        exact
                        component={CategoryForm}
                    />
                    <Route
                        path="/categories/:categoryId?/:edit?"
                        component={CategoryForm}
                    />
                    <Route path="/user/:userId?/:action?" component={User} />
                    <Route
                        path="/login/:type?"
                        render={() => {
                            return isLoggedIn ? <Redirect to="/" /> : <Login />;
                        }}
                    />
                    <Route path="/404" component={NotFound} />
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
