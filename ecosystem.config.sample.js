module.exports = {
    apps: [{
        name: 'practice-backend-steroids',
        script: 'dist/main.js',
        cwd: '/var/www/practice-backend-steroids',
        error_file: '/var/www/practice-backend-steroids/logs/nest-backend-error.log',
        out_file: '/var/www/practice-backend-steroids/logs/nest-backend-out.log',
    }],
};
