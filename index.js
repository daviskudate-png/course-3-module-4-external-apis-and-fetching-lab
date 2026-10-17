// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
async function fetchWeatherAlerts(state) {
    try {
     const response = await fetch(
            `https://api.weather.gov/alerts/active?area=${state}`
        );
        if (!state) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayAlerts(data);
        clearError();
        return data;
    } catch (error) {
        showError(error.message);
    }
    }
    
    function displayAlerts(data) {
        const alertsDisplay = document.getElementById("alerts-display");
        alertsDisplay.innerHTML ="";
         const summary=document.createElement("p");
         summary.textContent= `${data.title}: ${data.features.length}`;
         alertsDisplay.appendChild(summary);
        
         const list = document.createElement("ul");
         data.features.forEach(alert=> {
            const li=document.createElement("li");
            li.textContent=alert.properties.headline;
            list.appendChild(li);
         });
         alertsDisplay.appendChild(list);
        }
    
    
        function showError(message) {
            const errorDiv = document.getElementById("error-message");
            errorDiv.textContent= message;
            errorDiv.classList.remove("hidden");
        }
        function clearError() {
            const errorDiv= document.getElementById("error-message");
            errorDiv.textContent="";
            errorDiv.classList.add("hidden")
        }

    

        function handleFetch() {
            const input =document.getElementById("state-input");
            const state = input.value.trim().toUpperCase();
            input.value= "";
            fetchWeatherAlerts(state);
        }
        document.getElementById("fetch-alerts").addEventListener("click", handleFetch);


    