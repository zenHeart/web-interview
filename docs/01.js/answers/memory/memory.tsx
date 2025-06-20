const containerStyle = {
  background: '#4c576c1a',
  padding: '16px',
  borderRadius: '16px',
  fontFamily: 'sans-serif',
  maxWidth: '600px',
  width: '100%'
}

const boxStyle = {
  borderRadius: '8px',
  padding: '8px 12px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '14px',
  textAlign: 'center',
  margin: '4px',
  minWidth: '100px',
  flex: 1
}

const sectionStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '8px'
}

const MemoryOverview = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
      <div style={containerStyle}>
        <h2
          style={{
            fontSize: '18px',
            marginBottom: '12px',
            textAlign: 'center'
          }}
        >
          内存概览图
        </h2>

        <div style={sectionStyle}>
          <div style={{ ...boxStyle, backgroundColor: '#ea4aaa' }}>
            新生代
            <br />
            (new_space)
          </div>
          <div style={{ ...boxStyle, backgroundColor: '#9256f2' }}>
            老生代
            <br />
            (old_space)
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={{ ...boxStyle, backgroundColor: '#f44336' }}>
            大对象空间
            <br />
            (large_object_space)
          </div>
          <div style={{ ...boxStyle, backgroundColor: '#ff6d00' }}>
            代码空间
            <br />
            (code_space)
          </div>
          <div style={{ ...boxStyle, backgroundColor: '#bf8c00' }}>
            Map 空间
            <br />
            (map_space)
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={{ ...boxStyle, backgroundColor: '#666' }}>
            只读空间
            <br />
            (read_only_space)
          </div>
          <div style={{ ...boxStyle, backgroundColor: '#00bfa5' }}>
            大代码对象空间
            <br />
            (code_large_object_space)
          </div>
          <div style={{ ...boxStyle, backgroundColor: '#7cb342' }}>
            新生代大对象空间
            <br />
            (new_large_object_space)
          </div>
        </div>

        <div style={{ ...sectionStyle, justifyContent: 'center' }}>
          <div
            style={{
              ...boxStyle,
              backgroundColor: '#448aff',
              width: '90%',
              maxWidth: '550px'
            }}
          >
            栈空间
            <br />
            (stack)
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryOverview
