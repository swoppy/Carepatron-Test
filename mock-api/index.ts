import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

import { store, addClient, updateClient, removeClient, listClients, listClientsByName } from './data/store';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// on start
app.use(cors({ origin: true, credentials: true }));

// capture json
app.use(express.json());

app.listen(port, () => {
	console.log(`Mock API is running at http://localhost:${port}`);
});

// main page
app.get('/', (req: Request, res: Response) => {
	res.send('Mock API');
});

// get clients
app.get('/clients', (req: Request, res: Response) => {
	res.send(listClients());
});

// get specific client based on name search
app.get('/search/:clientName', (req: Request, res: Response) => {
	res.send(listClientsByName(req.params.clientName));
});

// remove a client by id
app.delete('/delete/client/:id', (req: Request, res: Response) => {
	res.send(removeClient(req.params.id));
});

// create client
app.post('/clients', (req: Request, res: Response) => {
	const client: IClient = { ...req.body, id: new Date().toISOString() };
	addClient({ ...client, id: uuid() });

	res.send(client);
});

// update client
app.put('/clients/:id', (req: Request, res: Response) => {
	const client: IClient = req.body;
	updateClient(client);

	res.status(204);
});
