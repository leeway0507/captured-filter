'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getSortedRowModel,
  getCoreRowModel,
  ColumnFiltersState,
  useReactTable,
  PaginationState,
  ColumnSort,
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
import DataTablePagination from '@/components/table-template/pagination';
import { ConvertFilterToQueryString, ConvertPageToQueryString } from '@/components/table-template/server-filter';
import MobileWarning from '@/app/components/mobile_warning/mobile_warning';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount:number
  initalSorting: ColumnSort[]
}

type ColumnFilterProps = {
  storeInfo: string[]
  brand: string[]
};

function ServerTable<TData, TValue>({
  columns,
  data,
  pageCount = 1,
  initalSorting = [],
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get('page'));
  const pageIndex = pageParam > 1 ? pageParam - 1 : 0;
  const pageSize = Number(searchParams.get('limit') ?? '10');
  const filters = searchParams.get('filter');

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize],
  );
  const columnFilters = useMemo(
    () => {
      const v: ColumnFilterProps = JSON.parse(filters ?? '{}');
      return Object.entries(v).map((k) => ({ id: k[0], value: k[1] }));
    },
    [filters],
  );

  // onPaginationChange => setNewPage => Router => New Data Load => New DataTable
  const [newPage, setNewPage] = useState<PaginationState>(pagination);
  const [newColumnFilters, setNewColumnFilters] = useState<ColumnFiltersState>(columnFilters);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount,
    enableMultiSort: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setNewPage,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setNewColumnFilters,

    // defaultColumn: {
    //   size: 300, // starting column size
    //   minSize: 200, // starting column size
    //   maxSize: 500, // starting column size
    // },

    state: {
      columnFilters,
      pagination,

    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: initalSorting,
    },

  });

  // 필터링 & 페이지 이동 시 URL 변경
  useEffect(() => {
    const newUrl = new URL(window.location.href);
    ConvertPageToQueryString(newUrl, newPage);
    ConvertFilterToQueryString(newUrl, newColumnFilters);
    router.push(newUrl.href);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPage, newColumnFilters]);

  if (table.getRowModel().rows === undefined) return null;

  return (
    <div className="rounded-md border max-md:overflow-auto ">
      <MobileWarning />
      <div className="w-full rt-tbody">
        <Table>
          <TableHeader className="z-50 sticky max-lg:top-0 top-[60px] w-full whitespace-nowrap bg-white shadow">
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
                    <TableCell
                      key={cell.id}
                      className="text-center whitespace-nowrap "
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
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

export default ServerTable;
