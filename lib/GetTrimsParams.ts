import { BodyStyle } from "./BodyStyle";

export interface GetTrimsParams {
    bodyStyle?: BodyStyle,
    doors?: number;
    drive?: string;
    enginePosition?: string;
    engineType?: string;
    fuelType?: string;
    fullResults?: boolean;
    keyword?: string;
    make?: string;
    minCylinders?: string;
    minFuelEfficiencyHighwayInLitresPer100Kilometer?: number;
    minHorsepower?: number;
    minTopSpeedKilometerPerHour?: number;
    minTorqueNewtonMetre?: number;
    minWeightInKilogram?: number;
    minYear?: number;
    maxCylinders?: number;
    maxFuelEfficiencyHighwayInLitresPer100Kilometer?: number;
    maxHorsepower?: number;
    maxTopSpeedKilometerPerHour?: number;
    maxTorqueNewtonMetre?: number;
    maxWeightInKilograms?: number;
    maxYear?: number;




    model?: string;
    year?: number;
}