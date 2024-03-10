import { PaginationState } from '@tanstack/react-table'

type Props = {
  paginationState: PaginationState
  setPaginationState: (paginationState: PaginationState) => void
  totalPage: number
}

const Pagination: React.FC<Props> = ({
  paginationState,
  setPaginationState,
  totalPage,
}) => {
  const { pageIndex, pageSize } = paginationState
  const handlePageChange = (page: number) => {
    setPaginationState({ ...paginationState, pageIndex: page })
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-gray-600">
          {pageIndex * pageSize + 1} -{' '}
          {pageIndex * pageSize + pageSize > totalPage
            ? totalPage
            : pageIndex * pageSize + pageSize}{' '}
          of {totalPage}
        </span>
      </div>
      <div>
        <button
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="rounded-md bg-gray-200 px-2 py-1 text-gray-600"
        >
          {'<'}
        </button>
        <button
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === totalPage - 1}
          className="rounded-md bg-gray-200 px-2 py-1 text-gray-600"
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Pagination
