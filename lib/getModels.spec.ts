import 'jasmine';
import axios from 'axios';
import * as sinon from 'sinon';
import { CarQuery } from './car-query';
import { Model } from './Model';

describe('getModels()', function () {
    it('should return models', async function () {
        const axiosStub = sinon.stub(axios, 'request');
        axiosStub.returns({
            data: {
                Models: [
                    {
                        "model_name": "Escape",
                        "model_make_id": "ford"
                    },
                    {
                        "model_name": "Excursion",
                        "model_make_id": "ford"
                    }]
            }
        });

        const carQuery = new CarQuery();
        const models: Model[] = await carQuery.getModels(2000, 'Ford');

        expect(models.length).toBe(2);

        expect(models[0].name).toBe('Escape');
        expect(models[0].makeId).toBe('ford');

        expect(models[1].name).toBe('Excursion');
        expect(models[1].makeId).toBe('ford');

        axiosStub.restore();
    });
});