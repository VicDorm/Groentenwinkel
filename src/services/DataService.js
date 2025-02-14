import groentenData from '../data/groenten.json';
import winkelsData from '../data/winkels.json';

export const getGroenten = () => {
    return Promise.resolve(
        groentenData.map(([naam, prijs, eenheid]) => ({
            naam,
            prijs, 
            eenheid,
        }))
    );
};

export const getWinkels = () => {
    return Promise.resolve(winkelsData)
}