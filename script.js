const apiKey = "f2a0ac83-0831-4db3-a194-392ec2773751";
const matchId = "b9ade71d-2e58-477c-ace1-33bf8f396353";
const url = `https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`;
const defaultTeam1Img = "https://i.postimg.cc/Zn7HmyGs/KKr-min-removebg-preview.png";
const defaultTeam2Img = "https://i.postimg.cc/tJK1FqWC/srh-min-removebg-preview.png";
let teamoneEl = document.createElement('img');
let teamtwoEl = document.createElement('img');

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Log the entire response data for inspection
        const matchData = data.data.find(match => match.id === matchId);
        console.log(matchData);  // Log the specific match data

        const matchDetailsDiv = document.querySelector('.match-details');
        const errorDiv = document.querySelector('.error');

        if (matchData) {
            matchDetailsDiv.innerHTML = `
                <h2>${matchData.series}</h2>
                <p><strong>Date and Time (GMT):</strong> 7:30 PM (26-05-2024)</p>
                <p><strong>Match Type:</strong> T20</p>
                <p><strong>Status:</strong> ${matchData.status}</p>
                <div class="teams">
                    <div class="team">
                        <img src="${defaultTeam1Img}" alt="${matchData.t1}">
                        <p>${matchData.t1}</p>
                        <p><strong>Score:</strong> ${matchData.t1s || "N/A"}</p>
                    </div>
                    <div class="team">
                        <img src="${defaultTeam2Img}" alt="${matchData.t2}">
                        <p>${matchData.t2}</p>
                        <p><strong>Score:</strong> ${matchData.t2s || "N/A"}</p>
                    </div>
                </div>
            `;
        } else {
            errorDiv.textContent = "Match ID not found";
        }
    })
    .catch(error => {
        const errorDiv = document.querySelector('.error');
        errorDiv.textContent = 'Error fetching data: ' + error.message;
    });