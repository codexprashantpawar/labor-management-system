"use client"

import type React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column<T> {
  key: keyof T
  label: string
  render?: (value: any, item: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  actions?: (item: T) => React.ReactNode
}

export function DataTable<T extends { id: string | number }>({ columns, data, actions }: DataTableProps<T>) {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border bg-muted/50">
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="font-semibold">
                {column.label}
              </TableHead>
            ))}
            {actions && <TableHead className="w-20">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-8">
                <p className="text-muted-foreground">No data available</p>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="border-b border-border hover:bg-muted/50">
                {columns.map((column) => (
                  <TableCell key={String(column.key)} className="py-4">
                    {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(item)}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
