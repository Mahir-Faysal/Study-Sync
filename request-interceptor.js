// Add this to your browser console to intercept requests
// Go to F12 -> Console and paste this code

// Intercept all fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
    console.log('🔍 FETCH REQUEST:', args);
    
    if (args[1] && args[1].body) {
        console.log('📦 REQUEST BODY:', args[1].body);
        try {
            const parsed = JSON.parse(args[1].body);
            console.log('📋 PARSED BODY:', parsed);
        } catch (e) {
            console.log('❌ Could not parse body as JSON');
        }
    }
    
    return originalFetch.apply(this, args).then(response => {
        console.log('✅ RESPONSE:', response.status, response.statusText);
        return response.clone().text().then(text => {
            console.log('📨 RESPONSE BODY:', text);
            return response;
        });
    }).catch(error => {
        console.log('❌ FETCH ERROR:', error);
        throw error;
    });
};

// Intercept all axios requests
if (window.axios) {
    window.axios.interceptors.request.use(
        config => {
            console.log('🔍 AXIOS REQUEST:', config);
            console.log('📦 REQUEST DATA:', config.data);
            return config;
        },
        error => {
            console.log('❌ AXIOS REQUEST ERROR:', error);
            return Promise.reject(error);
        }
    );

    window.axios.interceptors.response.use(
        response => {
            console.log('✅ AXIOS RESPONSE:', response);
            console.log('📨 RESPONSE DATA:', response.data);
            return response;
        },
        error => {
            console.log('❌ AXIOS RESPONSE ERROR:', error);
            if (error.response) {
                console.log('📨 ERROR RESPONSE DATA:', error.response.data);
            }
            return Promise.reject(error);
        }
    );
}

console.log('🎯 Request interceptors installed! Now try registering/logging in.');
