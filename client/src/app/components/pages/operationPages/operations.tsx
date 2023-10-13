import React from "react";
import { useParams } from "react-router-dom";
import OperationsTable from "./operationsTable";
import OperationForm from "./operationForm";

const OperationsPage = () => {
    const { operationId } = useParams();
    return (
        <>
            {operationId ? (
                <OperationForm
                    id={operationId}
                    backable={true}
                    redirectable={true}
                />
            ) : (
                <OperationsTable />
            )}
        </>
    );
};

export default OperationsPage;
