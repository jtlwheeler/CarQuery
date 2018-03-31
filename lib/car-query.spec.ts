import 'jasmine';
import axios from 'axios';
import * as sinon from 'sinon';
import { CarQuery } from './car-query';
import Years from './Years';
import Make from './Make';
import { Model } from './Model';
import { BodyStyle } from './BodyStyle';
import { Trim } from './Trim';

describe('getYears()', function () {
    it('should return min and max year', async function () {
        const axiosStub = sinon.stub(axios, 'request');
        axiosStub.returns({
            data: {
                Years: {
                    min_year: "1900",
                    max_year: "2000"
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
                        make_id: "ac",
                        make_display: "AC",
                        make_is_common: "0",
                        make_country: "UK"
                    },
                    {
                        make_id: "acura",
                        make_display: "Acura",
                        make_is_common: "1",
                        make_country: "USA"
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

        expect(makes[0].id).toBe("ac");
        expect(makes[0].display).toBe("AC");
        expect(makes[0].isCommon).toBe(false);
        expect(makes[0].country).toBe("UK");

        expect(makes[1].id).toBe("acura");
        expect(makes[1].display).toBe("Acura");
        expect(makes[1].isCommon).toBe(true);
        expect(makes[1].country).toBe("USA");
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
                        "model_name": "Escape",
                        "model_make_id": "ford"
                    },
                    {
                        "model_name": "Excursion",
                        "model_make_id": "ford"
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

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { make: "Ford", sold_in_us: 1, year: 2000 } }));
    });

    it('should be called with body', async function () {
        const carQuery = new CarQuery();

        await carQuery.getModels({ year: 2000, make: 'Ford', body: BodyStyle.SUV });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { body: "SUV", make: "Ford", year: 2000 } }));
    });
});

describe('getTrims()', function () {
    beforeEach(function () {
        this.axiosStub = sinon.stub(axios, 'request');
        this.axiosStub.returns({
            data: {
                "Trims": [
                    {
                        "model_id": "44863",
                        "model_make_id": "ford",
                        "model_name": "Escape",
                        "model_trim": "Hybrid",
                        "model_year": "2011",
                        "model_body": "SUV",
                        "model_engine_position": "Front",
                        "model_engine_cc": "2500",
                        "model_engine_cyl": "4",
                        "model_engine_type": "in-line",
                        "model_engine_valves_per_cyl": "4",
                        "model_engine_power_ps": "179",
                        "model_engine_power_rpm": "6000",
                        "model_engine_torque_nm": "184",
                        "model_engine_torque_rpm": "4500",
                        "model_engine_bore_mm": null,
                        "model_engine_stroke_mm": null,
                        "model_engine_compression": null,
                        "model_engine_fuel": "Gasoline / Electric Hybrid",
                        "model_top_speed_kph": null,
                        "model_0_to_100_kph": null,
                        "model_drive": "Front",
                        "model_transmission_type": "CVT",
                        "model_seats": "5",
                        "model_doors": "5",
                        "model_weight_kg": "1664",
                        "model_length_mm": "4437",
                        "model_width_mm": "1806",
                        "model_height_mm": "1720",
                        "model_wheelbase_mm": "2619",
                        "model_lkm_hwy": "7.6",
                        "model_lkm_mixed": null,
                        "model_lkm_city": "6.9",
                        "model_fuel_cap_l": "57",
                        "model_sold_in_us": "1",
                        "model_co2": null,
                        "model_make_display": "Ford",
                        "make_display": "Ford",
                        "make_country": "USA"
                    },
                    {
                        "model_id": "44864",
                        "model_make_id": "ford",
                        "model_name": "Escape",
                        "model_trim": "Hybrid Limited",
                        "model_year": "2011",
                        "model_body": "SUV",
                        "model_engine_position": "Front",
                        "model_engine_cc": "2500",
                        "model_engine_cyl": "4",
                        "model_engine_type": "in-line",
                        "model_engine_valves_per_cyl": "4",
                        "model_engine_power_ps": "179",
                        "model_engine_power_rpm": "6000",
                        "model_engine_torque_nm": "184",
                        "model_engine_torque_rpm": "4500",
                        "model_engine_bore_mm": null,
                        "model_engine_stroke_mm": null,
                        "model_engine_compression": null,
                        "model_engine_fuel": "Gasoline / Electric Hybrid",
                        "model_top_speed_kph": null,
                        "model_0_to_100_kph": null,
                        "model_drive": "Front",
                        "model_transmission_type": "CVT",
                        "model_seats": "5",
                        "model_doors": "5",
                        "model_weight_kg": "1664",
                        "model_length_mm": "4437",
                        "model_width_mm": "1806",
                        "model_height_mm": "1720",
                        "model_wheelbase_mm": "2619",
                        "model_lkm_hwy": "7.6",
                        "model_lkm_mixed": null,
                        "model_lkm_city": "6.9",
                        "model_fuel_cap_l": "57",
                        "model_sold_in_us": "1",
                        "model_co2": null,
                        "model_make_display": "Ford",
                        "make_display": "Ford",
                        "make_country": "USA"
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
        expect(trim.modelId).toBe("44863");
        expect(trim.makeId).toBe('ford');
        expect(trim.name).toBe("Escape");
        expect(trim.trim).toBe("Hybrid");
        expect(trim.year).toBe(2011);
        expect(trim.body).toBe("SUV");
        expect(trim.enginePosition).toBe("Front");
        expect(trim.engineCC).toBe(2500);
        expect(trim.engineCyclinders).toBe(4);
        expect(trim.engineType).toBe("in-line");
        expect(trim.engineValvesPerCylinder).toBe(4);
        expect(trim.engineHorsepower).toBe(179);
        expect(trim.enginePowerRPM).toBe(6000);
        expect(trim.engineTorqueNewtonMetre).toBe(184);
        expect(trim.engineTorqueRPM).toBe(4500);
        expect(trim.engineBoreMM).toBe(0);
        expect(trim.engineStrokeMM).toBe(0);
        expect(trim.engineCompression).toBe(null);
        expect(trim.engineFuel).toBe("Gasoline / Electric Hybrid");
        expect(trim.topSpeedKilometerPerHour).toBe(0);
        expect(trim.zeroTo100KilometerPerHour).toBe(0);
        expect(trim.drive).toBe("Front");
        expect(trim.transmissionType).toBe("CVT");
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
        expect(trim.make).toBe("Ford");
        expect(trim.display).toBe("Ford");
        expect(trim.country).toBe("USA");
    }

    it('should be called with year', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ year: 2011 });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { year: 2011 } }));
    });

    it('should be called with make', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ make: "Ford" });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { make: "Ford" } }));
    });

    it('should be called with model', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ model: "Escape" });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { model: "Escape" } }));
    });

    it('should be called with body', async function () {
        const carQuery = new CarQuery();
        await carQuery.getTrims({ bodyStyle: BodyStyle.SUV });

        sinon.assert.calledWith(this.axiosStub, sinon.match({ params: { body: BodyStyle.SUV } }));
    });
});