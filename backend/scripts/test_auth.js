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
                const responseData = JSON.parse(body);
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve({ status: res.statusCode, data: responseData });
                } else {
                    reject({ status: res.statusCode, data: responseData });
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

const testAuth = async () => {
    try {
        console.log('--- Starting Auth & Profile Verification ---');

        // 1) Register a new user
        console.log('\n[1] Registering a new organization...');
        const registerData = {
            organizationName: 'Test NGO',
            organizationType: 'ngo',
            contactPerson: 'John Doe',
            email: `test_ngo_${Date.now()}@example.com`,
            phone: '1234567890',
            address: {
                city: 'New York',
                state: 'NY',
                zipCode: '10001'
            },
            password: 'password123'
        };

        const regRes = await request('POST', '/api/auth/register', registerData);
        console.log('✅ Registration Successful:', regRes.data.message);
        const token = regRes.data.token;

        // 2) Login with valid credentials
        console.log('\n[2] Logging in...');
        const loginRes = await request('POST', '/api/auth/login', {
            email: registerData.email,
            password: registerData.password
        });
        console.log('✅ Login Successful:', loginRes.data.message);
        const loginToken = loginRes.data.token;

        // 3) Try login with WRONG password
        console.log('\n[3] Testing login with wrong password...');
        try {
            await request('POST', '/api/auth/login', {
                email: registerData.email,
                password: 'wrongpassword'
            });
        } catch (err) {
            console.log('✅ Correctly rejected wrong password:', err.data.message);
        }

        // 4) Access Profile with valid token
        console.log('\n[4] Fetching profile with valid token...');
        const profileRes = await request('GET', '/api/user/profile', null, {
            Authorization: `Bearer ${loginToken}`
        });
        console.log('✅ Profile Fetched:', profileRes.data.data.user.organizationName);

        // 5) Access Profile with NO token
        console.log('\n[5] Testing profile access without token...');
        try {
            await request('GET', '/api/user/profile');
        } catch (err) {
            console.log('✅ Correctly rejected unauthorized access:', err.data.message);
        }

        console.log('\n--- Verification Complete ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Verification Failed:', err.data ? err.data : err.message);
        process.exit(1);
    }
};

testAuth();
