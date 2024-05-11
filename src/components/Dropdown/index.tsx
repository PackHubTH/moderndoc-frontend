import DropdownItem from './DropdownItem'
import { DropdownSectionType } from './types'

type PropsType = {
  label: string
  dropdownSection: DropdownSectionType[]
}

const Dropdown: React.FC<PropsType> = ({ dropdownSection, label }) => {
  return (
    <div className="hs-dropdown relative z-20 inline-flex">
      <button
        id="hs-dropdown-with-title"
        type="button"
        className="hs-dropdown-toggle inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 "
      >
        {label}
        <svg
          className="h-4 w-4 hs-dropdown-open:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className="hs-dropdown-menu duration mt-2 hidden min-w-[15rem] divide-y divide-gray-200 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100"
        aria-labelledby="hs-dropdown-with-title"
      >
        {dropdownSection.map((section) => (
          <div className="py-2 first:pt-0 last:pb-0">
            {section.title && (
              <span className="block px-3 py-2 text-xs font-medium uppercase text-gray-400">
                {section.title}
              </span>
            )}
            {section.lists.map((list, index) => (
              <DropdownItem key={`${list.displayText}-${index}`} {...list} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
