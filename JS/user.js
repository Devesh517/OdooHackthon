// =============================
// 🚀 APP INIT
// =============================
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    // 🔐 If no token → go to login
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Load everything
    loadUserProfile();
    loadDummyListings();
});


// =============================
// 👤 LOAD USER PROFILE
// =============================
async function loadUserProfile() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:8080/api/user/profile", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        // ❌ If unauthorized → logout
        if (response.status === 401 || response.status === 403) {
            console.log("Token expired or invalid");
            logout();
            return;
        }

        const user = await response.json();

        // ✅ Fill user data
        document.getElementById("userName").innerText =
            user.fullName || user.username || "User";

        document.getElementById("userEmail").innerText =
            user.email || "N/A";

        document.getElementById("userPhone").innerText =
            user.phone || "N/A";

    } catch (error) {
        console.error("Error fetching user:", error);
    }
}


// =============================
// 🚪 LOGOUT
// =============================
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}


// =============================
// ➕ ADD NEW LISTING
// =============================
function addNewListing() {
    alert("Add listing feature coming soon 🚀");
}


// =============================
// 📦 FILTER LISTINGS
// =============================
function filterListings(type, btn) {
    document.querySelectorAll(".filter-btn")
        .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    console.log("Filter:", type);
}


// =============================
// 📊 DUMMY LISTINGS (UI)
// =============================
