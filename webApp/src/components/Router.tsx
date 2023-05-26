import React from "react"
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom"

import Query from "./Pages/Query"
import Main from "./Pages/Main"
import Container from "./Layout/Container"

export default () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Container />}>
                        <Route index element={<Main />} />
                    </Route>
                    <Route path="/q" element={<Query />} />

                    <Route path="*" element={<Navigate to="/main" replace />} />
                </Routes>
            </div>
        </Router>
    )
}
