import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate } from "k6/metrics";
import { check, fail } from "k6";

export let GetProductDuration = new Trend("get_product_duration");
export let GetProductFailRate = new Rate("get_product_fail_rate");
export let GetProductSuccessRate = new Rate("get_product_success_rate");
export let GetProductReqs = new Rate("get_product_reqs");

export default function () {
    let res = http.get('https://serverest.dev/produtos');

    GetProductDuration.add(res.timings.duration);
    GetProductReqs.add(1);
    GetProductFailRate.add(res.status === 0 || res.status > 399);
    GetProductSuccessRate.add(res.status < 399);
    
let durationMsg = "Max duration ${1000/1000}"

    if(!check(res, {
        'max duration': (r) => r.timings.duration < 1000,
    })){
        fail(durationMsg);
    }
    
    sleep(1);

}