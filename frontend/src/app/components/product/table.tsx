'use client';
import React, { useEffect, useState } from 'react';
// import DefaultTable from '../table_template/table';
import { DataTable } from '../table_template/table-new';
import ProductColumns from './header';
import { ProductProps } from '../../type';
import NewPriceCalculator, { calcAllProps } from './price_calculator';

export interface ProductTableProps extends calcAllProps { }

async function createTableData(prodData: ProductProps[]): Promise<ProductTableProps[]> {
    const priceCalculator = await NewPriceCalculator()

    return prodData.map((p) => {
        const calc = priceCalculator.calcAll(p)
        return { ...calc }
    })
}

const Table = ({ prodData }: { prodData: ProductProps[] }) => {
    const [tableData, setTableData] = useState<ProductTableProps[]>([])
    useEffect(() => {
        async function calcPrice() {
            const tableData: ProductTableProps[] = await createTableData(prodData);
            setTableData(tableData)
        }
        calcPrice()
    }, [prodData])
    // @ts-ignore
    return <DataTable data={tableData} columns={ProductColumns} />;
}

export default Table