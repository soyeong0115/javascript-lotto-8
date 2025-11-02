export const INPUT_MESSAGE = Object.freeze({
    PURCHASE_AMOUNT: '\n구입금액을 입력해 주세요.\n',
    WINNING_NUMBERS: '\n당첨 번호를 입력해 주세요.\n',
    BONUS_NUMBER: '\n보너스 번호를 입력해 주세요.\n',
});

export const OUTPUT_MESSAGE = Object.freeze({
    WINNING_STATISTICS: '\n당첨 통계\n---',
});

export const ERROR_MESSAGE = Object.freeze({
    OUT_OF_RANGE: '[ERROR] 로또 번호는 1부터 45의 숫자여야 합니다.',
    INVALID_COUNT: '[ERROR] 로또 번호는 6개여야 합니다.',
    DUPLICATE_NUMBER: "[ERROR] 로또 번호는 중복될 수 없습니다.",

    PURCHASE: {
        EMPTY_INPUT: '[ERROR] 구입금액을 입력해 주세요.',
        NOT_NUMBER: '[ERROR] 구입금액은 숫자여야 합니다.',
        NOT_INTEGER: '[ERROR] 구입금액은 정수여야 합니다.',
        NOT_POSITIVE: '[ERROR] 구입금액은 음수가 될 수 없습니다.',
        NOT_MULTIPLE_UNIT: '[ERROR] 구입금액은 1,000원 단위로 입력해야 합니다.',
    },
    
    WINNING_NUMBERS: {
        OUT_OF_RANGE: '[ERROR] 당첨 번호는 1부터 45의 숫자여야 합니다.',
        INVALID_COUNT: '[ERROR] 당첨 번호는 6개여야 합니다.',
        DUPLICATE_NUMBER: "[ERROR] 당첨 번호는 중복될 수 없습니다.",
    },

    BONUS: {
        EMPTY_INPUT: '[ERROR] 보너스 번호를 입력해 주세요.',
        NOT_NUMBER: '[ERROR] 보너스 번호는 숫자여야 합니다.',
        NOT_INTEGER: '[ERROR] 보너스 번호는 정수여야 합니다.',
        OUT_OF_RANGE: '[ERROR] 보너스 번호는 1부터 45의 숫자여야 합니다.',
        DUPLICATE_WITH_WINNING: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
  }    
});

  