import { fakerES as faker} from "@faker-js/faker";

export const generateProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(6),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(1),
        stock: faker.string.numeric(3),
        category: faker.commerce.department(),
        thumbnails: faker.helpers.arrayElements([faker.image.url()])
    }
}