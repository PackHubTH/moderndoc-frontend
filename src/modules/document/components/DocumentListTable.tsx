import {
  ColumnDef,
  PaginationState,
  Row,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { FaCopy, FaEye } from 'react-icons/fa'
import { Document, DocumentAction, DocumentStatus } from '../types/types'
import { getStatusBadgeProps, shouldShowAction } from '../utils/statusUtils'

import Badge from '@/components/Badge'
import Button from '@/components/Button'
import DropdownItem from '@/components/Dropdown/DropdownItem'
import Loading from '@/components/Loading'
import Modal from '@/components/Modal'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import TableInfoBox from '@/components/TableInfoBox'
import { useDisclosure } from '@/hooks/useDisclosure'
import TimelineDescriptionBox from '@/modules/timeline/components/TimelineDescriptionBox'
import { useUserStore } from '@/stores/userStore'
import { formatFullDatetime } from '@/utils/formatUtils'
import { FaRegEnvelope } from 'react-icons/fa6'
import { HiTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useActionDocument from '../hooks/api/useActionDocument'
import useGetAllDocument from '../hooks/api/useGetAllDocument'
import useGetDocumentById from '../hooks/api/useGetDocumentById'

interface PropsType {
  type:
    | 'ASSIGNED_TO_ME'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'CANCELED'
    | 'DRAFT'
    | 'ALL'
}

const DocumentListTable = ({ type }: PropsType) => {
  const { mutate: actionDocument } = useActionDocument()
  const { isOpen, open, close } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    open: openDelete,
    close: closeDelete,
  } = useDisclosure()
  const navigate = useNavigate()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [hoveredRow, setHoveredRow] = useState<Row<Document> | null>(null)
  const user = useUserStore((state) => state.user)
  const {
    data: document,
    refetch: refetchAllDocument,
    isFetched,
    isRefetching,
  } = useGetAllDocument(paginationState.pageIndex + 1, type)
  const [documentId, setDocumentId] = useState('')
  const { data: documentData, refetch: refetchDocumentById } =
    useGetDocumentById(documentId)

  const deleteDocument = (data: Document) => {
    try {
      actionDocument(
        {
          documentId: data.id,
          element: data.element,
          action: DocumentAction.REJECT,
          message: '',
          receiverId: data.createdBy,
        },
        {
          onSuccess: () => {
            toast('ดำเนินการเอกสารสำเร็จ', { type: 'success' })
            setTimeout(() => closeDelete(), 2000)
          },
          onError: (error) => {
            toast(`เกิดข้อผิดพลาดในการดำเนินการเอกสาร ${error}`, {
              type: 'error',
            })
          },
        }
      )
    } catch (error) {
      toast(`เกิดข้อผิดพลาดในการดำเนินการเอกสาร ${error}`, { type: 'error' })
    }
  }

  const columns: ColumnDef<Document>[] = [
    {
      id: 'index',
      size: 20,
      header: 'ที่',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.index +
            1 +
            paginationState.pageIndex * paginationState.pageSize}
        </span>
      ),
    },
    {
      id: 'documentTitle',
      size: 20,
      header: (info) => (
        <div className="flex items-center gap-2 font-semibold">
          <FaRegEnvelope />
          ทั้งหมด <span className="text-blue-500">
            {document?.data?.total}
          </span>{' '}
          ฉบับ
        </div>
      ),
      cell: (info) => (
        <TableInfoBox
          title={info.row.original.title}
          createdAt={info.row.original.createdAt}
          userCreatedBy={info.row.original.userCreated}
          userUpdatedBy={info.row.original.operator}
        />
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      header: '',
      cell: (info) => (
        <div className="flex flex-col items-end justify-end">
          <Badge
            {...getStatusBadgeProps(
              info.row.original.documentSents ?? [],
              info.row.original.status as DocumentStatus,
              user.id,
              info.row.original.createdBy,
              info.row.original.operatorId
            )}
          />
          <p className="text-gray-400">
            อัพเดตล่าสุดเมื่อ{' '}
            {formatFullDatetime(info.row.original.lastUpdatedAt)}
          </p>
          {hoveredRow && hoveredRow.id === info.row.id && (
            <div className="absolute right-2 top-4 space-x-2">
              {shouldShowAction(
                info.row.original.status,
                info.row.original.documentSents?.find(
                  (sent) => sent.receiverId === user.id
                )?.status ?? ''
              ) && (
                <Button
                  label="ดำเนินการ"
                  onClick={() =>
                    navigate(`/edit-document/${info.row.original.id}`)
                  }
                />
              )}
              <div className="hs-dropdown relative z-20 inline-flex">
                <Button
                  id="hs-dropdown-with-title"
                  label="เพิ่มเติม"
                  variant="outline-blue"
                />
                <div
                  className="hs-dropdown-menu duration mt-2 hidden min-w-[15rem] divide-y divide-gray-200 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100"
                  aria-labelledby="hs-dropdown-with-title"
                >
                  <div className="py-2 first:pt-0 last:pb-0">
                    <DropdownItem
                      displayText="ดูรายละเอียด"
                      icon={<FaEye className="text-blue-500" />}
                      onClick={() =>
                        navigate(`/view-document/${info.row.original.id}`)
                      }
                    />
                    <DropdownItem
                      displayText="คัดลอก"
                      icon={<FaCopy className="text-blue-500" />}
                    />
                    {shouldShowAction(
                      info.row.original.status,
                      info.row.original.documentSents?.find(
                        (sent) => sent.receiverId === user.id
                      )?.status ?? ''
                    ) &&
                      user.id === info.row.original.createdBy && (
                        <div id="delete-modal">
                          <DropdownItem
                            displayText="ลบเอกสาร"
                            icon={<HiTrash className="text-red-500" />}
                            onClick={openDelete}
                          />
                        </div>
                      )}
                    <Modal
                      isOpen={isDeleteOpen}
                      variant="confirm"
                      onClose={closeDelete}
                      title="ยืนยันการลบเอกสาร"
                      width="600px"
                      content={
                        <p className="text-s">
                          รายการดังกล่าวยังไม่มีผู้ดำเนินการต่อ
                          หากทำการลบจะไม่สามารถกู้คืนได้
                        </p>
                      }
                      leftIcon={<HiTrash className="text-red-500" />}
                      actions={
                        <div className="flex gap-4">
                          <Button
                            label="ยกเลิก"
                            variant="outline-gray"
                            onClick={closeDelete}
                          />
                          <Button
                            label="ลบ"
                            variant="red"
                            onClick={() => {
                              deleteDocument(info.row.original)
                            }}
                          />
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: document?.data?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: -1,
  })

  useEffect(() => {
    setPaginationState({
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
    })
  }, [table.getState().pagination.pageIndex])

  const onRowClick = (row: any) => {
    // check if button not click then open
    if (
      window.document
        .getElementById('hs-dropdown-with-title')
        ?.contains(window.document.activeElement) ||
      window.document
        .getElementById('delete-modal')
        ?.contains(window.document.activeElement)
    )
      return

    setDocumentId(row.original.id)
    if (documentId) refetchDocumentById()
    open()
  }

  if (!isFetched || isRefetching) return <Loading />

  return (
    <div className="flex">
      <div className="flex-1 p-2">
        <TableDisplay
          table={table}
          onHoverRow={setHoveredRow}
          onClick={onRowClick}
        />
        <Pagination
          totalPage={document?.data?.totalPages ?? 1}
          currentPage={table.getState().pagination.pageIndex + 1}
          nextPage={table.nextPage}
          prevPage={table.previousPage}
        />
      </div>
      {isOpen && documentData && (
        <TimelineDescriptionBox data={documentData?.data} />
      )}
    </div>
  )
}

export default DocumentListTable
