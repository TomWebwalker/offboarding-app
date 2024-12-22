import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSONFilePreset } from 'lowdb/node';
import { Employee } from './app/types';

interface Data {
  employees: Employee[];
  offboardings: any[];
}

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const defaultData: Data = { employees: [], offboardings: [] };
const db = await JSONFilePreset<Data>(
  resolve(serverDistFolder, '../../../db.json'),
  defaultData,
);
const app = express();
app.use(express.json());
const angularApp = new AngularNodeAppEngine();

app.get('/api/employees', async (req, res) => res.json(db.data.employees));

app.get('/api/employees/:id', async (req, res) => {
  // mock delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const id = req.params.id;
  const employee = db.data.employees.find((employee) => employee.id === id);
  if (!employee) {
    res.status(404).json({ msg: 'Employee not found' });
    return;
  }
  res.json(employee);
});

app.post('/api/employees/:id/offboard', async (req, res) => {
  const id = req.params.id;
  const employee = db.data.employees.find((employee) => employee.id === id);
  if (!employee) {
    res.status(404).json({ msg: 'Employee not found' });
    return;
  }

  employee.status = 'OFFBOARDED';

  await db.update((data) => {
    data.employees = data.employees.map((e) => (e.id === id ? employee : e));
  });
  db.data.offboardings.push(req.body);
  await db.write();
  res.json({ status: 'ok' });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
