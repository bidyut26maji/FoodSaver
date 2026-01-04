const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testNGOFlow() {
    try {
        console.log('--- 🚀 Starting NGO Flow Verification ---');

        // 1. Register/Login as Restaurant to create a donation
        console.log('\n1. Logging in as Restaurant...');
        const resLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'restaurant@example.com',
            password: 'password123'
        });
        const resToken = resLogin.data.data.token;
        console.log('✅ Logged in as Restaurant');

        // 2. Create a donation
        console.log('\n2. Creating a donation...');
        const donationRes = await axios.post(`${API_URL}/donations`, {
            foodName: 'NGO Test Food',
            quantity: 5,
            quantityUnit: 'kg',
            expiryTime: new Date(Date.now() + 3600000), // 1 hour from now
            pickupAddress: 'NGO Test Address',
            category: 'Veg'
        }, {
            headers: { Authorization: `Bearer ${resToken}` }
        });
        const donationId = donationRes.data.data.donation._id;
        console.log(`✅ Donation created: ${donationId}`);

        // 3. Register/Login as NGO
        console.log('\n3. Logging in as NGO...');
        // First try to login, if fails register
        let ngoToken;
        try {
            const ngoLogin = await axios.post(`${API_URL}/auth/login`, {
                email: 'ngo@example.com',
                password: 'password123'
            });
            ngoToken = ngoLogin.data.data.token;
        } catch (err) {
            console.log('NGO not found, registering...');
            const ngoReg = await axios.post(`${API_URL}/auth/register`, {
                organizationName: 'Test NGO',
                organizationType: 'ngo',
                contactPerson: 'NGO Admin',
                email: 'ngo@example.com',
                password: 'password123',
                phone: '9876543210',
                address: {
                    city: 'Test City',
                    state: 'Test State',
                    zipCode: '123456'
                }
            });
            ngoToken = ngoReg.data.data.token;
        }
        console.log('✅ Logged in as NGO');

        // 4. List available donations
        console.log('\n4. Listing available donations...');
        const availableRes = await axios.get(`${API_URL}/donations/available`, {
            headers: { Authorization: `Bearer ${ngoToken}` }
        });
        console.log(`✅ Found ${availableRes.data.results} available donations`);
        const found = availableRes.data.data.donations.some(d => d._id === donationId);
        console.log(found ? '✅ Test donation found in available list' : '❌ Test donation NOT found in available list');

        // 5. Claim the donation
        console.log('\n5. Claiming donation...');
        const claimRes = await axios.post(`${API_URL}/donations/${donationId}/claim`, {}, {
            headers: { Authorization: `Bearer ${ngoToken}` }
        });
        console.log('✅ Donation claimed successfully');
        console.log(`Order ID: ${claimRes.data.data.order._id}`);

        // 6. Verify it's no longer available
        console.log('\n6. Verifying donation is no longer available...');
        const availableRes2 = await axios.get(`${API_URL}/donations/available`, {
            headers: { Authorization: `Bearer ${ngoToken}` }
        });
        const stillFound = availableRes2.data.data.donations.some(d => d._id === donationId);
        console.log(!stillFound ? '✅ Donation successfully removed from available list' : '❌ Donation STILL in available list');

        console.log('\n--- ✨ NGO Flow Verification Complete ---');
    } catch (error) {
        console.error('❌ Verification failed:', error.response ? error.response.data : error.message);
    }
}

testNGOFlow();
