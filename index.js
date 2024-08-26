const express = require('express')
const { register, Histogram } = require('prom-client');

const app = express()
const port = 3333

app.get('/metrics', async (_req, res) => {
    res.contentType('text/plain').send(await register.metrics());
})

app.listen(port, () => {
    console.log('grafana-test', port);

    const histogram = new Histogram({
        name: 'task_duration_ms',
        buckets: [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000],
        help: 'Duration of task runs',
    });

    setInterval(() => {
        const duration = Math.floor(Math.random() * (30000 - 1));

        histogram.observe(duration);
    }, 30 * 1000);
})
