const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        status: 'Active',
        joinDate: '2024-01-15'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'Active',
        joinDate: '2024-01-10'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        status: 'Suspended',
        joinDate: '2024-01-05'
    }
];

const listings = [
    {
        id: 1,
        title: 'Blue Denim Jacket',
        user: 'John Doe',
        status: 'Pending',
        date: '2024-01-15'
    },
    {
        id: 2,
        title: 'Summer Dress',
        user: 'Jane Smith',
        status: 'Pending',
        date: '2024-01-14'
    },
    {
        id: 3,
        title: 'Casual T-Shirt',
        user: 'Bob Johnson',
        status: 'Approved',
        date: '2024-01-13'
    }
];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    populateUsers();
    populateListings();
});

// Show section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.adnav button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Populate users table
function populateUsers() {
    const container = document.getElementById('usersTable');
    
    if (users.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👥</div>
                <div class="empty-state-title">No Users Found</div>
                <div class="empty-state-text">No users have registered yet.</div>
            </div>
        `;
        return;
    }

    container.innerHTML = users.map(user => `
        <div class="table-row">
            <div class="table-cell">${user.name}</div>
            <div class="table-cell">${user.email}</div>
            <div class="table-cell">
                <span class="status-badge status-${user.status.toLowerCase()}">${user.status}</span>
            </div>
            <div class="table-cell">${user.joinDate}</div>
            <div class="table-cell">
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewUser(${user.id})">View</button>
                    <button class="action-btn ${user.status === 'Active' ? 'reject-btn' : 'approve-btn'}" 
                            onclick="${user.status === 'Active' ? 'suspendUser' : 'activateUser'}(${user.id})">
                        ${user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Populate listings table
function populateListings() {
    const container = document.getElementById('listingsTable');
    
    if (listings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👕</div>
                <div class="empty-state-title">No Listings Found</div>
                <div class="empty-state-text">No listings are pending approval.</div>
            </div>
        `;
        return;
    }

    container.innerHTML = listings.map(listing => `
        <div class="table-row">
            <div class="table-cell">${listing.title}</div>
            <div class="table-cell">${listing.user}</div>
            <div class="table-cell">
                <span class="status-badge status-${listing.status.toLowerCase()}">${listing.status}</span>
            </div>
            <div class="table-cell">${listing.date}</div>
            <div class="table-cell">
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewListing(${listing.id})">View</button>
                    ${listing.status === 'Pending' ? `
                        <button class="action-btn approve-btn" onclick="approveListing(${listing.id})">Approve</button>
                        <button class="action-btn reject-btn" onclick="rejectListing(${listing.id})">Reject</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Action functions
function viewUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        showToast(`Viewing user: ${user.name}`, 'info');
    }
}

function suspendUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = 'Suspended';
        populateUsers();
        showToast(`${user.name} has been suspended`, 'success');
    }
}

function activateUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = 'Active';
        populateUsers();
        showToast(`${user.name} has been activated`, 'success');
    }
}

function viewListing(listingId) {
    const listing = listings.find(l => l.id === listingId);
    if (listing) {
        showToast(`Viewing listing: ${listing.title}`, 'info');
    }
}

function approveListing(listingId) {
    const listing = listings.find(l => l.id === listingId);
    if (listing) {
        listing.status = 'Approved';
        populateListings();
        showToast(`${listing.title} has been approved`, 'success');
    }
}

function rejectListing(listingId) {
    const listing = listings.find(l => l.id === listingId);
    if (listing) {
        listing.status = 'Rejected';
        populateListings();
        showToast(`${listing.title} has been rejected`, 'success');
    }
}