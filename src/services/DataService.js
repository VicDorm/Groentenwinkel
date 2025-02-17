import groentenData from '../data/groenten.json' assert { type: 'json' };
import winkelsData from '../data/winkels.json' assert { type: 'json' };

export const getGroenten = () => {
    return Promise.resolve(
        groentenData.map(([naam, prijs, eenheid]) => ({
            naam,
            prijs: parseFloat(prijs), 
            eenheid,
        }))
    );
};

export const getWinkels = () => {
    return Promise.resolve(winkelsData)
}