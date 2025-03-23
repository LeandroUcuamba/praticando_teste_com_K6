import GetUser from "./scenarios/Get-User.js";
import { group , sleep } from 'k6';
import GetProduct from "./scenarios/Get-Product.js";

export const options = {
    scenarios: {
      users: {
        executor: 'constant-vus',
        exec: 'users',
        vus: 10,
        duration: '30s',
      },
      products: {
        executor: 'per-vu-iterations',
        exec: 'products',
        vus: 10,
        iterations: 100,
        startTime: '30s',
        maxDuration: '1m'
      },
    },
};

export function users() {
    group("API Endpoint Get User - API `ServeRest`", () => {
        GetUser();
     });
}

export function products() {
    group("API Endpoint Get Product - API `ServeRest`", () => {
        GetProduct();
     });
}

