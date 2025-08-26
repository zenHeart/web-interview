function thousandSeparator (input) {
  const s = String(input)
  const negative = s.startsWith('-')
  const core = negative ? s.slice(1) : s
  const [intPart, fracPart] = core.split('.')
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return (negative ? '-' : '') + intFormatted + (fracPart !== undefined ? '.' + fracPart : '')
}

module.exports = thousandSeparator


