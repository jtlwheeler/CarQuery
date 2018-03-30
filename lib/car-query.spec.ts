import 'jasmine';
import axios from 'axios';
import * as sinon from 'sinon';
import { CarQuery } from './car-query';
import Years from './Years';
import Make from './Make';
import { Model } from './Model';
import { BodyStyle } from './BodyStyle';

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