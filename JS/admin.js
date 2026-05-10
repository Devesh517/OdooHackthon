let users = [];
let listings = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async function () {
    await fetchUsers();
    await fetchListings();
    updateDashboardStats();
});

// ======================
// FETCH USERS
// ======================

async function fetchUsers() {
    try {
        const response = await fetch("http://localhost:8080/admin/users");

        users = await response.json();

        populateUsers();

    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// ======================
// FETCH LISTINGS
// ======================

async function fetchListings() {
    try {
        const response = await fetch("http://localhost:8080/admin/listings");

        listings = await response.json();

        populateListings();

    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

// ======================
// DASHBOARD STATS
// ======================

function updateDashboardStats() {

    document.getElementById("totalUsers").innerText = users.length;

    document.getElementById("totalListings").innerText = listings.length;

    const pendingListings = listings.filter(
        listing => listing.status === "PENDING"
    );

    document.getElementById("pendingListings").innerText =
        pendingListings.length;
}

// ======================
// SECTION SWITCHING
// ======================

function showSection(sectionId) {

    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.adnav button');

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');

    event.target.classList.add('active');
}

// ======================
// POPULATE USERS
// ======================

function populateUsers() {
    const container = document.getElementById('usersTable');
    if (users.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <div class="empty-state-title">No Users Found</div>
            </div>
        `;

        return;
    }

    container.innerHTML = users.map(user => `

        <div class="table-row">

            <div class="table-cell">${user.fullName}</div>

            <div class="table-cell">${user.email}</div>

            <div class="table-cell">
                <span class="status-badge status-approved">
                    ${user.role}
                </span>
            </div>

            <div class="table-cell">
                ${user.createdAt}
            </div>

            <div class="table-cell">
                <div class="action-buttons">

                    <button class="action-btn reject-btn"
                        onclick="deleteUser(${user.id})">
                        Remove
                    </button>

                </div>
            </div>

        </div>

    `).join('');
}

// ======================
// POPULATE LISTINGS
// ======================

function populateListings() {

    const container = document.getElementById('listingsTable');

    if (listings.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👕</div>
                <div class="empty-state-title">No Listings Found</div>
            </div>
        `;

        return;
    }

    container.innerHTML = listings.map(listing => `

        <div class="table-row">

            <div class="table-cell">${listing.title}</div>

            <div class="table-cell">${listing.category}</div>

            <div class="table-cell">${listing.points}</div>

            <div class="table-cell">
                <span class="status-badge status-approved">
                    ${listing.status}
                </span>
            </div>

            <div class="table-cell">

                <div class="action-buttons">

                    <button class="action-btn approve-btn"
                        onclick="approveListing(${listing.id})">
                        Approve
                    </button>

                    <button class="action-btn reject-btn"
                        onclick="deleteListing(${listing.id})">
                        Delete
                    </button>

                </div>

            </div>

        </div>

    `).join('');
}

// ======================
// DELETE USER
// ======================

async function deleteUser(id) {

    try {

        await fetch(`http://localhost:8080/admin/user/${id}`, {
            method: "DELETE"
        });

        fetchUsers();

    } catch (error) {

        console.error(error);
    }
}

// ======================
// DELETE LISTING
// ======================

async function deleteListing(id) {

    try {

        await fetch(`http://localhost:8080/admin/listing/${id}`, {
            method: "DELETE"
        });

        fetchListings();

    } catch (error) {

        console.error(error);
    }
}

// ======================
// APPROVE LISTING
// ======================

async function approveListing(id) {

    const points = prompt("Enter points for this listing:");

    if (!points) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:8080/admin/listing/${id}/approve`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    points: parseInt(points)
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to approve listing");
        }

        alert("Listing approved successfully!");

        fetchListings();

    } catch (error) {

        console.error(error);

        alert("Error approving listing");
    }
}