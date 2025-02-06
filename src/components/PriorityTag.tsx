const PriorityTag = ({ priority }: { priority: string }) => {
   const styles = {
     tag: {
       display: 'inline-block',
       padding: '2px 8px',
       borderRadius: '4px',
       fontSize: '12px',
       marginLeft: '8px',
       fontWeight: 600,
       boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
     },
     p0: {
       backgroundColor: '#ffeaea',
       color: '#dc3545',
       border: '1px solid #ffcdd2',
     },
     p1: {
       backgroundColor: '#fff3e0',
       color: '#f57c00',
       border: '1px solid #ffe0b2',
     },
     p2: {
       backgroundColor: '#fff8e1',
       color: '#ffa000',
       border: '1px solid #ffecb3',
     },
     p3: {
       backgroundColor: '#f1f8e9',
       color: '#689f38',
       border: '1px solid #dcedc8',
     },
     p4: {
       backgroundColor: '#e8f5e9',
       color: '#388e3c',
       border: '1px solid #c8e6c9',
     },
   };
 
   const priorityStyle = {
     ...styles.tag,
     ...(styles[priority.toLowerCase() as keyof typeof styles] || {}),
   };
 
   return <span style={priorityStyle}>{priority}</span>;
 };
 export default PriorityTag