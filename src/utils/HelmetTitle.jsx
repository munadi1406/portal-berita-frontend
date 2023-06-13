import { Helmet,HelmetProvider } from 'react-helmet-async'
import PropTypes from 'prop-types'

export default function HelmetTitle({title}) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  )
}

HelmetTitle.propTypes = {
    title:PropTypes.string.isRequired
}
