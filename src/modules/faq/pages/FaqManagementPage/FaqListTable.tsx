import Tag from '@/components/Tag'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Faq = {
  index: number
  title: string
  userCreatedBy: string
  profileImg: string
  email: string
  createdAt: string
  lastUpdatedAt: string
  tags: string[]
}

const columnHelper = createColumnHelper<Faq>()

const columns = [
  columnHelper.accessor('index', {
    header: 'ที่',
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor('tags', {
    header: '',
    cell: (info) => (
      <div className="flex flex-col gap-1">
        {info.getValue().map((tag, index) => (
          <Tag name={tag} />
        ))}
      </div>
    ),
  }),
]

const FaqListTable = () => {
  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    data: [],
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}></tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}></tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}></tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
    </div>
  )
}
