import { createRandomProducts } from "../utils/mockingFaker.js";
import faker from "faker";

export const getfakerProducts = async (req, res) => {
    try {
        const products = await createRandomProducts(100);
        res.status(200).send(products);
    } catch (error) {
        console.error('Error en getfakerProducts:', error);
        res.status(500).send({ error: 'Error al obtener los productos' });
    }
};
