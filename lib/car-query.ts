import Years from './Years';
import axios from 'axios';
import Make from './Make';

const CARQUERY_API_URL = 'https://www.carqueryapi.com/api/0.3';

export class CarQuery {
    async getYears(): Promise<Years> {

        const response = await axios.get(`${CARQUERY_API_URL}/?cmd=getYears`);

        const years: Years = {
            minYear: response.data.Years.min_year,
            maxYear: response.data.Years.max_year,
        };

        return Promise.resolve(years);
    }

    async getMakes(year: number): Promise<Make[]> {
        const response = await axios.get(`${CARQUERY_API_URL}/?cmd=getMakes&year=${year}`)
        const makes: Make[] = response.data.Makes.map((make: any) => {
            const newMake: Make = {
                id: make.make_id,
                display: make.make_display,
                isCommon: make.make_is_common == '1',
                country: make.make_country
            }

            return newMake;
        });

        return Promise.resolve(makes);
    }
}