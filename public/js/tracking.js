/* eslint-disable no-undef */
const sendTrackingMessage = async () => {
    const accessOn = moment().format('YYYY/MM/DD hh:mm A');

    const page = document.title;
    const response = await fetch('https://ifconfig.me/all.json');
    const userInfo = await response.json();
    const userIp = userInfo.ip_addr;
    const url = window.location.pathname + window.location.search;
    const display = `${window.innerWidth} x ${window.innerHeight}`;

    // Track repeat access.
    const storageKey = 'repeat-access';
    const repeatAccess = Number(localStorage.getItem(storageKey) || 1);
    localStorage.setItem(storageKey, repeatAccess + 1);

    // Build and send messgae.
    const message = `Post Design Monitor!\n\nPage : ${page}\nURL : ${url}\nDisplay : ${display}\nIP Address : ${userIp}\nRepeat Access: ${repeatAccess}\nAccess On : ${accessOn}`;
    await fetch('/api/trackings', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
        }),
    });

    // Done.
    return true;
};
