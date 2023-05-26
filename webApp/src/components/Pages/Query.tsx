import React from "react"

import Render from "#commons/Render"
export default () => {
    const params = new URLSearchParams(window.location.search)
    const queryParam = params.get("query") ?? ""
    const query = atob(queryParam)
    return (
        <div className="bg-slate-50 min-h-screen">
            <Render showSteps={true} query={query} />

            <a href="/" className="text-center block text-blue-500 hover:text-blue-900 -mt-24">
                Generate a similar tutorial yourself
            </a>
        </div>
    )
}
