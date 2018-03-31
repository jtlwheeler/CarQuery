import { BodyStyle } from "./BodyStyle";

export interface GetTrimsParams {
    bodyStyle?: BodyStyle,
    doors?: number;
    drive?: string;
    enginePosition?: string;
    engineType?: string;
    fuelType?: string;
    fullResults?: boolean;
    year?: number;
    make?: string;
    model?: string;
}