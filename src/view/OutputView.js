import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constant/message.js';

const outputView = {
    printLottoCount(count) {
        Console.print(`\n${count}개를 구매했습니다.`);
    },

    printLottos(lottos) {
        lottos.forEach((lotto) => {
            Console.print(`[${lotto.getNumbers().join(", ")}]`);
        });
    },

    printResult(result, yieldRate) {
        Console.print(OUTPUT_MESSAGE.WINNING_STATISTICS);

        Console.print(`3개 일치 (5,000원) - ${result.FIFTH}개`);
        Console.print(`4개 일치 (50,000원) - ${result.FOURTH}개`);
        Console.print(`5개 일치 (1,500,000원) - ${result.THIRD}개`);
        Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${result.SECOND}개`);
        Console.print(`6개 일치 (2,000,000,000원) - ${result.FIRST}개`);

        Console.print(`총 수익률은 ${yieldRate}%입니다.`);
    },

    printError(message) {
        Console.print(message);
    }
};

export default outputView;