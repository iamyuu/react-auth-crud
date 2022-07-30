import { faker } from '@faker-js/faker';
import { build, sequence } from '@jackfranklin/test-data-bot';

export const userBuilder = build({
	fields: {
		id: sequence(),
		name: faker.name.findName(),
		email: faker.internet.domainName(),
		password: faker.datatype.string(8),
	},
});
