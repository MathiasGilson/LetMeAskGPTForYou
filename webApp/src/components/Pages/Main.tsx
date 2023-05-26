import React, { useState } from "react"

import { CheckCircleIcon, XCircleIcon, ClipboardCopyIcon } from "@heroicons/react/outline"
import Render from "#commons/Render"
export default () => {
    const [query, setQuery] = useState("")
    const [copied, setCopied] = useState(false)
    return (
        <div className="mt-6 w-full">
            <div className="flex items-center w-full justify-center">
                <input
                    className="border-2 max-w-xl w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    placeholder="Enter your query here"
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setCopied(false)
                    }}
                />
            </div>

            {query !== "" && (
                <div>
                    <div className="flex flex-col items-center justify-center mt-10 w-full">
                        <div className="max-w-xl w-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Generated link
                            </label>
                            <div className="mt-2 flex rounded-md shadow-sm">
                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                    <input
                                        type="text"
                                        name="link"
                                        id="link"
                                        className="block w-full rounded-none rounded-l-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={`https://lmagptfy.com/q/?query=${query.replace(/ /g, "%20")}`}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `https://lmagptfy.com/q/?query=${query.replace(/ /g, "%20")}`
                                        )
                                        setCopied(true)
                                    }}
                                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Copy link
                                    <ClipboardCopyIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        {copied && (
                            <div className="rounded-md bg-green-100 p-4 mt-4 max-w-xl w-full">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-800">Link copied!</p>
                                    </div>
                                    <div className="ml-auto pl-3">
                                        <div className="-mx-1.5 -my-1.5">
                                            <button
                                                type="button"
                                                onClick={() => setCopied(false)}
                                                className="inline-flex rounded-md bg-green-100 p-1.5 text-green-500 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                            >
                                                <span className="sr-only">Dismiss</span>
                                                <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center mt-10">Preview</div>
                    <div className="h-[560px] -mt-6 overflow-hidden">
                        <Render showSteps={false} query={query} />
                    </div>
                </div>
            )}
        </div>
    )
}
