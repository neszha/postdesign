/* eslint-disable prefer-destructuring */
const form = document.getElementById('order-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Loading button.
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.innerText = 'Loading...';

    // Get post body.
    const formData = new FormData(form);
    const body = {};
    for (const entry of formData.entries()) {
        body[entry[0]] = entry[1];
    }
    const url = window.location.pathname + window.location.search;
    const display = `${window.innerWidth} x ${window.innerHeight}`;

    // Save order log.
    const message = `Post Design Order!\n\nName : ${body.name}\nType : ${body.type}\nSpesification : ${body.spesification}\n\nURL : ${url}\nDisplay: ${display}`;
    await fetch('/api/trackings?order=true', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
        }),
    });

    // Redirect to WhatsApp.
    btn.innerText = 'Redirect...';
    const messageRaw = `Halo Kak! Saya tertarik untuk menggunakan jasa dari Post Design. Berikut adalah detail pesanan saya:\n\nNama: ${body.name}\nTipe: ${body.type}\nSpesifikasi: ${body.spesification}\nTambahan: -\n\nTerima kasih atas bantuannya. Saya tunggu balasannya segera`;
    const redirectLink = `https://wa.me/${body.cs_number}?text=${encodeURI(messageRaw)}`;
    window.location.href = redirectLink;
});
