import { Console } from '@woowacourse/mission-utils';

const outputView = {
    printLottoCount(count) {
        Console.print(`\n${count}개를 구매했습니다.`);
    },

    printLottos(lottos) {
        lottos.forEach((lotto) => {
            Console.print(`[${lotto.getNumbers().join(", ")}]`);
        });
    },
};

export default outputView;