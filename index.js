import GetUser from "./scenarios/Get-User.js";
import { group , sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
}

export default () => {
    group("API Endpoint Get User - API `ServeRest`", () => {
       GetUser();
    });

    sleep(1);
}