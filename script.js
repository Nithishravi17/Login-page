// ✅ Dynamically populate countries and states using CDN API
document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

  // Load countries from a free CDN-based API
  fetch("https://countriesnow.space/api/v0.1/countries/positions")
    .then(res => res.json())
    .then(data => {
      data.data.forEach(country => {
        const option = document.createElement("option");
        option.value = country.name.toLowerCase();
        option.textContent = country.name;
        countrySelect.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading countries:", err));

  // When country changes, load its states
  countrySelect.addEventListener("change", function () {
    const selectedCountry = this.options[this.selectedIndex].text;
    stateSelect.innerHTML = '<option value="">Select State</option>';

    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then(res => res.json())
      .then(data => {
        const found = data.data.find(c => c.name === selectedCountry);
        if (found) {
          found.states.forEach(state => {
            const option = document.createElement("option");
            option.value = state.name.toLowerCase();
            option.textContent = state.name;
            stateSelect.appendChild(option);
          });
        }
      })
      .catch(err => console.error("Error loading states:", err));
  });
});


// ✅ Your existing code (unchanged)
function updateStates() {
  const country = document.getElementById("country").value;
  const stateSelect = document.getElementById("state");
  
  // Clear previous states
  stateSelect.innerHTML = '<option value="">Select State</option>';

  let states = [];

  if (country === "india") {
    states = ["Tamil Nadu", "Kerala", "Karnataka", "Maharashtra"];
  } else if (country === "usa") {
    states = ["California", "Texas", "New York", "Florida"];
  }

  // Add new states dynamically
  states.forEach(state => {
    const option = document.createElement("option");
    option.value = state.toLowerCase();
    option.textContent = state;
    stateSelect.appendChild(option);
  });
}

// Validate the form before submitting
function validateForm() {
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const age = document.getElementById("age").value.trim();
  const email = document.getElementById("email").value.trim();
  
  // Check age must be number and positive
  if (isNaN(age) || age <= 0) {
    alert("Age must be a valid number greater than 0!");
    return false;
  }

  // Check email validation: must start with @ and all lowercase
  if (!email.startsWith("@") || email !== email.toLowerCase()) {
    alert("Email must start with '@' and contain only lowercase letters!");
    return false;
  }

  document.getElementById("output").innerText =
    `Hello ${fname} ${lname}, age ${age}, email: ${email}`;
    
  return false; // prevent actual form submission for demo
}

function validateForm() {
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const age = document.getElementById("age").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.querySelector("input[name='gender']:checked");
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;

  if (fname === "") {
    alert("First Name cannot be empty!");
    return false;
  }

  if (lname === "") {
    alert("Last Name cannot be empty!");
    return false;
  }

  if (age === "" || isNaN(age) || age <= 0) {
    alert("Age must be a valid number greater than 0!");
    return false;
  }

  if (!email.startsWith("@") || email !== email.toLowerCase()) {
    alert("Email must start with '@' and contain only lowercase letters!");
    return false;
  }

  if (!gender) {
    alert("Please select a gender!");
    return false;
  }

  if (country === "") {
    alert("Please select a country!");
    return false;
  }

  if (state === "") {
    alert("Please select a state!");
    return false;
  }

  document.getElementById("output").innerText =
    `Hello ${fname} ${lname}, age ${age}, email: ${email}`;

  return false;
}


