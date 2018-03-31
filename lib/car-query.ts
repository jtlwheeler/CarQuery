import Years from './Years';
import axios, { AxiosRequestConfig } from 'axios';
import Make from './Make';
import { Model } from './Model';
import { BodyStyle } from './BodyStyle';
import { GetModelsParams } from './GetModelsParams';
import { GetTrimsParams } from './GetTrimsParams';
import { Trim } from './Trim';

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

    async getTrims(params: GetTrimsParams): Promise<Trim[]> {
        this.config.params = {
            cmd: 'getTrims'
        };

        this.buildGetTrimsQueryString(params);
        
        const response = await axios.request(this.config);
        const trims: Trim[] = response.data.Trims.map((trim: any) => {
            return this.mapToTrim(trim);
        });

        return Promise.resolve(trims);
    }

    private buildGetTrimsQueryString(params: GetTrimsParams) {
        if (params.year) {
            Object.assign(this.config.params, { year: params.year });
        }

        if (params.make) {
            Object.assign(this.config.params, { make: params.make });
        }

        if (params.model) {
            Object.assign(this.config.params, { model: params.model });
        }

        if (params.bodyStyle) {
            Object.assign(this.config.params, { body: params.bodyStyle });
        }

        if (params.doors) {
            Object.assign(this.config.params, { doors: params.doors });
        }

        if (params.drive) {
            Object.assign(this.config.params, { drive: params.drive });
        }

        if (params.enginePosition) {
            Object.assign(this.config.params, { engine_position: params.enginePosition });
        }

        if (params.engineType) {
            Object.assign(this.config.params, { engine_type: params.engineType });
        }

        if (params.fuelType) {
            Object.assign(this.config.params, { fuel_type: params.fuelType });
        }

        if (params.fullResults) {
            Object.assign(this.config.params, { full_results: 1 });
        }

        if (params.keyword) {
            Object.assign(this.config.params, { keyword: params.keyword });
        }

        if (params.minCylinders) {
            Object.assign(this.config.params, { min_cylinders: params.minCylinders });
        }
    }

    mapToTrim(trim: any): Trim {
        return {
            modelId: trim.model_id,
            makeId: trim.model_make_id,
            name: trim.model_name,
            trim: trim.model_trim,
            year: Number(trim.model_year),
            body: trim.model_body,
            enginePosition: trim.model_engine_position,
            engineCC: Number(trim.model_engine_cc),
            engineCyclinders: Number(trim.model_engine_cyl),
            engineType: trim.model_engine_type,
            engineValvesPerCylinder: Number(trim.model_engine_valves_per_cyl),
            engineHorsepower: Number(trim.model_engine_power_ps),
            enginePowerRPM: Number(trim.model_engine_power_rpm),
            engineTorqueNewtonMetre: Number(trim.model_engine_torque_nm),
            engineTorqueRPM: Number(trim.model_engine_torque_rpm),
            engineBoreMM: Number(trim.model_engine_bore_mm),
            engineStrokeMM: Number(trim.model_engine_stroke_mm),
            engineCompression: trim.model_engine_compression,
            engineFuel: trim.model_engine_fuel,
            topSpeedKilometerPerHour: Number(trim.model_top_speed_kph),
            zeroTo100KilometerPerHour: Number(trim.model_0_to_100_kph),
            drive: trim.model_drive,
            transmissionType: trim.model_transmission_type,
            seats: Number(trim.model_seats),
            doors: Number(trim.model_doors),
            weightKiloGrams: Number(trim.model_weight_kg),
            lengthMM: Number(trim.model_length_mm),
            widthMM: Number(trim.model_width_mm),
            heightMM: Number(trim.model_height_mm),
            wheelbaseMM: Number(trim.model_wheelbase_mm),
            litresPer100KilometerHighway: Number(trim.model_lkm_hwy),
            litresPer100KilometerMixed: Number(trim.model_lkm_mixed),
            litresPer100KilometerCity: Number(trim.model_lkm_city),
            fuelCapacityLiters: Number(trim.model_fuel_cap_l),
            soldInUSA: trim.model_sold_in_us === '1',
            co2: trim.model_co2,
            make: trim.model_make_display,
            display: trim.make_display,
            country: trim.make_country
        }
    }
}