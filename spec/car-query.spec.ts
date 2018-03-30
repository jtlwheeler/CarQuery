import 'jasmine';
import { CarQuery } from '../lib/car-query';
import Years from '../lib/Years';
import Make from '../lib/Make';
import axios from 'axios';

describe('CarQuery API', function () {
    it('getYears() should return min and max year', function (done) {
        const carQuery = new CarQuery();

        carQuery.getYears()
            .then((years: Years) => {
                expect(years.minYear).toBeGreaterThanOrEqual(0);
                expect(years.maxYear).toBeGreaterThanOrEqual(0);

                done();
            })
            .catch((error) => done.fail(error));
    });

    describe('getMakes()', function () {
        it('should return makes for given year', function (done) {
            const carQuery = new CarQuery();

            carQuery.getMakes(2011)
                .then((make: Make[]) => {
                    expect(make).toBeDefined();
                    expect(make.length).toBeGreaterThanOrEqual(0);

                    done();
                })
                .catch((error) => done.fail(error));
        });

        it('should return USA makes for given year', function (done) {
            const carQuery = new CarQuery();

            carQuery.getMakes(2011, true)
                .then((make: Make[]) => {
                    expect(make).toBeDefined();
                    expect(make.length).toBeGreaterThanOrEqual(0);

                    done();
                })
                .catch((error) => done.fail(error));
        });
    });
});