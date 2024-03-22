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
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DataTablePagination from './pagination';

interface ClientDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function ClientDataTable<TData, TValue>({
  columns,
  data,
}: ClientDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  // onPaginationChange => setNewPage => Router => New Data Load => New DataTable

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },

  });

  // useEffect(() => {
  //   const filterList = table.getState().columnFilters;
  //   console.log(filterList);
  // }, [table.getState().columnFilters]);
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

      <div className=" w-full overflow-scroll max-h-[calc(80vh)] scroll-bar-y-hidden rt-tbody">
        <Table>
          <TableHeader className="sticky top-0 bg-muted w-full z-20 whitespace-nowrap">
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
                    <TableCell key={cell.id} className="text-center whitespace-nowrap">
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

export default ClientDataTable;
