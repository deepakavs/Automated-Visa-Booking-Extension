

chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
    // console.log('(background.js) message recieved: '+request.message);
    let dates = request.message;
    if( request.type === "reload" ) {
    } else  if(request.type === "slotavailable") {
        console.log(dates);
        chrome.notifications.create('slotavailable', {
            type: 'basic',
            iconUrl: 'visastamp.png',
            title: 'US Visa slots \n',
            message: dates.toString(),
            priority: 2
        })
        sendToDiscord(dates.toString());
    }

    function sendToDiscord(message){
        fetch(
            '<webhookUrl>',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // the username to be displayed
                    username: 'webhook',
                    // the avatar to be displayed
                    avatar_url:
                        'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
                    // contents of the message to be sent
                    content: message,
                    // enable mentioning of individual users or roles, but not @everyone/@here
                    allowed_mentions: {
                        parse: ['users', 'roles'],
                    },
                }),
            }
        );
    }
});