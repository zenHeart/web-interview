import React, { ReactNode } from 'react'

interface ColumnProps {
   children: ReactNode[];
   title?: string; // Optional title for the column
}

interface ColumnItemProps {
   children: ReactNode;
}

export function Column ({ children, title }: ColumnProps) {
  // Filter out empty children
  const items = React.Children.toArray(children).filter(Boolean)

  return (
      <div
         style={{
           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Always add shadow to indicate grouping
           padding: title ? '1rem' : '0.5rem',
           borderRadius: '8px',
           backgroundColor: '#fff',
           marginBottom: '1rem' // Add spacing between groups
         }}
      >
         {title && (
            <div
               style={{
                 fontWeight: 'bold',
                 fontSize: '1rem',
                 marginBottom: '1rem',
                 borderBottom: '1px solid #ddd',
                 paddingBottom: '0.5rem'
               }}
            >
               {title}
            </div>
         )}
         <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1.5rem',
              alignItems: 'start',
              flexWrap: 'wrap' // Allow wrapping for responsive behavior
            }}
         >
            {items.map((item, index) => (
               <div
                  key={index}
                  style={{
                    flexGrow: 1, // Allow each column to grow and occupy remaining space
                    flexBasis: 0, // Ensure columns shrink properly
                    minWidth: '200px' // Optional: Set a minimum width for better responsiveness
                  }}
               >
                  {item}
               </div>
            ))}
         </div>
      </div>
  )
}

export function ColumnItem ({ children }: ColumnItemProps) {
  // Children might be React nodes rendered from markdown
  return <div>{children}</div>
}

// Default export for easier usage
export default Column
