import 'jasmine';
import * as sinon from 'sinon';
import axios from 'axios';
import { CarQuery } from './car-query';
import Make from './Make';

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