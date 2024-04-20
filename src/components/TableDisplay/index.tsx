import { Table, flexRender } from '@tanstack/react-table'

import tw from 'twin.macro'

type PropsType = {
  table: Table<any>
  maxHeight?: string | number
  onClick?: any
}

const TableDisplay: React.FC<PropsType> = ({ table, maxHeight, onClick }) => {
  return (
    <div
      css={[
        tw`overflow-x-auto p-2`,
        maxHeight && {
          maxHeight,
          overflowY: 'auto',
        },
      ]}
    >
      <table className="w-full rounded-2xl">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-left">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-gray-200 bg-gray-100 px-2.5 py-3  first:rounded-tl-2xl last:rounded-tr-2xl"
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onClick && onClick(row)}
              className="cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-t px-2.5 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  )
}

export default TableDisplay
