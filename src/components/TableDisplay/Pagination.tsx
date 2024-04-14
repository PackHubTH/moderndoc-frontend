import tw from 'twin.macro'

type Props = {
  currentPage: number
  nextPage: () => void
  prevPage: () => void
  totalPage: number
}

const Pagination: React.FC<Props> = ({
  currentPage,
  nextPage,
  prevPage,
  totalPage,
}) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        css={[
          tw`rounded-md bg-gray-200 px-2 py-1 text-gray-600`,
          currentPage !== 1 && tw`bg-blue-500 text-white`,
        ]}
      >
        {'<'}
      </button>
      <div>
        <span className="text-gray-600">
          {currentPage} of {totalPage}
        </span>
      </div>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPage}
        css={[
          tw`rounded-md bg-gray-200 px-2 py-1 text-gray-600`,
          currentPage !== totalPage && tw`bg-blue-500 text-white`,
        ]}
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination
