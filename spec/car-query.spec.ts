import 'jasmine';
import { CarQuery } from '../lib/car-query';
import Years from '../lib/Years';

describe('CarQuery API', function () {
    describe('getYears()', function () {
        it('should return min and max year', function (done) {
            const carQuery = new CarQuery();

            carQuery.getYears()
                .then((years: Years) => {
                    expect(years.minYear).toBeGreaterThanOrEqual(0);
                    expect(years.maxYear).toBeGreaterThanOrEqual(0);

                    done();
                })
                .catch((error) => done.fail(error));
        });
    });
});