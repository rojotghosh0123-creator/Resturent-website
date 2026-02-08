// Function to fetch menu items from Google Sheet
async function loadMenu() {
    const sheetId = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your actual Google Sheet ID (see Step 1)
    const url = `https://docs.google.com/spreadsheets/d/1nzr13DaAJBZpxcmHduZeTLwDtAVuz0Md959wsmj_G9o/edit?usp=sharing
`; // Assumes sheet name is "Sheet1"; change if different

    try {
        const response = await fetch(url);
        const data = await response.json(); // Data is an array of objects like [{Name: "Burger", Price: "$12.99"}, ...]

        const menuContainer = document.getElementById('menu-items');
        menuContainer.innerHTML = ''; // Clear any existing content

        data.forEach(item => {
            // Create a div for each menu item
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <h3>${item.Name}</h3>
                <p>${item.Price}</p>
            `;
            menuContainer.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error loading menu:', error);
        // Fallback: Show a message if fetch fails
        document.getElementById('menu-items').innerHTML = '<p>Sorry, menu is temporarily unavailable.</p>';
    }
}

// WhatsApp Order Button
document.getElementById('whatsapp-btn').addEventListener('click', function() {
    const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number (e.g., '1234567890' without + or spaces)
    const message = encodeURIComponent('Hello, I want to place an order.'); // Pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank'); // Opens in new tab
});

// Order Now Button (scrolls to menu)
document.getElementById('order-btn').addEventListener('click', function() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
});

// Load menu when page loads

window.addEventListener('load', loadMenu);


