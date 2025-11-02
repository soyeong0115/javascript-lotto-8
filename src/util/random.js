import { MissionUtils } from '@woowacourse/mission-utils';
import { LOTTO_CONFIG } from '../constant/lotto.js';

export const getRandomLottoNumbers = () =>
    MissionUtils.Random.pickUniqueNumbersInRange(
        LOTTO_CONFIG.RANDOM_MIN,
        LOTTO_CONFIG.RANDOM_MAX,
        LOTTO_CONFIG.RANDOM_COUNT
    );