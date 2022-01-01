import GetUser from "./scenarios/Get-User.js";
import { group , sleep } from 'k6';

export default () => {
    group("API Endpoint Get User - API `ServeRest`", () => {
       GetUser();
    });

    sleep(1);
}