import 'jasmine';
import { CarQuery } from '../lib/car-query';
import { Years } from '../lib/Years';
import { Make } from '../lib/Make';
import axios from 'axios';
import { Trim } from '../lib/Trim';

describe('CarQuery API integration tests', function () {
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

            try {
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
            } catch (error) {
                done.fail(error);
            }
        });
    });

    describe('getTrims()', function () {
        it('should return trims forn give year and make', async function (done) {
            const year = 2011;
            const make = 'Ford';
            const carQuery = new CarQuery();

            try {
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
                    expect(trim.engineCylinders).toBeDefined();
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
            } catch (error) {
                done.fail(error);
            }
        });
    });

    describe('getModelDetail()', function () {
        it('should return model detail', async function (done) {
            const carQuery = new CarQuery();

            try {
                const modelDetail = await carQuery.getModelDetail(11459);

                expect(modelDetail).toBeDefined();

                expect(modelDetail.modelId).toBe(11459);
                expect(modelDetail.makeId).toBe('dodge');
                expect(modelDetail.modelName).toBe('Viper');
                expect(modelDetail.trim).toBe('SRT-10');
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
                expect(modelDetail.engineFuel).toBe('Gasoline');
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
                expect(modelDetail.litresPer100KilometerHighway).toBe(10.7);
                expect(modelDetail.litresPer100KilometerMixed).toBe(21.2);
                expect(modelDetail.litresPer100KilometerCity).toBe(18.1);
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
                expect(modelDetail.milesPerGallonHighway).toBe(22);
                expect(modelDetail.milesPerGallonCity).toBe(13);
                expect(modelDetail.milesPerGallonMixed).toBe(11);
                expect(modelDetail.fuelCapacityGallons).toBe(18.5);
                expect(modelDetail.makeDisplay).toBe('Dodge');
                expect(modelDetail.makeCountry).toBe('USA');
                expect(modelDetail.ExtColors).toBeDefined();
                expect(modelDetail.IntColors).toBeDefined();

                done();
            } catch (error) {
                done.fail(error);
            }
        });
    });
});