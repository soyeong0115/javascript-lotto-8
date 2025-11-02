import { LOTTO_CONFIG } from "../constant/lotto.js";

export function parseLottoNumbers(input) {
  const splitted = input.split(LOTTO_CONFIG.DELIMITER);
  const numbers = splitted.map(n => Number(n.trim()));
  return numbers;
}