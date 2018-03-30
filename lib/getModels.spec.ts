import 'jasmine';
import axios from 'axios';
import * as sinon from 'sinon';
import { CarQuery } from './car-query';
import { Model } from './Model';
import { BodyStyle } from './BodyStyle';

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