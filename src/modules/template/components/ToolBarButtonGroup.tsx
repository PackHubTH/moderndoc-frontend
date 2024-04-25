import ToolbarButton from '@/modules/document/components/ToolbarButton'
import { ActiveToolbarButton as ButtonId } from '@/modules/document/types/ToolbarButton'
import { FaFileSignature } from 'react-icons/fa6'

const ToolBarButtonGroup = () => {
  return (
    <div className="flex h-12 items-center justify-center bg-gray-200 px-4">
      <ToolbarButton
        icon={<FaFileSignature />}
        id={ButtonId.AutoFill}
        label="Create Autofill"
        onClick={() => console.log('add')}
      />

      {/* <ToolbarButton
        icon={<FaFileSignature size={24} />}
        label="Create Autofill"
        onClick={() => console.log('add')}
      />
      <div className="flex px-10">
        <ToolbarButton
          icon={<FaFileSignature size={24} />}
          label="Undo"
          onClick={() => console.log('add')}
        />
        <ToolbarButton
          icon={<FaFileSignature size={24} />}
          label="Redo"
          onClick={() => console.log('add')}
        />
      </div>
      <div className="pl-2 pr-12">
        <ToolbarButton
          icon={<FaFileSignature size={24} />}
          label="Create Autofill"
          onClick={() => console.log('add')}
        />
      </div>
      <ToolbarButton
        icon={<FaFileSignature size={24} />}
        label="Text"
        onClick={() => console.log('add')}
      />
      <ToolbarButton
        icon={<FaFileSignature size={24} />}
        label="Sign"
        onClick={() => console.log('add')}
      />
      <ToolbarButton
        icon={<FaFileSignature size={24} />}
        label="Date"
        onClick={() => console.log('add')}
      />
      <ToolbarButton
        icon={<FaFileSignature size={24} />}
        label="Check"
        onClick={() => console.log('add')}
      />
      <ToolbarButton
        icon={<FaFileSignature size={24} />}
        label="Select"
        onClick={() => console.log('add')}
      /> */}
    </div>
  )
}

export default ToolBarButtonGroup
