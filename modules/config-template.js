
const config = {
    email: {
        host: 'host.domain.com',
        port: 465,
        secure: true,
        auth: {
            user: 'user',
            pass: 'pass'
        },
        tls: {
            rejectUnauthorized: true
        }
    }
};

module.exports = config;