import React from "react"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom"

export default () => {
    return (
        <>
            <NavBar />
            <div className="flex flex-col h-screen bg-slate-50 pt-[64px]">
                <Outlet />
            </div>
        </>
    )
}
