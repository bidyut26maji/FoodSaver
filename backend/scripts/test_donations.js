const http = require('http');

const request = (method, path, data, headers = {}) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => {
                try {
                    const responseData = JSON.parse(body);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve({ status: res.statusCode, data: responseData });
                    } else {
                        reject({ status: res.statusCode, data: responseData });
                    }
                } catch (e) {
                    reject({ status: res.statusCode, body });
                }
            });
        });

        req.on('error', (err) => reject(err));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const testDonations = async () => {
    try {
        console.log('--- Starting Donation Management Verification ---');

        // 1) Register and Login as Restaurant
        console.log('\n[1] Registering and Logging in as Restaurant...');
        const restaurantData = {
            organizationName: 'Foodie Palace',
            organizationType: 'restaurant',
            contactPerson: 'Chef Mario',
            email: `chef_mario_${Date.now()}@example.com`,
            phone: '9876543210',
            address: {
                city: 'San Francisco',
                state: 'CA',
                zipCode: '94103'
            },
            password: 'password123'
        };

        const regRes = await request('POST', '/api/auth/register', restaurantData);
        const token = regRes.data.token;
        console.log('✅ Registered and Authenticated');

        // 2) Create a Donation
        console.log('\n[2] Creating a new donation...');
        const donationData = {
            foodName: 'Leftover Pasta',
            quantity: 5,
            quantityUnit: 'kg',
            expiryTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
            pickupAddress: '123 Main St, SF',
            category: 'Veg',
            description: 'Freshly cooked pasta, slightly over-ordered.'
        };

        const createRes = await request('POST', '/api/donations', donationData, {
            Authorization: `Bearer ${token}`
        });
        console.log('✅ Donation Created:', createRes.data.data.donation.foodName);
        const donationId = createRes.data.data.donation._id;

        // 3) List My Donations
        console.log('\n[3] Listing my donations...');
        const listRes = await request('GET', '/api/donations/my', null, {
            Authorization: `Bearer ${token}`
        });
        console.log('✅ Found', listRes.data.results, 'donations');

        // 4) Update Donation Status
        console.log('\n[4] Updating donation status to Claimed...');
        const updateRes = await request('PATCH', `/api/donations/${donationId}`, { status: 'Claimed' }, {
            Authorization: `Bearer ${token}`
        });
        console.log('✅ Donation Updated. New Status:', updateRes.data.data.donation.status);

        // 5) Try update with WRONG user
        console.log('\n[5] Testing ownership check (update by another user)...');
        const otherUserData = {
            organizationName: 'Hackers NGO',
            organizationType: 'ngo',
            contactPerson: 'Bad Actor',
            email: `hacker_${Date.now()}@example.com`,
            phone: '0000000000',
            address: { city: 'Void', state: 'VS', zipCode: '00000' },
            password: 'password123'
        };
        const otherRegRes = await request('POST', '/api/auth/register', otherUserData);
        const otherToken = otherRegRes.data.token;

        try {
            await request('PATCH', `/api/donations/${donationId}`, { status: 'Available' }, {
                Authorization: `Bearer ${otherToken}`
            });
        } catch (err) {
            console.log('✅ Correctly rejected update by non-owner:', err.data.message);
        }

        console.log('\n--- Verification Complete ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Verification Failed:', err.data ? err.data : err.message);
        process.exit(1);
    }
};

testDonations();
