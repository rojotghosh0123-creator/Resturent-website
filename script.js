// Function to fetch menu items from Google Sheetasync function loadMenu() {
    const sheetId = '1nzr13DaAJBZpxcmHduZeTLwDtAVuz0Md959wsmj_G9o';
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=Sheet1`;

    try {
        const response = await fetch(url);
        const text = await response.text();

        // Remove extra stuff to parse JSON
        const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s)[1]);

        const rows = json.table.rows;

        const menuContainer = document.getElementById('menu-items');
        menuContainer.innerHTML = '';

        rows.forEach(row => {
            const name = row.c[0].v; // first column
            const price = row.c[1].v; // second column

            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <h3>${name}</h3>
                <p>${price}</p>
            `;
            menuContainer.appendChild(itemDiv);
        });

    } catch (error) {
        console.error('Error loading menu:', error);
        document.getElementById('menu-items').innerHTML = '<p>Sorry, menu is temporarily unavailable.</p>';
    }
}

window.addEventListener('load', loadMenu);

