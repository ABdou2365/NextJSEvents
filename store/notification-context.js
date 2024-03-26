const { createContext } = require("react");

const NotificationContext = createContext({
    notification, // title , message , status
    showNotification: function () {},
    hideNotification : function (){}
})

export function NotificationContextProvider(props) {
    return (
        <NotificationContext.Provider>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;