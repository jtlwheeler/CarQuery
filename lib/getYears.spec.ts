import 'jasmine';
import axios from 'axios';
import * as sinon from 'sinon';
import { CarQuery } from './car-query';
import Years from './Years';

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