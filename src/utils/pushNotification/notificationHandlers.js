import notifee from '@notifee/react-native';
export async function onDisplayNotificationRemote(data) {

    console.log("data fromFCM", JSON.stringify(data, null, 2))

    const { notification, messageId } = data;
    const { body, title } = notification;


    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: messageId,//'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: title,//'Notification Title',
        body: body, //'Main body content of the notification',
        android: {
            channelId,
            // smallIcon: "https://sportshub.cbsistatic.com/i/2021/08/04/089d81bc-203e-4912-a947-1d8b1b74236e/rick-and-morty-season-5-episode-3-morty-adult-swim-1274605.jpg", // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: messageId //'default',
            },
        },
    });
}


export async function onDisplayNotificationLocal(body, title, messageId = "default") {

    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: messageId,//'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: title,//'Notification Title',
        body: body, //'Main body content of the notification',
        android: {
            channelId,
            // smallIcon: "https://sportshub.cbsistatic.com/i/2021/08/04/089d81bc-203e-4912-a947-1d8b1b74236e/rick-and-morty-season-5-episode-3-morty-adult-swim-1274605.jpg", // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: messageId //'default',
            },
        },
    });
}