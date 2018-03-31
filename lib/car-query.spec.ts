import 'jasmine';
import axios from 'axios';
import * as sinon from 'sinon';
import { CarQuery } from './car-query';
import { Years } from './Years';
import { Make } from './Make';
import { Model } from './Model';
import { BodyStyle } from './BodyStyle';
import { Trim } from './Trim';
import { ModelDetail } from './ModelDetail';

describe('getYears()', function () {
    it('should return min and max year', async function () {
        const axiosStub = sinon.stub(axios, 'request');
        axiosStub.returns({
            data: {
                Years: {
                    min_year: '1900',
                    max_year: '2000'
                }
            }
        });

        const carQuery = new CarQuery();
        const years: Years = await carQuery.getYears();

        expect(years.minYear).toBe(1900);
        expect(years.maxYear).toBe(2000);

        axiosStub.restore();
    });
});

describe('getMakes()', function () {
    beforeEach(function () {
        this.axiosStub = sinon.stub(axios, 'request');
        this.axiosStub.returns({
            data: {
                Makes: [
                    {
                        make_id: 'ac',
                        make_display: 'AC',
                        make_is_common: '0',
                        make_country: 'UK'
                    },
                    {
                        make_id: 'acura',
                        make_display: 'Acura',
                        make_is_common: '1',
                        make_country: 'USA'
                    }]
            }
        });
    });

    afterEach(function () {
        this.axiosStub.restore();
    });

    it('should return array of makes and called with entered year', async function () {
        const carQuery = new CarQuery();
        const makes: Make[] = await carQuery.getMakes(2000);

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { year: 2000 } }));

        expect(makes.length).toBe(2);

        expect(makes[0].id).toBe('ac');
        expect(makes[0].display).toBe('AC');
        expect(makes[0].isCommon).toBe(false);
        expect(makes[0].country).toBe('UK');

        expect(makes[1].id).toBe('acura');
        expect(makes[1].display).toBe('Acura');
        expect(makes[1].isCommon).toBe(true);
        expect(makes[1].country).toBe('USA');
    });

    it('should be called with sold_in_us flag when soldInUSA parameter is true', async function () {
        const carQuery = new CarQuery();
        await carQuery.getMakes(2000, true);

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { year: 2000, sold_in_us: 1 } }));
    });
});


describe('getModels()', function () {
    beforeEach(function () {
        this.axiosStub = sinon.stub(axios, 'request');
        this.axiosStub.returns({
            data: {
                Models: [
                    {
                        'model_name': 'Escape',
                        'model_make_id': 'ford'
                    },
                    {
                        'model_name': 'Excursion',
                        'model_make_id': 'ford'
                    }
                ]
            }
        });
    });

    afterEach(function () {
        this.axiosStub.restore();
    });

    it('should return models', async function () {
        const carQuery = new CarQuery();
        const models: Model[] = await carQuery.getModels({ year: 2000, make: 'Ford' });

        expect(models.length).toBe(2);

        expect(models[0].name).toBe('Escape');
        expect(models[0].makeId).toBe('ford');

        expect(models[1].name).toBe('Excursion');
        expect(models[1].makeId).toBe('ford');
    });

    it('should be called with sold_in_usa flag', async function () {
        const carQuery = new CarQuery();

        await carQuery.getModels({ year: 2000, make: 'Ford', soldInUSA: true });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { make: 'Ford', sold_in_us: 1, year: 2000 } }));
    });

    it('should be called with body', async function () {
        const carQuery = new CarQuery();

        await carQuery.getModels({ year: 2000, make: 'Ford', body: BodyStyle.SUV });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { body: 'SUV', make: 'Ford', year: 2000 } }));
    });
});

describe('getTrims()', function () {
    beforeEach(function () {
        this.axiosStub = sinon.stub(axios, 'request');
        this.axiosStub.returns({
            data: {
                'Trims': [
                    {
                        'model_id': '44863',
                        'model_make_id': 'ford',
                        'model_name': 'Escape',
                        'model_trim': 'Hybrid',
                        'model_year': '2011',
                        'model_body': 'SUV',
                        'model_engine_position': 'Front',
                        'model_engine_cc': '2500',
                        'model_engine_cyl': '4',
                        'model_engine_type': 'in-line',
                        'model_engine_valves_per_cyl': '4',
                        'model_engine_power_ps': '179',
                        'model_engine_power_rpm': '6000',
                        'model_engine_torque_nm': '184',
                        'model_engine_torque_rpm': '4500',
                        'model_engine_bore_mm': null,
                        'model_engine_stroke_mm': null,
                        'model_engine_compression': null,
                        'model_engine_fuel': 'Gasoline / Electric Hybrid',
                        'model_top_speed_kph': null,
                        'model_0_to_100_kph': null,
                        'model_drive': 'Front',
                        'model_transmission_type': 'CVT',
                        'model_seats': '5',
                        'model_doors': '5',
                        'model_weight_kg': '1664',
                        'model_length_mm': '4437',
                        'model_width_mm': '1806',
                        'model_height_mm': '1720',
                        'model_wheelbase_mm': '2619',
                        'model_lkm_hwy': '7.6',
                        'model_lkm_mixed': null,
                        'model_lkm_city': '6.9',
                        'model_fuel_cap_l': '57',
                        'model_sold_in_us': '1',
                        'model_co2': null,
                        'model_make_display': 'Ford',
                        'make_display': 'Ford',
                        'make_country': 'USA'
                    },
                    {
                        'model_id': '44864',
                        'model_make_id': 'ford',
                        'model_name': 'Escape',
                        'model_trim': 'Hybrid Limited',
                        'model_year': '2011',
                        'model_body': 'SUV',
                        'model_engine_position': 'Front',
                        'model_engine_cc': '2500',
                        'model_engine_cyl': '4',
                        'model_engine_type': 'in-line',
                        'model_engine_valves_per_cyl': '4',
                        'model_engine_power_ps': '179',
                        'model_engine_power_rpm': '6000',
                        'model_engine_torque_nm': '184',
                        'model_engine_torque_rpm': '4500',
                        'model_engine_bore_mm': null,
                        'model_engine_stroke_mm': null,
                        'model_engine_compression': null,
                        'model_engine_fuel': 'Gasoline / Electric Hybrid',
                        'model_top_speed_kph': null,
                        'model_0_to_100_kph': null,
                        'model_drive': 'Front',
                        'model_transmission_type': 'CVT',
                        'model_seats': '5',
                        'model_doors': '5',
                        'model_weight_kg': '1664',
                        'model_length_mm': '4437',
                        'model_width_mm': '1806',
                        'model_height_mm': '1720',
                        'model_wheelbase_mm': '2619',
                        'model_lkm_hwy': '7.6',
                        'model_lkm_mixed': null,
                        'model_lkm_city': '6.9',
                        'model_fuel_cap_l': '57',
                        'model_sold_in_us': '1',
                        'model_co2': null,
                        'model_make_display': 'Ford',
                        'make_display': 'Ford',
                        'make_country': 'USA'
                    }
                ]
            }
        });
    });

    afterEach(function () {
        this.axiosStub.restore();
    });

    it('should return trims', async function () {
        const carQuery = new CarQuery();
        const trims: Trim[] = await carQuery.getTrims({
            year: 2011,
            make: 'Ford',
            model: 'Escape'
        });

        expect(trims.length).toBe(2);
        validateTrim(trims[0]);
    });

    function validateTrim(trim: Trim) {
        expect(trim.modelId).toBe('44863');
        expect(trim.makeId).toBe('ford');
        expect(trim.name).toBe('Escape');
        expect(trim.trim).toBe('Hybrid');
        expect(trim.year).toBe(2011);
        expect(trim.body).toBe('SUV');
        expect(trim.enginePosition).toBe('Front');
        expect(trim.engineCC).toBe(2500);
        expect(trim.engineCyclinders).toBe(4);
        expect(trim.engineType).toBe('in-line');
        expect(trim.engineValvesPerCylinder).toBe(4);
        expect(trim.engineHorsepower).toBe(179);
        expect(trim.enginePowerRPM).toBe(6000);
        expect(trim.engineTorqueNewtonMetre).toBe(184);
        expect(trim.engineTorqueRPM).toBe(4500);
        expect(trim.engineBoreMM).toBe(0);
        expect(trim.engineStrokeMM).toBe(0);
        expect(trim.engineCompression).toBe(null);
        expect(trim.engineFuel).toBe('Gasoline / Electric Hybrid');
        expect(trim.topSpeedKilometerPerHour).toBe(0);
        expect(trim.zeroTo100KilometerPerHour).toBe(0);
        expect(trim.drive).toBe('Front');
        expect(trim.transmissionType).toBe('CVT');
        expect(trim.seats).toBe(5);
        expect(trim.doors).toBe(5);
        expect(trim.weightKiloGrams).toBe(1664);
        expect(trim.lengthMM).toBe(4437);
        expect(trim.widthMM).toBe(1806);
        expect(trim.heightMM).toBe(1720);
        expect(trim.wheelbaseMM).toBe(2619);
        expect(trim.litresPer100KilometerHighway).toBe(7.6);
        expect(trim.litresPer100KilometerMixed).toBe(0);
        expect(trim.litresPer100KilometerCity).toBe(6.9);
        expect(trim.fuelCapacityLiters).toBe(57);
        expect(trim.soldInUSA).toBe(true);
        expect(trim.co2).toBe(null);
        expect(trim.make).toBe('Ford');
        expect(trim.display).toBe('Ford');
        expect(trim.country).toBe('USA');
    }

    it('should be called with year', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ year: 2011 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { year: 2011 } }));
    });

    it('should be called with make', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ make: 'Ford' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { make: 'Ford' } }));
    });

    it('should be called with model', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ model: 'Escape' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { model: 'Escape' } }));
    });

    it('should be called with body', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ bodyStyle: BodyStyle.SUV });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { body: BodyStyle.SUV } }));
    });

    it('should be called with doors', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ doors: 4 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { doors: 4 } }));
    });

    it('should be called with drive', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ drive: 'Front' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { drive: 'Front' } }));
    });

    it('should be called with engine_position', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ enginePosition: 'Front' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { engine_position: 'Front' } }));
    });

    it('should be called with engine_type', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ engineType: 'whatever' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { engine_type: 'whatever' } }));
    });

    it('should be called with fuel_type', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ fuelType: 'whatever' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { fuel_type: 'whatever' } }));
    });

    it('should be called with full_results', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ fullResults: true });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { full_results: 1 } }));
    });

    it('should be called with keyword', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ keyword: 'whatever' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { keyword: 'whatever' } }));
    });

    it('should be called with min_cylinders', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ minCylinders: 'whatever' });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { min_cylinders: 'whatever' } }));
    });

    it('should be called with min_lkm_hwy', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ minFuelEfficiencyHighwayInLitresPer100Kilometer: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { min_lkm_hwy: 1 } }));
    });

    it('should be called with min_power', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ minHorsepower: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { min_power: 1 } }));
    });

    it('should be called with min_top_speed', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ minTopSpeedKilometerPerHour: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { min_top_speed: 1 } }));
    });

    it('should be called with min_torque', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ minTorqueNewtonMetre: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { min_torque: 1 } }));
    });

    it('should be called with min_weight', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ minWeightInKilogram: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { min_weight: 1 } }));
    });

    it('should be called with min_year', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ minYear: 1900 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { min_year: 1900 } }));
    });

    it('should be called with max_cylinders', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ maxCylinders: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { max_cylinders: 1 } }));
    });

    it('should be called with max_lkm_hwy', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ maxFuelEfficiencyHighwayInLitresPer100Kilometer: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { max_lkm_hwy: 1 } }));
    });

    it('should be called with max_power', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ maxHorsepower: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { max_power: 1 } }));
    });

    it('should be called with max_top_speed', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ maxTopSpeedKilometerPerHour: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { max_top_speed: 1 } }));
    });

    it('should be called with max_torque', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ maxTorqueNewtonMetre: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { max_torque: 1 } }));
    });

    it('should be called with max_weight', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ maxWeightInKilograms: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { max_weight: 1 } }));
    });

    it('should be called with max_year', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ maxYear: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { max_year: 1 } }));
    });

    it('should be called with seats', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ seats: 1 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { seats: 1 } }));
    });

    it('should be called with sold_in_us', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ soldInUSA: true });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { sold_in_us: 1 } }));
    });
});

describe('getModelDetails', function () {
    beforeEach(function () {
        this.axiosStub = sinon.stub(axios, 'request');
        this.axiosStub.returns({
            data: [{
                'model_id': '11459',
                'model_make_id': 'dodge',
                'model_name': 'Viper SRT10',
                'model_year': '2009',
                'model_body': 'Roadster',
                'model_engine_position': 'Front',
                'model_engine_cc': '8285',
                'model_engine_cyl': '10',
                'model_engine_type': 'V',
                'model_engine_valves_per_cyl': '2',
                'model_engine_power_ps': '506',
                'model_engine_power_rpm': '5600',
                'model_engine_torque_nm': '711',
                'model_engine_torque_rpm': '4200',
                'model_engine_bore_mm': '102.4',
                'model_engine_stroke_mm': '100.6',
                'model_engine_compression': '10.0:1',
                'model_engine_fuel': 'Gasoline - unleaded 95',
                'model_top_speed_kph': '314',
                'model_0_to_100_kph': '3.9',
                'model_drive': 'Rear',
                'model_transmission_type': 'Manual',
                'model_seats': '2',
                'model_doors': '2',
                'model_weight_kg': '1602',
                'model_length_mm': '4470',
                'model_width_mm': '1950',
                'model_height_mm': '1220',
                'model_wheelbase_mm': '2520',
                'model_lkm_hwy': '11',
                'model_lkm_mixed': '21',
                'model_lkm_city': '18',
                'model_fuel_cap_l': '70',
                'model_sold_in_us': '1',
                'model_engine_l': '8.3',
                'model_engine_ci': '506',
                'model_engine_valves': '20',
                'model_engine_power_hp': '499',
                'model_engine_power_kw': '372',
                'model_engine_torque_lbft': '524',
                'model_engine_torque_kgm': '73',
                'model_top_speed_mph': '195',
                'model_weight_lbs': '3532',
                'model_length_in': '176.0',
                'model_width_in': '76.8',
                'model_height_in': '48.0',
                'model_wheelbase_in': '99.2',
                'model_mpg_hwy': '21',
                'model_mpg_city': '13',
                'model_mpg_mixed': '11',
                'model_fuel_cap_g': '18.5',
                'make_display': 'Dodge',
                'make_country': 'USA',
                'ExtColors': [],
                'IntColors': []
            }]
        });
    });

    it('should return details for model', async function () {
        const carQuery = new CarQuery();
        const modelDetail: ModelDetail = await carQuery.getModelDetail(11459);

        expect(modelDetail).toBeDefined();

        expect(modelDetail.modelId).toBe(11459);
        expect(modelDetail.makeId).toBe('dodge');
        expect(modelDetail.modelName).toBe('Viper SRT10');
        expect(modelDetail.year).toBe(2009);
        expect(modelDetail.body).toBe('Roadster');
        expect(modelDetail.enginePosition).toBe('Front');
        expect(modelDetail.engineCC).toBe(8285);
        expect(modelDetail.engineCylinders).toBe(10);
        expect(modelDetail.engineType).toBe('V');
        expect(modelDetail.engineValvesPerCylinder).toBe(2);
        expect(modelDetail.engineHoresepower).toBe(506);
        expect(modelDetail.enginePowerRPM).toBe(5600);
        expect(modelDetail.engineTorqueNewtonMetre).toBe(711);
        expect(modelDetail.engineTorqueRPM).toBe(4200);
        expect(modelDetail.engineBoreMM).toBe(102.4);
        expect(modelDetail.engineStrokeMM).toBe(100.6);
        expect(modelDetail.engineCompression).toBe('10.0:1');
        expect(modelDetail.engineFuel).toBe('Gasoline - unleaded 95');
        expect(modelDetail.topSpeedKilometerPerHour).toBe(314);
        expect(modelDetail.zeroTo100KilometerPerHour).toBe(3.9);
        expect(modelDetail.drive).toBe('Rear');
        expect(modelDetail.transmissionType).toBe('Manual');
        expect(modelDetail.seats).toBe(2);
        expect(modelDetail.doors).toBe(2);
        expect(modelDetail.weightKilograms).toBe(1602);
        expect(modelDetail.lengthMM).toBe(4470);
        expect(modelDetail.widthMM).toBe(1950);
        expect(modelDetail.heightMM).toBe(1220);
        expect(modelDetail.wheelbaseMM).toBe(2520);
        expect(modelDetail.litresPer100KilometerHighway).toBe(11);
        expect(modelDetail.litresPer100KilometerMixed).toBe(21);
        expect(modelDetail.litresPer100KilometerCity).toBe(18);
        expect(modelDetail.fuelCapacityLiters).toBe(70);
        expect(modelDetail.soldInUSA).toBe(true);
        expect(modelDetail.engineLiters).toBe(8.3);
        expect(modelDetail.engineCubicInches).toBe(506);
        expect(modelDetail.engineValves).toBe(20);
        expect(modelDetail.engineHorsepower).toBe(499);
        expect(modelDetail.enginePowerKW).toBe(372);
        expect(modelDetail.engineTorquePoundFoot).toBe(524);
        expect(modelDetail.engineTorqueKilogram).toBe(73);
        expect(modelDetail.topSpeedMilesPerHour).toBe(195);
        expect(modelDetail.weightPounds).toBe(3532);
        expect(modelDetail.lengthInches).toBe(176.0);
        expect(modelDetail.widthInches).toBe(76.8);
        expect(modelDetail.heightInches).toBe(48.0);
        expect(modelDetail.wheelbaseInches).toBe(99.2);
        expect(modelDetail.milesPerGallonHighway).toBe(21);
        expect(modelDetail.milesPerGallonCity).toBe(13);
        expect(modelDetail.milesPerGallonMixed).toBe(11);
        expect(modelDetail.fuelCapacityGallons).toBe(18.5);
        expect(modelDetail.makeDisplay).toBe('Dodge');
        expect(modelDetail.makeCountry).toBe('USA');
        expect(modelDetail.ExtColors).toBeDefined();
        expect(modelDetail.IntColors).toBeDefined();
    });
});