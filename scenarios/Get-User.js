import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate } from "k6/metrics";
import { check, fail } from "k6";

export let GetUserDuration = new Trend("get_user_duration");
export let GetUserFailRate = new Rate("get_user_fail_rate");
export let GetUserSuccessRate = new Rate("get_user_success_rate");
export let GetUserReqs = new Rate("get_user_reqs");

export default function () {
    let res = http.get('https://serverest.dev/usuarios');

    GetUserDuration.add(res.timings.duration);
    GetUserReqs.add(1);
    GetUserFailRate.add(res.status === 0 || res.status > 399);
    GetUserSuccessRate.add(res.status < 399);
    
let durationMsg = "Max duration ${1000/1000}"

    if(!check(res, {
        'max duration': (r) => r.timings.duration < 1000,
    })){
        fail(durationMsg);
    }
    
    sleep(1);

}