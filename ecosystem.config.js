module.exports = {
  apps: [{
    name: 'navBar',
    script: './server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-221-123-158.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/FECServerKey.pem',
      ref: 'origin/master',
      repo: 'https://github.com/nike-hratx41-fec/navbar.git',
      path: '/home/ubuntu',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}