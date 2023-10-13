import React from "react";
import OperationsLoader from "../hoc/operationsLoader";
import OperationsPage from "../pages/operationPages/operations";

const Operations = () => {
    return (
        <OperationsLoader>
            <OperationsPage />
        </OperationsLoader>
    );
};

export default Operations;
