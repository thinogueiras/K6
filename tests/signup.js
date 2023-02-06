import http from 'k6/http';
import { sleep, check } from 'k6';

import uudi from './libs/uuid.js';

export default function () {
    const url = 'http://localhost:3333/signup';

    const payload = JSON.stringify(
        { email: `${uudi.v4().substring(24)}@qa.qacademy.com.br`, password: '123456' },
    );

    const headers = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, headers);

    console.log(res.body);

    check(res, {
        'Status Code Should Be 201': (r) => r.status === 201,
    });

    sleep(1);
}
