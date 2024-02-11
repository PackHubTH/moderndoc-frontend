import { DropdownSectionType } from './types'

type PropsType = {
  label: string
  dropdownSection: DropdownSectionType[]
}

const Dropdown: React.FC<PropsType> = ({ dropdownSection, label }) => {
  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-with-title"
        type="button"
        className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
      >
        {label}
        <svg
          className="hs-dropdown-open:rotate-180 w-4 h-4"
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
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200"
        aria-labelledby="hs-dropdown-with-title"
      >
        {dropdownSection.map((section) => (
          <div className="py-2 first:pt-0 last:pb-0">
            {section.title && (
              <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400">
                {section.title}
              </span>
            )}
            {section.lists.map((list, index) => (
              <a
                key={`${list.displayText}-${index}`}
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 "
                href="#"
                onClick={list.onClick}
              >
                {list.icon}
                {list.displayText}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
