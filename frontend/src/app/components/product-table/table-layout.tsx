'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  ColumnFiltersState,
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
import DataTablePagination from '@/components/table-template/pagination';
import { ConvertFilterToQueryString, ConvertPageToQueryString } from '@/components/table-template/server-filter';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount:number
}

type ColumnFilterProps = {
  storeInfo: string[]
  productInfo_product_id: string[]
};

function DataTable<TData, TValue>({
  columns,
  data,
  pageCount = 3,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

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
    onColumnFiltersChange: setNewColumnFilters,

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
    <div className="rounded-md border">

      <div className=" w-full overflow-scroll h-[calc(100vh-190px)] scroll-bar-y-hidden rt-tbody">
        <Table>
          <TableHeader className="sticky top-0 w-full z-20 whitespace-nowrap bg-white shadow">
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
