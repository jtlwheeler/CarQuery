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




    year?: number;
    model?: string;
}