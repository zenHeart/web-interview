import { useState } from 'react'
// 引入ieee754工具
import { getNumberIEEE754Components } from './ieee754.js'

const Ieee754ConceptCard = ({ value = 32.375 }) => {
  // 新增：本地输入状态
  const [inputValue, setInputValue] = useState(value)
  const [displayValue, setDisplayValue] = useState(value)

  // 动态获取IEEE 754结构
  const comp = getNumberIEEE754Components(displayValue, 'double')

  const bodyStyle = {
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem'
  }

  const infoCardStyle = {
    backgroundColor: '#ffffff',
    border: '2px solid #0ea5e9',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 10px 20px -5px rgba(14, 165, 233, 0.3), 0 4px 6px -2px rgba(14, 165, 233, 0.15)',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }

  const infoCardH3Style = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#0369a1',
    textAlign: 'center',
    marginBottom: '0.5rem',
    borderBottom: '2px solid #7dd3fc',
    paddingBottom: '0.5rem'
  }

  const infoSectionStyle = {
    padding: '0.75rem',
    backgroundColor: '#f0f9ff',
    borderRadius: '0.5rem',
    border: '1px solid #bae6fd'
  }

  const infoSectionH4Style = {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#075985',
    marginBottom: '0.5rem'
  }

  const commonTextStyles = {
    fontSize: '0.875rem',
    color: '#0c4a6e',
    lineHeight: 1.5,
    marginBottom: '0.25rem'
  }

  const infoSectionUlStyle = {
    listStyleType: 'none',
    paddingLeft: 0
  }

  const infoSectionUlLiStrongStyle = {
    color: '#0369a1'
  }

  const bitLayoutStyle = {
    fontFamily: 'monospace',
    backgroundColor: '#cffafe',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    wordBreak: 'break-all'
  }

  const formulaStyle = {
    fontFamily: 'monospace',
    backgroundColor: '#a5f3fc',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    fontSize: '0.9rem',
    color: '#155e75',
    textAlign: 'center',
    border: '1px solid #22d3ee'
  }

  const exampleValueStyle = {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    wordBreak: 'break-all',
    backgroundColor: '#ecfeff',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    display: 'inline-block'
  }

  // 解析阶码和尾数
  const exponentBits = comp.exponent.bits
  const exponentStored = comp.exponent.storedValue
  const exponentActual = exponentStored - 1023
  const mantissaBits = comp.mantissa.bits
  // 十六进制
  const hex = BigInt('0b' + comp.binaryString).toString(16).padStart(16, '0')

  // 新增：输入框事件
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    const num = Number(e.target.value)
    if (!Number.isNaN(num)) {
      setDisplayValue(num)
    }
  }

  return (
    <div style={bodyStyle}>
      <div style={infoCardStyle}>
        <h3 style={infoCardH3Style}>IEEE 754 浮点数 (64位双精度)</h3>

        <div style={infoSectionStyle}>
          <h4 style={infoSectionH4Style}>结构 (64位)</h4>
          <p style={{ ...commonTextStyles, ...bitLayoutStyle }}>
            [S (1位)] [阶码 E (11位)] [尾数 M (52位)]
          </p>
        </div>

        <div style={infoSectionStyle}>
          <h4 style={infoSectionH4Style}>组件释义</h4>
          <ul style={infoSectionUlStyle}>
            <li style={commonTextStyles}><strong style={infoSectionUlLiStrongStyle}>符号 (S):</strong> 0 = 正 (+)，1 = 负 (-)。</li>
            <li style={commonTextStyles}><strong style={infoSectionUlLiStrongStyle}>阶码 (E):</strong> 存储偏移后的指数。实际指数 = E<sub>存储值</sub> - 1023。</li>
            <li style={commonTextStyles}><strong style={infoSectionUlLiStrongStyle}>尾数 (M):</strong> 存储规格化后的小数点后部分。实际有效数字为 1.M (隐藏位 1)。</li>
          </ul>
        </div>

        <div style={infoSectionStyle}>
          <h4 style={infoSectionH4Style}>计算公式</h4>
          <p style={{ ...commonTextStyles, ...formulaStyle }}>
            数值 = (-1)<sup>S</sup> × 2<sup>(E<sub>存储值</sub> - 1023)</sup> × (1.M)
          </p>
        </div>

        <div style={infoSectionStyle}>
          <h4 style={infoSectionH4Style}>示例：十进制数 {String(displayValue)}</h4>
          <div style={{ marginBottom: '0.75rem' }}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              style={{
                fontFamily: 'monospace',
                fontSize: '1rem',
                padding: '0.25rem 0.5rem',
                border: '1px solid #bae6fd',
                borderRadius: '0.25rem',
                marginRight: '0.5rem',
                width: '60%'
              }}
              placeholder="输入任意数值"
            />
            <span style={{ color: '#888', fontSize: '0.9rem' }}>输入后自动转换</span>
          </div>
          <ul style={infoSectionUlStyle}>
            <li style={commonTextStyles}><strong style={infoSectionUlLiStrongStyle}>符号 (S):</strong> {comp.sign.bit}</li>
            <li style={commonTextStyles}><strong style={infoSectionUlLiStrongStyle}>实际指数:</strong> {exponentActual}</li>
            <li style={commonTextStyles}><strong style={infoSectionUlLiStrongStyle}>阶码 (E<sub>存储值</sub>):</strong> {exponentStored} (二进制: {exponentBits})</li>
            <li style={commonTextStyles}><strong style={infoSectionUlLiStrongStyle}>尾数 (M<sub>分数部分</sub>):</strong> .{mantissaBits.replace(/0+$/, '') || '0'} (二进制)</li>
            <li style={commonTextStyles}>
              <strong style={infoSectionUlLiStrongStyle}>尾数域 (M<sub>存储值</sub>, 52位):</strong><br />
              <span style={exampleValueStyle}>{mantissaBits}</span>
            </li>
            <li style={commonTextStyles} className="mt-2">
              <strong style={infoSectionUlLiStrongStyle}>IEEE 754 二进制表示 (64位):</strong><br />
              <span style={exampleValueStyle}>{comp.binaryString}</span>
            </li>
            <li style={commonTextStyles} className="mt-1">
              <strong style={infoSectionUlLiStrongStyle}>十六进制表示:</strong> <span style={exampleValueStyle}>{hex}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Ieee754ConceptCard
