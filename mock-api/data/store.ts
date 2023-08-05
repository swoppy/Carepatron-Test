export const store: IStore = {
	entities: {
		'xx-aa-bb': {
			id: 'xx-aa-bb',
			firstName: 'John',
			lastName: 'Smitherin',
			email: 'john@gmail.com',
			phoneNumber: '+6192099102',
		},
	},
};

export const addClient = (client: IClient) => {
	store.entities[client.id] = client;
};

export const updateClient = (client: IClient) => {
	store.entities[client.id] = client;
};

export const removeClient = (id: string) => {
	delete store.entities[id];
};

export const listClients = () => {
	const list = Object.keys(store.entities).map((id) => store.entities[id]);

	return list.sort((a, b) => {
		if (a.firstName < b.firstName) {
			return -1;
		}
		if (a.firstName > b.firstName) {
			return 1;
		}
		return 0;
	});
};

export const listClientsByName = (name: string) => {
	const list = Object.keys(store.entities).map((id) => store.entities[id]);
	const searchValueRegex = new RegExp(escapeRegExp(name), 'i');

	return list.filter(
		(client) => (searchValueRegex.test(client.firstName) || searchValueRegex.test(client.lastName)) && client
	);
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
