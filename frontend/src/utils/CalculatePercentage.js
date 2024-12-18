/**
 ** (số cân hiện tại - số cân ban đầu)/(Số cân mục tiêu - số cân ban đầu)
 *? type: 0 = loss, 1 = gain
 * @param {*} params
 */

export function CalculatePercentageWeight(crr, target, init, type = 0) {
  let result =
    crr && target && init
      ? (crr - init) / (target - init) > 0
        ? (crr - init) / (target - init)
        : 0
      : 0;
  if (!isFinite(result) && result > 0) {
    result = type ? crr / target : target / crr;
  }

  return Math.round(result * 100);
}

export function CalculatePercentageEvaluate(crr, max) {
  let result = crr && max ? crr / max : 0;
  return Math.round(result * 100);
}
