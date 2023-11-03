import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./router/router";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </SnackbarProvider>
            </QueryClientProvider>
        </>
    );
};
