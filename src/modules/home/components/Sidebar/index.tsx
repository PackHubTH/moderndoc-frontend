const Sidebar = () => {
  return (
    <div
      id="docs-sidebar"
      className="hs-overlay fixed bottom-0 start-0 top-0 z-[60] hidden w-[260px] -translate-x-full transform overflow-y-auto border-e border-gray-200 bg-white pb-10 pt-7 transition-all duration-300 hs-overlay-open:translate-x-0 :border-gray-700  lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2 mt-[68px]"
    >
      <div className="px-6">
        <a
          className="flex-none text-xl font-semibold "
          href="#"
          aria-label="Brand"
        >
          Brand
        </a>
      </div>
      <nav
        className="hs-accordion-group flex w-full flex-col flex-wrap p-6"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <li>
            <a
              className="flex items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
              href="#"
            >
              <svg
                className="h-4 w-4"
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
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </a>
          </li>

          <li className="hs-accordion" id="users-accordion">
            <button
              type="button"
              className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-slate-700 hover:bg-gray-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent"
            >
              <svg
                className="h-4 w-4"
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Users
              <svg
                className="ms-auto hidden h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block"
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
                <path d="m18 15-6-6-6 6" />
              </svg>
              <svg
                className="ms-auto block h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>

            <div
              id="users-accordion"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            >
              <ul
                className="hs-accordion-group ps-3 pt-2"
                data-hs-accordion-always-open
              >
                <li className="hs-accordion" id="users-accordion-sub-1">
                  <button
                    type="button"
                    className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-slate-700 hover:bg-gray-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent"
                  >
                    ขนหมา
                    <svg
                      className="ms-auto hidden h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block "
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
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="ms-auto block h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden "
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
                    id="users-accordion-sub-1"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <ul className="ps-2 pt-2">
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                          href="#"
                        >
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                          href="#"
                        >
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                          href="#"
                        >
                          Link 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="hs-accordion" id="users-accordion-sub-2">
                  <button
                    type="button"
                    className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-slate-700 hover:bg-gray-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent"
                  >
                    Sub Menu 2
                    <svg
                      className="ms-auto hidden h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block "
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
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="ms-auto block h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden "
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
                    id="users-accordion-sub-2"
                    className="hs-accordion-content hidden w-full overflow-hidden ps-2 transition-[height] duration-300"
                  >
                    <ul className="ps-2 pt-2">
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                          href="#"
                        >
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                          href="#"
                        >
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                          href="#"
                        >
                          Link 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li className="hs-accordion" id="account-accordion">
            <button
              type="button"
              className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-slate-700 hover:bg-gray-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent"
            >
              <svg
                className="h-4 w-4"
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
                <circle cx="18" cy="15" r="3" />
                <circle cx="9" cy="7" r="4" />
                <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                <path d="m21.7 16.4-.9-.3" />
                <path d="m15.2 13.9-.9-.3" />
                <path d="m16.6 18.7.3-.9" />
                <path d="m19.1 12.2.3-.9" />
                <path d="m19.6 18.7-.4-1" />
                <path d="m16.8 12.3-.4-1" />
                <path d="m14.3 16.6 1-.4" />
                <path d="m20.7 13.8 1-.4" />
              </svg>
              Account
              <svg
                className="ms-auto hidden h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block "
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
                <path d="m18 15-6-6-6 6" />
              </svg>
              <svg
                className="ms-auto block h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden "
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>

            <div
              id="account-accordion"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            >
              <ul className="ps-2 pt-2">
                <li>
                  <a
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                    href="#"
                  >
                    Link 1
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                    href="#"
                  >
                    Link 2
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                    href="#"
                  >
                    Link 3
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="hs-accordion" id="projects-accordion">
            <button
              type="button"
              className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-slate-700 hover:bg-gray-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent"
            >
              <svg
                className="h-4 w-4"
                xmlns="ƒhttp://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
                <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
                <path d="M15 2v5h5" />
              </svg>
              Projects
              <svg
                className="ms-auto hidden h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block "
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
                <path d="m18 15-6-6-6 6" />
              </svg>
              <svg
                className="ms-auto block h-4 w-4 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden "
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </svg>
            </button>

            <div
              id="projects-accordion"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
            >
              <ul className="ps-2 pt-2">
                <li>
                  <a
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                    href="#"
                  >
                    Link 1
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                    href="#"
                  >
                    Link 2
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100"
                    href="#"
                  >
                    Link 3
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a
              className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100 "
              href="#"
            >
              <svg
                className="h-4 w-4"
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
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
              Calendar
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100 "
              href="#"
            >
              <svg
                className="h-4 w-4"
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Documentation
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
