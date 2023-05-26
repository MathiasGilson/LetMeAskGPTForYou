import React from "react"

import { Link, useLocation } from "react-router-dom"

import Logo from "#commons/Logo"

export default () => {
    const location = useLocation()

    const PAGES: any = []

    return (
        <nav className="bg-white shadow-sm fixed z-10 w-full">
            <div className="mx-auto px-4">
                <div className="flex items-center justify-center h-16">
                    <div className="flex items-center">
                        <a className="text-gray-700 text-2xl flex flex-row items-center justify-center" href="/">
                            <Logo className="h-6" />
                        </a>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex items-center justify-center">
                        <div className="hidden sm:block sm:mr-6">
                            <div className="flex space-x-4 text-base">
                                {PAGES.map(({ name, path }: any) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className={classNames(
                                            path === location.pathname
                                                ? "text-black font-bold"
                                                : "text-gray-500 hover:text-gray-600"
                                        )}
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}
