import React from "react"

import Render from "#commons/Render"
export default () => {
    const params = new URLSearchParams(window.location.search)
    const query = params.get("query")?.replace(/%20/g, " ") ?? ""
    return (
        <div className="bg-slate-50 ">
            <Render showSteps={true} query={query} />
        </div>
    )
}
