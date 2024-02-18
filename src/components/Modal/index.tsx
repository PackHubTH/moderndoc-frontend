type PropsType = {
  label?: string
}
const Modal: React.FC<PropsType> = () => {
  return (
    <>
      <div className="text-center">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-hs-overlay="#hs-modal-upgrade-to-pro"
        >
          Open modal
        </button>
      </div>

      <div
        id="hs-modal-upgrade-to-pro"
        className="hs-overlay size-full fixed start-0 top-0 z-[80] hidden overflow-y-auto overflow-x-hidden"
      >
        <div className="m-3 mt-0 opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="pointer-events-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-xl font-semibold text-gray-800 dark:text-gray-200 sm:text-2xl">
                  Advanced features
                </h2>
                <div className="mx-auto max-w-sm">
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    "Compare to" Price, Bulk Discount Pricing, Inventory
                    Tracking
                    <a
                      className="font-medium text-blue-600 decoration-2 hover:underline"
                      href="../examples/html/modal-signup.html"
                    >
                      Sign up here
                    </a>
                  </p>
                </div>
                <div className="mt-5">
                  <a
                    className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    <svg
                      className="size-4 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    Upgrade to get these features
                  </a>
                </div>
              </div>

              <div className="mt-8 divide-y divide-gray-200 dark:divide-gray-700 sm:mt-10">
                {/* <!-- Icon --> */}
                <div className="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                  <svg
                    className="size-7 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400"
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      "Compare to" price
                    </h3>
                    <p className="text-sm text-gray-500">
                      Use this feature when you want to put a product on sale or
                      show savings off suggested retail pricing.
                    </p>
                  </div>
                </div>
                {/* <!-- End Icon --> */}

                {/* <!-- Icon --> */}
                <div className="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                  <svg
                    className="size-7 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400"
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
                    <circle cx="6" cy="6" r="3" />
                    <path d="M8.12 8.12 12 12" />
                    <path d="M20 4 8.12 15.88" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M14.8 14.8 20 20" />
                  </svg>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Bulk discount pricing
                    </h3>
                    <p className="text-sm text-gray-500">
                      Encourage higher purchase quantities with volume
                      discounts.
                    </p>
                  </div>
                </div>
                {/* <!-- End Icon --> */}

                {/* <!-- Icon --> */}
                <div className="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                  <svg
                    className="size-7 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400"
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
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Inventory tracking
                    </h3>
                    <p className="text-sm text-gray-500">
                      Automatically keep track of product availability and
                      receive notifications when inventory levels get low.
                    </p>
                  </div>
                </div>
                {/* <!-- End Icon --> */}
              </div>
            </div>

            {/* <!-- Footer --> */}
            <div className="flex items-center justify-end gap-x-2 border-t p-4 dark:border-gray-700 sm:px-7">
              <button
                type="button"
                className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-notifications"
              >
                Cancel
              </button>
              <a
                className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Upgrade now
              </a>
            </div>
            {/* <!-- End Footer --> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
