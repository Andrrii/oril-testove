import React from "react"
import Table from "../table"

const ListPage = ({onPersonSelected}) => {
    return (
        <>
        <Table onPersonSelected = {onPersonSelected}/>
        </>
    )
}

export default ListPage