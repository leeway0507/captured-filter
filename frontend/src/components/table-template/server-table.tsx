'use client';

import React, { useState, useEffect } from 'react';
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedUniqueValues,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSearchParams, useRouter } from 'next/navigation';
import DataTablePagination from './pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount:number
}

function DataTable<TData, TValue>({
  columns,
  data,
  pageCount = 3,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page'));
  const pageIndex = pageParam > 1 ? pageParam - 1 : 0;
  const pageSize = Number(searchParams.get('limit') ?? '10');

  const pagination = React.useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize],
  );

  // onPaginationChange => setNewPage => Router => New Data Load => New DataTable
  const [newPage, setNewPage] = useState<PaginationState>(pagination);
  // console.log(pageSize);
  // console.log(pageIndex);
  // console.log(newPage);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount,

    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setNewPage,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    state: {
      sorting,
      columnFilters,
      pagination,

    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },

  });

  useEffect(() => {
    if (newPage.pageIndex === 0) {
      router.push(window.location.pathname);
    } else {
      router.push(`?page=${newPage.pageIndex + 1}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPage]);

  if (table.getRowModel().rows === undefined) return null;

  return (
    <div className="rounded-md border">
      {/* <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("Price")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Price")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div> */}

      <div className=" w-full overflow-scroll h-[calc(100vh-210px)] scroll-bar-y-hidden rt-tbody">
        <Table>
          <TableHeader className="sticky top-0 w-full z-20 whitespace-nowrap bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {table.getRowModel().rows?.length
            ? (
              <TableBody>
                { (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center whitespace-nowrap ">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}

                </TableRow>
              ))
            )}
              </TableBody>
            ) : null}
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
