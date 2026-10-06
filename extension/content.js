// Cheat by https://github.com/akatiggerx04
// Please don't use this cheat to ruin this game for others.

(() => {
    const BUTTON_ID = 'openguessr-cheat-button';

    function extractLatLng(iframe) {
        const params = new URL(iframe.src).searchParams;
        const location = params.get('location');
        if (!location) return null;

        const [lat, lng] = location.split(',');
        return lat && lng ? [lat, lng] : null;
    }

    function findLatLng() {
        for (const iframe of document.querySelectorAll('iframe')) {
            if (iframe.src && iframe.src.includes('google.com/maps/embed')) {
                const latLng = extractLatLng(iframe);
                if (latLng) return latLng;
            }
        }
        return null;
    }

    function openModal(lat, lng) {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;z-index:2147483646;';

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.google.com/maps?q=${lat},${lng}&t=m&z=3&output=embed`;
        iframe.style.cssText = 'width:800px;height:600px;border:none;border-radius:10px;background-color:gray;';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.cssText = 'position:absolute;top:10px;right:10px;background:red;color:white;padding:10px 20px;border:none;border-radius:10px;cursor:pointer;';
        closeButton.onclick = () => modal.remove();

        modal.append(iframe, closeButton);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        document.body.appendChild(modal);
    }

    function handleClick() {
        const latLng = findLatLng();
        if (!latLng) {
            console.log('No coordinates found, start a round first');
            return;
        }
        console.log(`Found the coordinates: ${latLng[0]}, ${latLng[1]}`);
        openModal(latLng[0], latLng[1]);
    }

    function initCheat() {
        if (document.getElementById(BUTTON_ID)) return;

        const button = document.createElement('button');
        button.id = BUTTON_ID;
        button.textContent = 'Find Coordinates';
        button.style.cssText = 'position:fixed;top:20px;right:20px;background:red;color:white;padding:10px 20px;border:none;border-radius:10px;cursor:pointer;z-index:2147483647;font-size:14px;';
        button.onclick = handleClick;
        document.body.appendChild(button);

        console.log('%cOpenGuesser Cheat Initiated! \nCheat by akatiggerx04 :D \nDon\'t use this cheat to ruin this game for others.',
            'background: red; color: white; font-size: 20px; padding: 10px; font-weight: bold;');
    }

    initCheat();
})();
