module.exports = {
    async redirects() {
        return [
            {
                // we presume the index page should default to the English' main page
                source: '/',
                destination: '/en',
                permanent: true
            }
        ];
    }
};
