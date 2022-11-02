import { createContext, useReducer } from "react";
import reducers from "./reducers";
// import cookie from "js-cookie";
// import axios from "axios";
// import { ACTIONS } from "./actions";
// import { showNotification } from "@mantine/notifications";
// import { IconInfoCircle } from "@tabler/icons";
// import Utils from "../utils/hardcoded";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    let initialState = { sidebar: " hide", theme: "light" };
    const [state, dispatch] = useReducer(reducers, initialState);
    // const validateSession = async () => {
    //     const token = cookie.get("theharshvsAuth");
    //     if (token) {
    //         try {
    //             const response = await axios({
    //                 method: "GET",
    //                 url: `${Utils.BASE_URL}/v1/user/load-session`,
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    //             if (response.data.success) {
    //                 dispatch({ type: ACTIONS.AUTH, payload: response.data.data });
    //             }
    //         } catch (err) {
    //             cookie.remove("theharshvsAuth");
    //             showNotification({
    //                 title: "Oops",
    //                 message: err.response.data.message,
    //                 color: "violet",
    //                 icon: <IconInfoCircle />,
    //             });
    //             dispatch({ type: ACTIONS.AUTH, payload: null });
    //         }
    //     } else dispatch({ type: ACTIONS.AUTH, payload: null });
    // };

    // useEffect(() => {
    //     validateSession();
    // }, []);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};