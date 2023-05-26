import React, { useState, useEffect, useRef } from "react"
import { useSpring, animated as a } from "react-spring"

import Render from "#commons/Render"
export default () => {
    const params = new URLSearchParams(window.location.search)
    const query = params.get("q")?.replace(/%20/g, " ") ?? ""
    return (
        <div className="bg-slate-50 ">
            <Render showSteps={true} query={query} />
        </div>
    )
}
