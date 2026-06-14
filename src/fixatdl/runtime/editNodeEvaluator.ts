type ComparisonOp = 'EQ' | 'NE' | 'LT' | 'GT' | 'LE' | 'GE'

/**
 * Compare two string values, automatically choosing numeric or string
 * comparison based on whether both sides parse as valid numbers.
 *
 * Numeric: both sides are non-empty and parse as finite numbers.
 * String:  fallback when either side is empty or non-numeric.
 */
export function compareValues(lhs: string, rhs: string, op: ComparisonOp): boolean {
  const lhsNum = Number(lhs)
  const rhsNum = Number(rhs)
  const bothNumeric = lhs !== '' && rhs !== '' && !isNaN(lhsNum) && !isNaN(rhsNum)

  if (bothNumeric) {
    switch (op) {
      case 'EQ': return lhsNum === rhsNum
      case 'NE': return lhsNum !== rhsNum
      case 'LT': return lhsNum < rhsNum
      case 'GT': return lhsNum > rhsNum
      case 'LE': return lhsNum <= rhsNum
      case 'GE': return lhsNum >= rhsNum
    }
  }

  switch (op) {
    case 'EQ': return lhs === rhs
    case 'NE': return lhs !== rhs
    case 'LT': return lhs < rhs
    case 'GT': return lhs > rhs
    case 'LE': return lhs <= rhs
    case 'GE': return lhs >= rhs
  }
}
