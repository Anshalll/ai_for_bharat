// Game State
const gameState = {
    cash: 10000,
    rating: 3.0,
    carbonCredits: 0,
    selectedContract: null,
    acceptedContract: null,
    selectedFleet: null,
    activeDeliveries: [],
    contracts: [],
    fleet: [
        { id: 'ev1', name: 'Cryo-EV Truck', type: 'ev', speed: 0.7, capacity: 100, busy: false, decay: 0.3 },
        { id: 'van1', name: 'Refrigerated Van', type: 'van', speed: 1, capacity: 50, busy: false, decay: 0.5 },
        { id: 'drone1', name: 'Agri-Drone', type: 'drone', speed: 1.5, capacity: 20, busy: false, decay: 0.8 }
    ],
    upgrades: [
        { id: 'cold1', name: 'Cold Chain', cost: 5000, purchased: false, effect: 'decay', value: 0.2 },
        { id: 'solar1', name: 'Solar Hub', cost: 8000, purchased: false, effect: 'processing', value: 1.5 },
        { id: 'blockchain1', name: 'Blockchain', cost: 12000, purchased: false, effect: 'bonus', value: 0.3 },
        { id: 'micro1', name: 'Micro Center', cost: 6000, purchased: false, effect: 'speed', value: 1.2 }
    ],
    news: null,
    processingMultiplier: 1.0,
    decayReduction: 0,
    speedBonus: 1.0,
    transparencyBonus: 0
};

// Crop data
const crops = [
    { name: 'Strawberries', icon: '🍓', basePrice: 800, decay: 0.05, distance: 'short' },
    { name: 'Milk', icon: '🥛', basePrice: 600, decay: 0.04, distance: 'medium', processable: 'Cheese' },
    { name: 'Wheat', icon: '🌾', basePrice: 400, decay: 0.01, distance: 'long', processable: 'Flour' },
    { name: 'Lettuce', icon: '🥬', basePrice: 500, decay: 0.03, distance: 'short' },
    { name: 'Potatoes', icon: '🥔', basePrice: 350, decay: 0.02, distance: 'medium' },
    { name: 'Organic Soy', icon: '🫘', basePrice: 700, decay: 0.02, distance: 'long' }
];

// News events
const newsEvents = [
    { title: 'Fuel Spike in Europe', effect: 'cost', value: 0.15, message: 'Logistics costs increased by 15%' },
    { title: 'Vegan Festival in Neo-Delhi', effect: 'demand', crop: 'Organic Soy', value: 0.4, message: 'Soy demand up 40%!' },
    { title: 'Monsoon Delay', effect: 'price', value: 0.25, message: 'Grain prices increased 25%' },
    { title: 'Heat Wave Warning', effect: 'decay', value: 1.3, message: 'Perishables spoiling faster!' },
    { title: 'Green Subsidy Program', effect: 'carbon', value: 50, message: 'Bonus carbon credits for EVs!' }
];

// Initialize game
function init() {
    generateContracts();
    renderContracts();
    renderFleet();
    renderUpgrades();
    updateUI();
    startGameLoop();
    
    // Random news event every 30 seconds
    setInterval(triggerNewsEvent, 30000);
}

// Generate random contracts
function generateContracts() {
    gameState.contracts = [];
    for (let i = 0; i < 5; i++) {
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const distance = Math.floor(Math.random() * 100) + 50;
        const deadline = Math.floor(Math.random() * 60) + 30; // 30-90 seconds
        const reward = Math.floor(crop.basePrice * (1 + distance / 100) * (gameState.news?.effect === 'price' ? 1.25 : 1));
        
        gameState.contracts.push({
            id: 'c' + Date.now() + i,
            crop: crop.name,
            icon: crop.icon,
            reward: reward,
            distance: distance,
            deadline: deadline,
            freshness: 100,
            decay: crop.decay,
            processable: crop.processable,
            createdAt: Date.now(),
            status: 'available' // available, accepted, dispatched
        });
    }
}

// Render contracts
function renderContracts() {
    const container = document.getElementById('contractList');
    container.innerHTML = gameState.contracts.map(contract => {
        let cardClass = 'contract-card';
        let badge = '';
        
        if (contract.status === 'dispatched') {
            cardClass += ' dispatched';
            badge = '<div class="contract-badge dispatched">IN TRANSIT</div>';
        } else if (contract.status === 'accepted') {
            cardClass += ' accepted';
            badge = '<div class="contract-badge">ACCEPTED</div>';
        } else if (gameState.selectedContract?.id === contract.id) {
            cardClass += ' selected';
        }
        
        return `
        <div class="${cardClass}" 
                onclick="selectContract('${contract.id}')">
            ${badge}
            <div class="contract-header">
                <div class="crop-name">${contract.icon} ${contract.crop}</div>
                <div class="reward">$${contract.reward}</div>
            </div>
            <div class="contract-details">
                <div>📍 Distance: ${contract.distance}km</div>
                <div>⏱️ Deadline: ${contract.deadline}s</div>
                ${contract.processable && contract.status !== 'dispatched' ? `<div>⚙️ Process to ${contract.processable}</div>` : ''}
            </div>
            <div class="freshness-bar">
                <div class="freshness-fill" style="width: ${contract.freshness}%"></div>
            </div>
        </div>
    `;
    }).join('');
}

// Render fleet
function renderFleet() {
    const container = document.getElementById('fleetList');
    container.innerHTML = gameState.fleet.map(vehicle => `
        <div class="fleet-item ${gameState.selectedFleet?.id === vehicle.id ? 'active' : ''} ${vehicle.busy ? 'busy' : ''}"
                onclick="selectFleet('${vehicle.id}')">
            <div>
                <div class="fleet-name">${vehicle.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">
                    Capacity: ${vehicle.capacity}kg | Speed: ${vehicle.speed}x
                </div>
            </div>
            <div class="fleet-status ${vehicle.busy ? 'busy' : ''}">
                ${vehicle.busy ? 'BUSY' : 'READY'}
            </div>
        </div>
    `).join('');
}

// Render upgrades
function renderUpgrades() {
    const container = document.getElementById('upgradeGrid');
    const icons = { cold1: '❄️', solar1: '☀️', blockchain1: '🔗', micro1: '📦' };
    
    container.innerHTML = gameState.upgrades.map(upgrade => `
        <div class="upgrade-card ${upgrade.purchased ? 'purchased' : ''}"
                onclick="purchaseUpgrade('${upgrade.id}')">
            <div class="upgrade-icon">${icons[upgrade.id]}</div>
            <div class="upgrade-name">${upgrade.name}</div>
            <div class="upgrade-cost">${upgrade.purchased ? '✓ OWNED' : '$' + upgrade.cost}</div>
        </div>
    `).join('');
}

// Select contract
function selectContract(id) {
    const contract = gameState.contracts.find(c => c.id === id);
    // Can only select available or accepted contracts
    if (contract && contract.status !== 'dispatched') {
        gameState.selectedContract = contract;
        renderContracts();
        updateButtons();
    }
}

// Select fleet
function selectFleet(id) {
    const vehicle = gameState.fleet.find(v => v.id === id);
    if (!vehicle.busy) {
        gameState.selectedFleet = vehicle;
        renderFleet();
        updateButtons();
    }
}

// Update button states
function updateButtons() {
    const hasSelected = gameState.selectedContract !== null;
    const isAccepted = gameState.selectedContract?.status === 'accepted';
    const hasFleet = gameState.selectedFleet !== null && !gameState.selectedFleet.busy;
    const canProcess = gameState.selectedContract?.processable && gameState.selectedContract?.status !== 'dispatched';
    
    const acceptBtn = document.getElementById('acceptBtn');
    const dispatchBtn = document.getElementById('dispatchBtn');
    const processBtn = document.getElementById('processBtn');
    
    // Accept button: enabled only for available contracts
    const canAccept = hasSelected && gameState.selectedContract?.status === 'available';
    acceptBtn.disabled = !canAccept;
    acceptBtn.classList.toggle('pulse', canAccept);
    
    // Dispatch button: enabled only for accepted contracts with selected fleet
    const canDispatch = isAccepted && hasFleet;
    dispatchBtn.disabled = !canDispatch;
    dispatchBtn.classList.toggle('pulse', canDispatch);
    
    // Process button: enabled for contracts that can be processed
    processBtn.disabled = !canProcess;
    processBtn.classList.toggle('pulse', canProcess);
    
    // Update workflow status
    updateWorkflowStatus();
}

// Update workflow status indicator
function updateWorkflowStatus() {
    const statusContainer = document.getElementById('workflowStatus');
    const statusText = document.getElementById('statusText');
    
    if (!gameState.selectedContract) {
        statusContainer.style.display = 'none';
        return;
    }
    
    statusContainer.style.display = 'block';
    
    if (gameState.selectedContract.status === 'available') {
        statusText.innerHTML = `
            <div style="margin-bottom: 0.5rem;">✓ Contract Selected: ${gameState.selectedContract.crop}</div>
            <div style="color: var(--accent-cyan);">→ Next: Click "Accept Contract" button</div>
        `;
    } else if (gameState.selectedContract.status === 'accepted') {
        if (!gameState.selectedFleet) {
            statusText.innerHTML = `
                <div style="margin-bottom: 0.5rem;">✓ Contract Accepted</div>
                <div style="color: var(--accent-cyan);">→ Next: Select a vehicle from the fleet</div>
            `;
        } else {
            statusText.innerHTML = `
                <div style="margin-bottom: 0.5rem;">✓ Contract Accepted</div>
                <div style="margin-bottom: 0.5rem;">✓ Vehicle Selected: ${gameState.selectedFleet.name}</div>
                <div style="color: var(--accent-green);">→ Ready: Click "Dispatch" to begin delivery!</div>
            `;
        }
    } else if (gameState.selectedContract.status === 'dispatched') {
        statusText.innerHTML = `
            <div style="color: var(--accent-orange);">🚛 In Transit...</div>
        `;
    }
}

// Accept contract
document.getElementById('acceptBtn').onclick = () => {
    if (gameState.selectedContract && gameState.selectedContract.status === 'available') {
        gameState.selectedContract.status = 'accepted';
        gameState.acceptedContract = gameState.selectedContract;
        showToast(`✅ Contract accepted: ${gameState.selectedContract.crop} - Now select a vehicle to dispatch!`);
        renderContracts();
        updateButtons();
    }
};

// Dispatch vehicle
document.getElementById('dispatchBtn').onclick = () => {
    if (gameState.selectedContract && 
        gameState.selectedContract.status === 'accepted' && 
        gameState.selectedFleet && 
        !gameState.selectedFleet.busy) {
        dispatch();
    }
};

// Process goods
document.getElementById('processBtn').onclick = () => {
    if (gameState.selectedContract && 
        gameState.selectedContract.processable && 
        gameState.selectedContract.status !== 'dispatched') {
        const oldReward = gameState.selectedContract.reward;
        gameState.selectedContract.reward = Math.floor(oldReward * gameState.processingMultiplier * 1.5);
        gameState.selectedContract.crop = gameState.selectedContract.processable;
        gameState.selectedContract.icon = gameState.selectedContract.processable === 'Cheese' ? '🧀' : '🍞';
        gameState.selectedContract.processable = null;
        
        renderContracts();
        showToast(`⚙️ Processed! Value increased to $${gameState.selectedContract.reward}`);
        updateButtons();
    }
};

// Dispatch delivery
function dispatch() {
    const contract = gameState.selectedContract;
    const vehicle = gameState.selectedFleet;
    
    // Mark contract as dispatched
    contract.status = 'dispatched';
    vehicle.busy = true;
    
    const travelTime = (contract.distance / (vehicle.speed * gameState.speedBonus)) * 1000; // Convert to ms
    const effectiveDecay = contract.decay * (1 - vehicle.decay + gameState.decayReduction);
    
    // Create delivery
    const delivery = {
        contract: contract,
        vehicle: vehicle,
        startTime: Date.now(),
        duration: travelTime,
        decay: effectiveDecay
    };
    
    gameState.activeDeliveries.push(delivery);
    
    // Draw route on map
    drawRoute(vehicle.id, contract);
    
    // Complete delivery after travel time
    setTimeout(() => completeDelivery(delivery), travelTime);
    
    showToast(`🚛 ${vehicle.name} dispatched with ${contract.crop}!`);
    
    // Clear selection
    gameState.selectedContract = null;
    gameState.acceptedContract = null;
    gameState.selectedFleet = null;
    
    renderContracts();
    renderFleet();
    updateButtons();
    updateUI();
}

// Complete delivery
function completeDelivery(delivery) {
    const contract = delivery.contract;
    const vehicle = delivery.vehicle;
    
    // Calculate final freshness
    const timeElapsed = (Date.now() - delivery.startTime) / 1000;
    const finalFreshness = contract.freshness * Math.exp(-delivery.decay * timeElapsed);
    
    // Calculate reward
    let reward = Math.floor(contract.reward * (finalFreshness / 100));
    
    // Apply transparency bonus if blockchain purchased
    if (gameState.upgrades.find(u => u.id === 'blockchain1').purchased) {
        reward = Math.floor(reward * (1 + gameState.transparencyBonus + 0.3));
    }
    
    // Calculate carbon credits for EVs
    let carbonEarned = 0;
    if (vehicle.type === 'ev') {
        carbonEarned = Math.floor(contract.distance / 10);
    }
    
    // Update game state
    gameState.cash += reward;
    gameState.carbonCredits += carbonEarned;
    
    // Update rating based on freshness
    if (finalFreshness > 80) {
        gameState.rating = Math.min(5, gameState.rating + 0.1);
    } else if (finalFreshness < 50) {
        gameState.rating = Math.max(1, gameState.rating - 0.2);
    }
    
    // Free up vehicle
    vehicle.busy = false;
    
    // Remove contract
    gameState.contracts = gameState.contracts.filter(c => c.id !== contract.id);
    
    // Remove delivery
    gameState.activeDeliveries = gameState.activeDeliveries.filter(d => d !== delivery);
    
    // Add new contract
    if (gameState.contracts.length < 5) {
        const crop = crops[Math.floor(Math.random() * crops.length)];
        const distance = Math.floor(Math.random() * 100) + 50;
        const deadline = Math.floor(Math.random() * 60) + 30;
        const newReward = Math.floor(crop.basePrice * (1 + distance / 100));
        
        gameState.contracts.push({
            id: 'c' + Date.now(),
            crop: crop.name,
            icon: crop.icon,
            reward: newReward,
            distance: distance,
            deadline: deadline,
            freshness: 100,
            decay: crop.decay,
            processable: crop.processable,
            createdAt: Date.now(),
            status: 'available'
        });
    }
    
    showToast(`✅ Delivery complete! Earned $${reward} ${carbonEarned > 0 ? `+ ${carbonEarned} CO₂ credits` : ''}`);
    
    renderContracts();
    renderFleet();
    updateUI();
    clearRoute(vehicle.id);
}

// Draw route on map
function drawRoute(vehicleId, contract) {
    const routes = document.getElementById('routes');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'route-line');
    path.setAttribute('id', `route-${vehicleId}`);
    path.setAttribute('d', 'M 100 100 L 300 200 L 450 300');
    routes.appendChild(path);
    
    // Add vehicle marker
    const vehicles = document.getElementById('vehicles');
    const vehicleIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    vehicleIcon.setAttribute('id', `vehicle-${vehicleId}`);
    vehicleIcon.setAttribute('x', '100');
    vehicleIcon.setAttribute('y', '100');
    vehicleIcon.setAttribute('font-size', '24');
    vehicleIcon.setAttribute('class', 'vehicle');
    vehicleIcon.textContent = '🚛';
    vehicles.appendChild(vehicleIcon);
    
    // Animate vehicle
    let progress = 0;
    const animInterval = setInterval(() => {
        progress += 0.01;
        if (progress >= 1) {
            clearInterval(animInterval);
            return;
        }
        const x = 100 + (350 * progress);
        const y = 100 + (200 * progress);
        vehicleIcon.setAttribute('x', x);
        vehicleIcon.setAttribute('y', y);
    }, 50);
}

// Clear route
function clearRoute(vehicleId) {
    const route = document.getElementById(`route-${vehicleId}`);
    const vehicle = document.getElementById(`vehicle-${vehicleId}`);
    if (route) route.remove();
    if (vehicle) vehicle.remove();
}

// Purchase upgrade
function purchaseUpgrade(id) {
    const upgrade = gameState.upgrades.find(u => u.id === id);
    if (!upgrade.purchased && gameState.cash >= upgrade.cost) {
        gameState.cash -= upgrade.cost;
        upgrade.purchased = true;
        
        // Apply upgrade effect
        switch (upgrade.effect) {
            case 'decay':
                gameState.decayReduction += upgrade.value;
                break;
            case 'processing':
                gameState.processingMultiplier *= upgrade.value;
                break;
            case 'bonus':
                gameState.transparencyBonus += upgrade.value;
                break;
            case 'speed':
                gameState.speedBonus *= upgrade.value;
                break;
        }
        
        showToast(`⚡ Upgrade purchased: ${upgrade.name}!`);
        renderUpgrades();
        updateUI();
    } else if (upgrade.purchased) {
        showToast('Already owned!');
    } else {
        showToast('Not enough cash!');
    }
}

// Trigger random news event
function triggerNewsEvent() {
    const event = newsEvents[Math.floor(Math.random() * newsEvents.length)];
    gameState.news = event;
    
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = `
        <div class="news-feed">
            <div class="news-title">📰 ${event.title}</div>
            <div>${event.message}</div>
        </div>
    `;
    
    showToast(`📰 Breaking: ${event.title}`);
    
    // Clear news after 1 minute
    setTimeout(() => {
        gameState.news = null;
        newsContainer.innerHTML = '';
    }, 60000);
}

// Game loop - update freshness
function startGameLoop() {
    setInterval(() => {
        gameState.contracts.forEach(contract => {
            // Only update freshness for non-dispatched contracts
            if (contract.status !== 'dispatched') {
                const age = (Date.now() - contract.createdAt) / 1000;
                contract.freshness = Math.max(0, 100 * Math.exp(-contract.decay * age));
            }
        });
        renderContracts();
    }, 1000);
}

// Update UI
function updateUI() {
    document.getElementById('cash').textContent = gameState.cash;
    document.getElementById('rating').textContent = gameState.rating.toFixed(1);
    document.getElementById('carbon').textContent = gameState.carbonCredits;
    document.getElementById('activeDeliveryCount').textContent = gameState.activeDeliveries.length;
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize on load
init();

// Manual/Guide functions
function openManual() {
    document.getElementById('manualModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeManual() {
    document.getElementById('manualModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('manualModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeManual();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeManual();
    }
});