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
                .then((makes: Make[]) => {
                    expect(makes).toBeDefined();
                    expect(makes.length).toBeGreaterThanOrEqual(0);

                    for (const make of makes) {
                        expect(make.id).toBeDefined();
                        expect(make.display).toBeDefined();
                        expect(make.country).toBeDefined();
                        expect(make.isCommon).toBeDefined();
                    }

                    done();
                })
                .catch((error) => done.fail(error));
        });

        it('should return USA makes for given year', function (done) {
            const carQuery = new CarQuery();

            carQuery.getMakes(2011, true)
                .then((makes: Make[]) => {
                    expect(makes).toBeDefined();
                    expect(makes.length).toBeGreaterThanOrEqual(0);

                    for (const make of makes) {
                        expect(make.id).toBeDefined();
                        expect(make.display).toBeDefined();
                        expect(make.country).toBeDefined();
                        expect(make.isCommon).toBeDefined();
                    }

                    done();
                })
                .catch((error) => done.fail(error));
        });
    });

    describe('getModels()', function () {
        it('should return models for given year and make', async function (done) {
            const year = 2011;
            const make = 'Ford';
            const carQuery = new CarQuery();

            const models = await carQuery.getModels({
                year: year,
                make: make
            });

            expect(models).toBeDefined();
            expect(models.length).toBeGreaterThanOrEqual(0);

            for (const model of models) {
                expect(model.makeId.toUpperCase()).toBe(make.toUpperCase());
                expect(model.name).toBeDefined();
            }

            done();
        });
    });
});