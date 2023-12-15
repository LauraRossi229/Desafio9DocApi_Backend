import faker from "faker";

const modelProduct = async () => {
    return {
        _id: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.datatype.number(),
        category: faker.commerce.productAdjective(),
        status: faker.datatype.boolean(),
        code: faker.address.countryCode(),
        thumbnails: faker.image.avatar(),
    };
};

export const createRandomProducts = async (cantProducts) => {
    const products = [];

    for (let i = 0; i < cantProducts; i++) {
        const product = await modelProduct();
        products.push(product);
    }

    return products;
};


//console.log(createRandomProducts(100))


// Endpoint para generar productos aleatorios, el mismo lo trasladé a un controlador con manejo de errores y a una route.
/*
app.get('/mockingproducts', (req, res) => {
    const products = createRandomProducts(100);
    res.json(products);
});
*/

// Diccionario de errores comunes
const erroresComunes = {
    'missing_field': 'Falta un campo obligatorio en la solicitud.',
    'invalid_data': 'Los datos proporcionados son inválidos.',
    'product_not_found': 'El producto no se encontró en la base de datos.',
    // Agregar más errores según sea necesario
};


