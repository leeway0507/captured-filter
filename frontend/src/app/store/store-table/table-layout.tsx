'use client';

import React from 'react';
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
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ScrollArea } from '@/components/ui/scroll-area';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

function DataTable<TData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // onPaginationChange => setNewPage => Router => New Data Load => New DataTable

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    state: {
      sorting,
      columnFilters,
    },

  });
  if (table.getRowModel().rows === undefined) return null;

  return (
    <ScrollArea className="rounded-md border">
      <div className=" w-full overflow-scroll-x h-[calc(100vh-90px)] rt-tbody">
        <Table>
          <TableHeader className="sticky top-0 w-full z-20 whitespace-nowrap bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center w-full min-w-[150px]">
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
    </ScrollArea>
  );
}

export default DataTable;
