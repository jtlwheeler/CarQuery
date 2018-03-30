import Years from './Years';
import axios from 'axios';

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
}