import { createLazyFileRoute } from '@tanstack/react-router'
import { AuthPageContainer } from './-container'

export const Route = createLazyFileRoute('/auth/')({
  component: AuthPageContainer,
})
