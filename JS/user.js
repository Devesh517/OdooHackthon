let allListings = [];
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }
    loadUserProfile();
    loadUserListings();
});
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
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
function addNewListing() {
    window.location.href = "prdctdetail.html";
}
function filterListings(type, btn) {
    document.querySelectorAll(".filter-btn")
        .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    let filteredListings = [];
    if (type === "all") {
        filteredListings = allListings;
    } else if (type === "active") {
        filteredListings = allListings.filter(
            item => item.status === "ACTIVE"
        );
    } else if (type === "traded") {
        filteredListings = allListings.filter(
            item => item.status === "TRADED"
        );
    }
    renderListings(filteredListings);
}
async function loadUserListings() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:8080/api/listings/my", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const listings = await response.json();
        allListings = listings;
        const totalListings = listings.length;
        const tradedListings = listings.filter(
            item => item.status === "TRADED"
        ).length;
        const activeListings = listings.filter(
            item => item.status === "ACTIVE"
        ).length;
        const totalPoints = listings.reduce(
            (sum, item) => sum + (item.points || 0),
            0
        );
        let memberLevel = "Bronze";
        if (totalListings >= 5) {
            memberLevel = "Silver";
        }
        if (totalListings >= 10) {
            memberLevel = "Gold";
        }
        document.getElementById("itemsListedCount").innerText =
            totalListings;
        document.getElementById("tradedCount").innerText =
            tradedListings;
        document.getElementById("ratingCount").innerText =
            "5.0";
        document.getElementById("memberLevel").innerText =
            memberLevel;
        document.getElementById("totalListings").innerText =
            totalListings;
        document.getElementById("activeListings").innerText =
            activeListings;
        document.getElementById("tradedListings").innerText =
            tradedListings;
        document.getElementById("listingPoints").innerText =
            totalPoints;
        const container = document.getElementById("listingsContainer");
        container.innerHTML = "";
        renderListings(listings);
    } catch (error) {
        console.error("Error loading listings:", error);
    }
}
function renderListings(listings) {
    const container = document.getElementById("listingsContainer");
    container.innerHTML = "";
    if (listings.length === 0) {
        container.innerHTML = `
            <p class="no-listings">
                No listings found
            </p>
        `;
        return;
    }
    listings.forEach(item => {
        const card = `
            <div class="listing-card">
                <div class="listing-image-wrapper">
                    <img src="${item.imageUrl}" />
                </div>
                <div class="listing-info">
                    <div class="listing-title">
                        ${item.title}
                    </div>
                    <div class="listing-points">
                        ${item.points} points
                    </div>
                    <div class="listing-actions">
                        <button class="action-btn view-btn">
                            View
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}