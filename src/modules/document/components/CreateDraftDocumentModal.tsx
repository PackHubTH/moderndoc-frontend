// import { useEffect, useMemo, useState } from 'react'

// import AutocompleteInput from '@/components/AutocompleteInput'
// import Button from '@/components/Button'
// import { Controller } from 'react-hook-form'
// import { CreateDocumentForm } from '../hooks/useCreateDocumentForm/validation'
// import { DocumentStatus } from '../types/types'
// import Modal from '@/components/Modal'
// import RadioGroup from '@/components/RadioGroup'
// import RichTextInput from '@/components/RichTextInput'
// import { getJson } from '../utils/documentEditorUtils'
// import { toast } from 'react-toastify'
// import useAssignOperator from '../hooks/api/useAssignOperator'
// import useCreateDocument from '../hooks/api/useCreateDocument'
// import useCreateDocumentForm from '../hooks/useCreateDocumentForm'
// import { useDocumentStore } from '../stores/documentStore'
// import useGetUsersByName from '@/modules/user/hooks/api/useGetUsersByName'
// import { useNavigate } from 'react-router-dom'

// type PropsType = {
//   isOpen: boolean
//   documentId: string
//   close: () => void
// }

// const CreateDraftDocumentModal: React.FC<PropsType> = ({
//   isOpen,
//   documentId,
//   close,
// }: PropsType) => {
//   const { mutate: assignOperator } = useAssignOperator()
//   const { mutate: createDocument } = useCreateDocument()
//   const { methods } = useCreateDocumentForm()
//   const canvasList = useDocumentStore((state) => state.canvasList)
//   const navigate = useNavigate()
//   const [documentStatus, setDocumentStatus] = useState(
//     DocumentStatus.PROCESSING
//   )
//   const [searchOperator, setSearchOperator] = useState('')
//   const { data: userList } = useGetUsersByName(searchOperator)

//   useEffect(() => {
//     if (!isOpen) {
//       methods.reset()
//       setSearchOperator('')
//     }
//   }, [isOpen])

//   const operators = useMemo(() => {
//     if (!userList) return suggestOperators
//     const filterStaffList = userList.data
//       .filter(
//         (user) => !suggestOperators.some((operator) => operator.id === user.id)
//       )
//       .map((user) => ({
//         id: user.id,
//         nameTh: user.nameTh,
//       }))
//     return [...suggestOperators, ...filterStaffList]
//   }, [userList, suggestOperators])

//   const onProcessSubmit = async (data: CreateDocumentForm) => {
//     try {
//       createDocument(
//         {
//           templateId,
//           element: {
//             data: getJson(canvasList),
//           },
//           documentStatus,
//         },
//         {
//           onSuccess: (res) => {
//             assignOperator(
//               {
//                 documentId: res.data.id,
//                 operatorUserId: data.operatorUserId,
//                 message: data.message,
//                 isEditable: data.isEditable,
//               },
//               {
//                 onSuccess: () => {
//                   toast('สร้างเอกสารสำเร็จ', { type: 'success' })
//                   setTimeout(() => navigate('/document-management'), 2000)
//                 },
//                 onError: (error) => {
//                   toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, {
//                     type: 'error',
//                   })
//                 },
//               }
//             )
//           },
//           onError: (error) => {
//             toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, {
//               type: 'error',
//             })
//           },
//         }
//       )
//     } catch (error) {
//       toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, { type: 'error' })
//     }
//   }

//   const onNonProcessSubmit = async () => {
//     try {
//       createDocument(
//         {
//           templateId,
//           element: { data: getJson(canvasList) },
//           documentStatus,
//         },
//         {
//           onSuccess: () => {
//             toast('สร้างเอกสารสำเร็จ', { type: 'success' })
//             setTimeout(() => navigate('/document-management'), 2000)
//           },
//           onError: (error) => {
//             toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, {
//               type: 'error',
//             })
//           },
//         }
//       )
//     } catch (error) {
//       toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, { type: 'error' })
//     }
//   }

//   const renderCreateDocumentForm = () => {
//     if (documentStatus !== DocumentStatus.PROCESSING) return null
//     return (
//       <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
//         <Controller
//           control={methods.control}
//           name="operatorUserId"
//           render={({ field: { onChange } }) => (
//             <AutocompleteInput
//               label="เลือกผู้รับเอกสาร"
//               placeholder="เลือกหรือค้นหารายชื่อ"
//               onChange={(e) => {
//                 const name = operators.find((operator) => operator.id === e)
//                   ?.nameTh
//                 onChange(e)
//                 setSearchOperator(name ?? '')
//               }}
//               onSearch={(e) => {
//                 setSearchOperator(e)
//                 const name = operators.find((operator) => operator.id === e)
//                   ?.nameTh
//                 if (!name) onChange('')
//               }}
//               value={searchOperator}
//               options={
//                 operators?.map((operator) => ({
//                   label: operator.nameTh,
//                   value: operator.id,
//                 })) ?? []
//               }
//             />
//           )}
//         />
//         <Controller
//           control={methods.control}
//           name="message"
//           render={({ field }) => (
//             <RichTextInput
//               label="รายละเอียดเอกสาร"
//               placeholder="กรอกรายละเอียด"
//               {...field}
//             />
//           )}
//         />
//         <Controller
//           control={methods.control}
//           name="isEditable"
//           render={({ field: { value, onChange } }) => (
//             <div>
//               <p className="block text-sm font-medium text-gray-800">
//                 สิทธิ์การแก้ไข
//               </p>
//               <label className="mt-2 flex items-center gap-2">
//                 <input
//                   className="rounded-sm accent-blue-500"
//                   type="checkbox"
//                   checked={value}
//                   onChange={onChange}
//                 />
//                 <span className="text-sm">
//                   อนุญาตให้ผู้รับเอกสารแก้ไขเอกสารแทนตนเองได้
//                 </span>
//               </label>
//             </div>
//           )}
//         />
//       </form>
//     )
//   }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={close}
//       title="ดำเนินการ"
//       width="531px"
//       actions={
//         <div className="flex gap-4">
//           <Button label="ยกเลิก" variant="outline-blue" onClick={close} />
//           <Button
//             label="ยืนยัน"
//             disabled={
//               !methods.formState.isValid &&
//               documentStatus === DocumentStatus.PROCESSING
//             }
//             onClick={() => {
//               if (documentStatus === DocumentStatus.PROCESSING)
//                 methods.handleSubmit(onProcessSubmit)()
//               else onNonProcessSubmit()
//             }}
//           />
//         </div>
//       }
//       content={
//         <div className="flex flex-col gap-5 px-6">
//           <RadioGroup
//             label="เลือกดำเนินการ"
//             options={[
//               { value: DocumentStatus.PROCESSING, label: 'ส่งเอกสาร' },
//               {
//                 value: DocumentStatus.DRAFT,
//                 label: 'บันทึกฉบับร่าง',
//               },
//               { value: DocumentStatus.COMPLETED, label: 'เสร็จสิ้นทันที' },
//             ]}
//             value={documentStatus}
//             onChange={setDocumentStatus}
//           />
//           {renderCreateDocumentForm()}
//           {documentStatus === DocumentStatus.COMPLETED && (
//             <p>
//               เอกสารจะถูกบันทึกไว้ในระบบ โดยมีสถานะเสร็จสิ้นแล้ว
//               ท่านจะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
//             </p>
//           )}
//         </div>
//       }
//     />
//   )
// }

// export default CreateDraftDocumentModal
export default null
