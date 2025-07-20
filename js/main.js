/**
 * @copyright 2025 Miller Zhang
 * @author Miller Zhang
 * @license Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * {@link http://www.apache.org/licenses/LICENSE-2.0}
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const randPwd = () => {
    let pwd = '-****-****-****'.split('');
    pwd[RandomUtils.randomBase() % 11 > 3 ? RandomUtils.randomBase() % 2 * 5 + 6 + RandomUtils.randomBase() % 4 : RandomUtils.randomBase() % 3 + 2] = RandomUtils.randomDigit();
    let cnt = 0;
    pwd.forEach((char, index) => {
		if (char === '-') {
			cnt = 0;
			return;
		}
		cnt++;
		if (char >= '0' && char <= '9')
			return;
		pwd[index] = (function generate() {
			const key = RandomUtils.randomLetter();
			for (let j = 1; j < cnt; j++)
				if (pwd[index - j] === key)
					return generate();
			return key;
		})();
    });
    return pwd.join('').slice(1);
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const isJSONrequested = urlParams.get('json') === 'true';

const genedPwd = randPwd();

if (isJSONrequested) {
    const responseObj = {
        code: 200,
        msg: 'success',
        data: {
            pwd: genedPwd
        }
    };
    document.getElementById("rand-pwd").textContent = JSON.stringify(responseObj, null, 2);
}
else document.getElementById("rand-pwd").textContent = genedPwd;
