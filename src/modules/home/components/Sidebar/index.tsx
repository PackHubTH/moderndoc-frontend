import { SIDE_BAR_MENUS } from './constant'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const currentPath = window.location.pathname

  return (
    <div
      id="docs-sidebar"
      className="hs-overlay :border-gray-700 fixed bottom-0 start-0 top-0 z-[60] mt-[68px] hidden w-[260px] -translate-x-full transform overflow-y-auto border-e border-gray-200 bg-blue-100 pb-10 transition-all duration-300  hs-overlay-open:translate-x-0 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2"
    >
      <nav
        className="hs-accordion-group flex w-full flex-col flex-wrap p-6 pt-5"
        data-hs-accordion-always-open
      >
        <ul className="space-y-2">
          {SIDE_BAR_MENUS.map((menu) => (
            <li>
              <a
                css={[
                  tw`flex cursor-pointer items-center gap-x-3.5 rounded-lg bg-transparent px-2.5 py-2.5 text-sm text-slate-700 hover:bg-blue-600 hover:text-white`,
                  currentPath === menu.link && tw`bg-blue-600 text-white`,
                ]}
                onClick={() => {
                  menu.link && currentPath !== menu.link
                    ? navigate(menu.link)
                    : undefined
                }}
              >
                {menu.icon}
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
