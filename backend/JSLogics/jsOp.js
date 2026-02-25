const API_URL = 'https://wylhzoihzh.execute-api.ap-south-1.amazonaws.com/Prod/items';

async function sendData() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (!name || !age) {
        alert("Please fill in both fields");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age })
        });

        if (response.ok) {
            alert('Record Added Successfully!');
            fetchRecords(); // Refresh the list automatically
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchRecords() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        
        const listDiv = document.getElementById('recordList');
        listDiv.innerHTML = ''; // Clear current list

        items.forEach(item => {
            listDiv.innerHTML += `
                <div style="border: 1px solid #ccc; margin: 5px; padding: 5px;">
                    <strong>${item.name}</strong> - Age: ${item.age} <br>
                    <small>ID: ${item.uniqueId}</small> <br>
                    <button onclick="deleteRecord('${item.uniqueId}')" style="color: red;">Delete</button>
                </div>`;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function deleteRecord(id) {
    if (!confirm('Are you sure you want to delete this?')) return;

    // We use '?id=' to match what the backend is looking for
    const deleteUrl = `${API_URL}?id=${id}`; 

    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Deleted!');
            fetchRecords(); 
        } else {
            const err = await response.json();
            alert('Error: ' + err.message);
        }
    } catch (error) {
        console.error('Error deleting:', error);
    }
}


// Load records automatically when page opens
window.onload = fetchRecords;