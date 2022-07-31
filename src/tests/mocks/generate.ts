import { faker } from '@faker-js/faker';
import { build, sequence, perBuild } from '@jackfranklin/test-data-bot';

export const imageBuilder = ({ w = 720, h = 480, text = '' } = {}) => {
	const size = [w, h].join('x');
	const withText = text ? `&text=${text}` : '';

	return [`https://dummyimage.com/${size}/1e293b/f1f5f9.jpg`, withText].join('');
};

export const userBuilder = build({
	fields: {
		id: sequence(),
		name: perBuild(() => faker.name.findName()),
		email: perBuild(() => faker.internet.domainName()),
		password: perBuild(() => faker.datatype.string(8)),
		createdAt: perBuild(() => Date.now()),
	},
});

export const productBuilder = build({
	fields: {
		id: perBuild(() => faker.datatype.uuid()),
		name: perBuild(() => faker.commerce.productName()),
		description: perBuild(() => faker.commerce.productDescription()),
		price: perBuild(() => parseInt(faker.commerce.price())),
		sell_price: perBuild(() => parseInt(faker.commerce.price())),
		image: imageBuilder(),
		createdAt: perBuild(() => Date.now()),
	},
});
