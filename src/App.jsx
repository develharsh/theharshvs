import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useContext } from "react"
import { DataContext } from "./store/globalstate"
import Home from "./pages/Home/Home";
import The404 from "./pages/The404";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const { state } = useContext(DataContext);
  return (
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: state.theme,
          breakpoints: {
            xs: 500,
            sm: 800,
            md: 1000,
            lg: 1200,
            xl: 1400,
          },
        }}
      >
        <NotificationsProvider autoClose={4000}>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              {/* <Route path="employer">
                <Route index element={<Home />} />
                <Route path="dashboard" element={<OrgDashboard />} />
                <Route path="employees" element={<OrgEmployees />} />
                <Route path="policies" element={<OrgPolicy />} />
                <Route path="claims" element={<OrgClaim />} />
              </Route> */}
            </Route>
            <Route path="*" element={<The404 />} />
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;