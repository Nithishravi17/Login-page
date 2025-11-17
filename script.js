// ✅ Dynamically populate countries and states using CDN API
document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("country");
  const stateSelect = document.getElementById("state");

  // Load countries from API
  fetch("https://countriesnow.space/api/v0.1/countries/positions")
    .then(res => res.json())
    .then(data => {
      data.data.forEach(country => {
        const option = document.createElement("option");
        option.value = country.name;
        option.textContent = country.name;
        countrySelect.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading countries:", err));

  // Load states based on selected country
  countrySelect.addEventListener("change", function () {
    const selectedCountry = this.value;
    stateSelect.innerHTML = '<option value="">Select State</option>';

    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then(res => res.json())
      .then(data => {
        const found = data.data.find(c => c.name === selectedCountry);
        if (!found) return;

        found.states.forEach(state => {
          const option = document.createElement("option");
          option.value = state.name;
          option.textContent = state.name;
          stateSelect.appendChild(option);
        });
      })
      .catch(err => console.error("Error loading states:", err));
  });
});

// Validate the form
function validateForm() {
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const age = document.getElementById("age").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.querySelector("input[name='gender']:checked");
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;

  if (fname === "") { alert("First Name cannot be empty!"); return false; }
  if (lname === "") { alert("Last Name cannot be empty!"); return false; }
  if (age === "" || isNaN(age) || age <= 0) { alert("Age must be >0!"); return false; }
  if (!email.startsWith("@") || email !== email.toLowerCase()) {
    alert("Email must start with '@' and be lowercase!");
    return false;
  }
  if (!gender) { alert("Select gender!"); return false; }
  if (country === "") { alert("Select country!"); return false; }
  if (state === "") { alert("Select state!"); return false; }

  document.getElementById("output").innerText =
    `Hello ${fname} ${lname}, age ${age}, email: ${email}`;

  return false;
}

