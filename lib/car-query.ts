import { Years } from './Years';
import axios, { AxiosRequestConfig } from 'axios';
import { Make } from './Make';
import { Model } from './Model';
import { BodyStyle } from './BodyStyle';
import { GetModelsParams } from './GetModelsParams';
import { GetTrimsParams } from './GetTrimsParams';
import { Trim } from './Trim';
import { ModelDetail } from './ModelDetail';

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
            cmd: 'getModels',
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

        if (params.minFuelEfficiencyHighwayInLitresPer100Kilometer) {
            Object.assign(this.config.params, { min_lkm_hwy: params.minFuelEfficiencyHighwayInLitresPer100Kilometer });
        }

        if (params.minHorsepower) {
            Object.assign(this.config.params, { min_power: params.minHorsepower });
        }

        if (params.minTopSpeedKilometerPerHour) {
            Object.assign(this.config.params, { min_top_speed: params.minTopSpeedKilometerPerHour });
        }

        if (params.minTorqueNewtonMetre) {
            Object.assign(this.config.params, { min_torque: params.minTorqueNewtonMetre });
        }

        if (params.minWeightInKilogram) {
            Object.assign(this.config.params, { min_weight: params.minWeightInKilogram });
        }

        if (params.minYear) {
            Object.assign(this.config.params, { min_year: params.minYear });
        }

        if (params.maxCylinders) {
            Object.assign(this.config.params, { max_cylinders: params.maxCylinders });
        }

        if (params.maxFuelEfficiencyHighwayInLitresPer100Kilometer) {
            Object.assign(this.config.params, { max_lkm_hwy: params.maxFuelEfficiencyHighwayInLitresPer100Kilometer });
        }

        if (params.maxHorsepower) {
            Object.assign(this.config.params, { max_power: params.maxHorsepower });
        }

        if (params.maxTopSpeedKilometerPerHour) {
            Object.assign(this.config.params, { max_top_speed: params.maxTopSpeedKilometerPerHour });
        }

        if (params.maxTorqueNewtonMetre) {
            Object.assign(this.config.params, { max_torque: params.maxTorqueNewtonMetre });
        }

        if (params.maxWeightInKilograms) {
            Object.assign(this.config.params, { max_weight: params.maxWeightInKilograms });
        }

        if (params.maxYear) {
            Object.assign(this.config.params, { max_year: params.maxYear });
        }

        if (params.seats) {
            Object.assign(this.config.params, { seats: params.seats });
        }

        if (params.soldInUSA) {
            Object.assign(this.config.params, { sold_in_us: 1 });
        }
    }

    private mapToTrim(trim: any): Trim {
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

    public async getModelDetail(model: number): Promise<ModelDetail> {
        this.config.params = {
            cmd: 'getModel',
            model: model
        };

        const response = await axios.request(this.config);
        const detail = response.data[0];
        const modelDetail: ModelDetail = {
            modelId: Number(detail.model_id),
            makeId: detail.model_make_id,
            modelName: detail.model_name,
            year: Number(detail.model_year),
            body: detail.model_body,
            enginePosition: detail.model_engine_position,
            engineCC: Number(detail.model_engine_cc),
            engineCylinders: Number(detail.model_engine_cyl),
            engineType: detail.model_engine_type,
            engineValvesPerCylinder: Number(detail.model_engine_valves_per_cyl),
            engineHoresepower: Number(detail.model_engine_power_ps),
            enginePowerRPM: Number(detail.model_engine_power_rpm),
            engineTorqueNewtonMetre: Number(detail.model_engine_torque_nm),
            engineTorqueRPM: Number(detail.model_engine_torque_rpm),
            engineBoreMM: Number(detail.model_engine_bore_mm),
            engineStrokeMM: Number(detail.model_engine_stroke_mm),
            engineCompression: detail.model_engine_compression,
            engineFuel: detail.model_engine_fuel,
            topSpeedKilometerPerHour: Number(detail.model_top_speed_kph),
            zeroTo100KilometerPerHour: Number(detail.model_0_to_100_kph),
            drive: detail.model_drive,
            transmissionType: detail.model_transmission_type,
            seats: Number(detail.model_seats),
            doors: Number(detail.model_doors),
            weightKilograms: Number(detail.model_weight_kg),
            lengthMM: Number(detail.model_length_mm),
            widthMM: Number(detail.model_width_mm),
            heightMM: Number(detail.model_height_mm),
            wheelbaseMM: Number(detail.model_wheelbase_mm),
            litresPer100KilometerHighway: Number(detail.model_lkm_hwy),
            litresPer100KilometerMixed: Number(detail.model_lkm_mixed),
            litresPer100KilometerCity: Number(detail.model_lkm_city),
            fuelCapacityLiters: Number(detail.model_fuel_cap_l),
            soldInUSA: detail.model_sold_in_us === "1",
            engineLiters: Number(detail.model_engine_l),
            engineCubicInches: Number(detail.model_engine_ci),
            engineValves: Number(detail.model_engine_valves),
            engineHorsepower: Number(detail.model_engine_power_hp),
            enginePowerKW: Number(detail.model_engine_power_kw),
            engineTorquePoundFoot: Number(detail.model_engine_torque_lbft),
            engineTorqueKilogram: Number(detail.model_engine_torque_kgm),
            topSpeedMilesPerHour: Number(detail.model_top_speed_mph),
            weightPounds: Number(detail.model_weight_lbs),
            lengthInches: Number(detail.model_length_in),
            widthInches: Number(detail.model_width_in),
            heightInches: Number(detail.model_height_in),
            wheelbaseInches: Number(detail.model_wheelbase_in),
            milesPerGallonHighway: Number(detail.model_mpg_hwy),
            milesPerGallonCity: Number(detail.model_mpg_city),
            milesPerGallonMixed: Number(detail.model_mpg_mixed),
            fuelCapacityGallons: Number(detail.model_fuel_cap_g),
            makeDisplay: detail.make_display,
            makeCountry: detail.make_country,
            ExtColors: detail.ExtColors,
            IntColors: detail.ExtColors,
        };

        return Promise.resolve(modelDetail);
    }
}