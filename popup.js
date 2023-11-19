document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get('apiToken', function(data) {
        if (data.apiToken) {
            apiToken = data.apiToken;
            document.getElementById('mainContainer').style.display = 'block';
            fetchZones(apiToken); // Call fetchZones with the retrieved token
        } else {
            document.getElementById('tokenFormContainer').style.display = 'block';
        }
    });

    document.getElementById('saveTokenButton').addEventListener('click', function() {
        var token = document.getElementById('apiTokenInput').value;
        chrome.storage.sync.set({'apiToken': token}, function() {
            apiToken = token;
            document.getElementById('tokenFormContainer').style.display = 'none';
            document.getElementById('mainContainer').style.display = 'block';
            fetchZones(apiToken); // Call fetchZones with the new token
        });
    });

    document.getElementById('changeTokenButton').addEventListener('click', function() {
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('tokenFormContainer').style.display = 'block';
        document.getElementById('apiTokenInput').value = '';
    });
});

// This function updates the message element in the popup
function updateMessage(text, isError = false) {
    var messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.style.color = isError ? 'tomato' : 'green';
}

function fetchZones(apiToken, page = 1) {
    const perPage = 50;
    const url = `https://api.cloudflare.com/client/v4/zones?per_page=${perPage}&page=${page}`;

    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + apiToken,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            var zones = data.result;
            var totalZones = data.result_info.total_count;
            var zoneSelect = document.getElementById('zone');

            zones.forEach(zone => {
                var option = document.createElement('option');
                option.value = zone.id;
                option.textContent = zone.name;
                zoneSelect.appendChild(option);
            });

            var fetchedZones = zones.length + (page - 1) * 50;
            if (fetchedZones < totalZones) {
                fetchZones(page + 1);
            }
        } else {
            updateMessage('Error fetching zones: ' + data.errors.map(e => e.message).join(', '), true);
        }
    })
    .catch(error => {
        console.error('Error fetching zones:', error);
        updateMessage('Error fetching zones: ' + error.message, true);
    });
}

// This function handles the form submission.
// It creates a DNS record based on the form inputs.
document.getElementById('dnsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var zoneId = document.getElementById('zone').value;
    var type = document.getElementById('type').value;
    var name = document.getElementById('name').value;
    var content = document.getElementById('content').value;
    var proxied = document.getElementById('proxied').value === 'true';

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + apiToken);
    headers.append('Content-Type', 'application/json');

    var body = JSON.stringify({
        type: type,
        name: name,
        content: content,
        proxied: proxied
    });

    fetch('https://api.cloudflare.com/client/v4/zones/' + zoneId + '/dns_records', {
        method: 'POST',
        headers: headers,
        body: body
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateMessage('DNS record created successfully.');
        } else {
            updateMessage('Error creating DNS record: ' + data.errors.map(e => e.message).join(', '), true);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        updateMessage('An error occurred: ' + error.message, true);
    });
});
