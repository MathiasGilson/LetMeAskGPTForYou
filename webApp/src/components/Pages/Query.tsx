import React from "react"

import Render from "#commons/Render"
export default () => {
    const params = new URLSearchParams(window.location.search)
    const queryParam = params.get("query") ?? ""
    const query = atob(queryParam)
    return (
        <div className="bg-slate-50 ">
            <Render showSteps={true} query={query} />
        </div>
    )
}
