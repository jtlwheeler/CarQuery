import Years from './Years';
import axios, { AxiosRequestConfig } from 'axios';
import Make from './Make';
import { Model } from './Model';
import { Body } from './Body';

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
            Object.assign(this.config.params, { sold_in_us: 1 });
        }

        const response = await axios.request(this.config);
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

    async getModels(inputs: GetModelsParams): Promise<Model[]> {
        this.config.params = {
            cmd: 'getMakes',
            year: inputs.year,
            make: inputs.make
        };

        if (inputs.soldInUSA) {
            Object.assign(this.config.params, { sold_in_us: 1 });
        }

        if (inputs.body) {
            Object.assign(this.config.params, { body: inputs.body });
        }

        const response = await axios.request(this.config);
        const models: Model[] = response.data.Models.map((model: any) => {
            const newModel: Model = {
                makeId: model.model_make_id,
                name: model.model_name
            }

            return newModel;
        });

        return Promise.resolve(models);
    }
}

export interface GetModelsParams {
    year: number;
    make: string;
    soldInUSA?: boolean;
    body?: Body;
}