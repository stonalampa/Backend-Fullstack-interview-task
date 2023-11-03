import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LazyLogin = lazy(() => import("../components/Login"));
const LazyRegister = lazy(() => import("../components/Register"));
const LazyTasks = lazy(() => import("../components/Tasks"));

export default function Router() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/login" element={<LazyLogin />} />
                <Route path="/register" element={<LazyRegister />} />
                <Route path="/tasks" element={<LazyTasks />} />
                {/* <Route
                    path="/*"
                    element={
                        <AuthGuard>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate to="/tasks" /> // Redirect to /tasks
                                    }
                                />
                            </Routes>
                        </AuthGuard>
                    }
                /> */}
            </Routes>
        </Suspense>
    );
}
