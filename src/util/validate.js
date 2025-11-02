import { LOTTO_CONFIG } from "../constant/lotto.js";

export const validate = {
    isNumber(input) {
        const number = Number(input);
        return !Number.isNaN(number);
    },

    isInteger(input) {
        const number = Number(input);
        return Number.isInteger(number);
    },

    isEmpty(input = '') {
        return input.trim() === '';
    },

    isPositiveNumber(input) {
        const number = Number(input);
        return number > 0;
    },

    hasDuplicate(numbers) {
        return new Set(numbers).size !== numbers.length;
    },

    hasValidCount(numbers) {
        return numbers.length === LOTTO_CONFIG.RANDOM_COUNT;
    },

    areNumbersInRange(numbers) {
        const isValidNumber = (num) => 
            Number.isInteger(num) &&
            num >= LOTTO_CONFIG.RANDOM_MIN &&
            num <= LOTTO_CONFIG.RANDOM_MAX;

        return numbers.every(isValidNumber);
    },

    isInRange(number) {
        return number >= LOTTO_CONFIG.RANDOM_MIN && number <= LOTTO_CONFIG.RANDOM_MAX;
    }
};