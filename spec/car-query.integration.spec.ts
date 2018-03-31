import 'jasmine';
import { CarQuery } from '../lib/car-query';
import Years from '../lib/Years';
import Make from '../lib/Make';
import axios from 'axios';
import { Trim } from '../lib/Trim';

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

    describe('getTrims()', function () {
        it('should return trims forn give year and make', async function (done) {
            const year = 2011;
            const make = 'Ford';
            const carQuery = new CarQuery();

            const trims = await carQuery.getTrims({
                year: year,
                make: make
            });

            expect(trims).toBeDefined();
            expect(trims.length).toBeGreaterThan(0);

            for (const trim of trims) {
                expect(trim.year).toBe(year);
                expect(trim.make.toUpperCase()).toBe(make.toUpperCase());

                expect(trim.modelId).toBeDefined();
                expect(trim.makeId).toBeDefined();
                expect(trim.name).toBeDefined();
                expect(trim.trim).toBeDefined();
                expect(trim.body).toBeDefined();
                expect(trim.enginePosition).toBeDefined();
                expect(trim.engineCC).toBeDefined();
                expect(trim.engineCyclinders).toBeDefined();
                expect(trim.engineType).toBeDefined();
                expect(trim.engineValvesPerCylinder).toBeDefined();
                expect(trim.engineHorsepower).toBeDefined();
                expect(trim.enginePowerRPM).toBeDefined();
                expect(trim.engineTorqueNewtonMetre).toBeDefined();
                expect(trim.engineTorqueRPM).toBeDefined();
                expect(trim.engineBoreMM).toBeDefined();
                expect(trim.engineStrokeMM).toBeDefined();
                expect(trim.engineCompression).toBeDefined();
                expect(trim.engineFuel).toBeDefined();
                expect(trim.topSpeedKilometerPerHour).toBeDefined();
                expect(trim.zeroTo100KilometerPerHour).toBeDefined();
                expect(trim.drive).toBeDefined();
                expect(trim.transmissionType).toBeDefined();
                expect(trim.seats).toBeDefined();
                expect(trim.doors).toBeDefined();
                expect(trim.weightKiloGrams).toBeDefined();
                expect(trim.lengthMM).toBeDefined();
                expect(trim.widthMM).toBeDefined();
                expect(trim.heightMM).toBeDefined();
                expect(trim.wheelbaseMM).toBeDefined();
                expect(trim.litresPer100KilometerHighway).toBeDefined();
                expect(trim.litresPer100KilometerMixed).toBeDefined();
                expect(trim.litresPer100KilometerCity).toBeDefined();
                expect(trim.fuelCapacityLiters).toBeDefined();
                expect(trim.soldInUSA).toBeDefined();
                expect(trim.co2).toBeDefined();
                expect(trim.display).toBeDefined();
                expect(trim.country).toBeDefined();
            }

            done();
        });
    });
});