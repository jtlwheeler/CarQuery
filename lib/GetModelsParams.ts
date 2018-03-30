import { BodyStyle } from "./BodyStyle";

export interface GetModelsParams {
    year: number;
    make: string;
    soldInUSA?: boolean;
    body?: BodyStyle;
}