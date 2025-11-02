export const INPUT_MESSAGE = Object.freeze({
    PURCHASE_AMOUNT: '\n구입금액을 입력해 주세요.\n',
    WINNING_NUMBERS: '\n당첨 번호를 입력해 주세요.\n',
    BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
});

export const OUTPUT_MESSAGE = Object.freeze({
    WINNING_STATISTICS: '\n당첨 통계\n---',
});

export const ERROR_MESSAGE = Object.freeze({
    EMPTY_INPUT: '[ERROR] 입력값을 입력해 주세요.',
    NOT_NUMBER: '[ERROR] 숫자를 입력해야 합니다.',
    NOT_INTEGER: '[ERROR] 정수를 입력해야 합니다.',
    NOT_POSITIVE: '[ERROR] 양수를 입력해야 합니다.',
    NOT_MULTIPLE_UNIT: `[ERROR] 구입금액은 1,000원 단위로 입력해야 합니다.`,

    OUT_OF_RANGE: `[ERROR] 로또 번호는 1부터 45의 숫자여야 합니다.`,
    DUPLICATE_NUMBER: "[ERROR] 중복된 숫자는 입력할 수 없습니다.",
    INVALID_COUNT: "[ERROR] 로또 번호는 6개여야 합니다.",
});