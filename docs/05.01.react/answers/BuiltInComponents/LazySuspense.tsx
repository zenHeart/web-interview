import { Suspense, lazy } from 'react'

export default function App () {
  const LazyComponent = lazy(() => import('./LazyComponent'))

  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
