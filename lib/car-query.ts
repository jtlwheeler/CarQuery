import Years from './Years';
import axios, { AxiosRequestConfig } from 'axios';
import Make from './Make';

const CARQUERY_API_URL = 'https://www.carqueryapi.com/api/0.3';

export class CarQuery {
    private config: AxiosRequestConfig = {
        baseURL: CARQUERY_API_URL
    };

    async getYears(): Promise<Years> {
        this.config.params = {
            cmd: 'getYears'
        };

        const response = await axios.request(this.config);

        const years: Years = {
            minYear: Number(response.data.Years.min_year),
            maxYear: Number(response.data.Years.max_year),
        };

        return Promise.resolve(years);
    }

    async getMakes(year: number, soldInUSA?: boolean): Promise<Make[]> {
        this.config.params = {
            cmd: 'getMakes',
            year: year
        };

        if (soldInUSA) {
            Object.assign(this.config.params, {sold_in_us: true});
        }
        
        const response = await axios(this.config);
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