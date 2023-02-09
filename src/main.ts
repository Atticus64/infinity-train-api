import { Hono } from 'Hono';
import { serve } from 'serve'

const app = new Hono()

app.get('/', (c) => c.text('Migrating to Honojs'))

app.get('/ping', (c) => c.text('pong'))

serve(app.fetch, { port: 3000 })
