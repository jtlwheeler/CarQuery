import { BodyStyle } from "./BodyStyle";

export interface GetTrimsParams {
    bodyStyle?: BodyStyle,
    doors?: number;
    drive?: string;
    enginePosition?: string;
    engineType?: string;
    year?: number;
    make?: string;
    model?: string;
}