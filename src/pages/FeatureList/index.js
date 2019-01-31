import React from 'react'
import AppLayout from '../../fragments/AppLayout'
import { callProtectedEndpoint } from '../../utils/api'

export default class FeatureList extends React.Component {
  render() {
    const { user } = this.props
    console.log('user', user)
    const features = [
      {
        title: 'Add cool stuff',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae mau'
      },
      {
        title: 'Add more awesomesauce',
        description: 'Please can I haz more awesum?'
      },
      {
        title: 'Make product less great',
        description: 'The product is too sexy. Plz make less sexy. #TooMuch'
      }
    ]

    const arrowStyle = (!user) ? 'feature-card-voting-disabled' : ''
    const titleTag = (!user) ? 'You must login to vote' : ''

    const list = features.map((feature, i) => {
      return (
        <div className='feature-card' key={i}>
          <div className={`feature-card-voting ${arrowStyle}`} title={titleTag}>
            <div
              className='feature-card-voting-up'
              onClick={() => callProtectedEndpoint('protected-endpoint')}>
              ▲
            </div>
            <div className='feature-card-voting-count'>{12 - (i * 2)}</div>
            <div
              className='feature-card-voting-down'
              onClick={() => callProtectedEndpoint('protected-endpoint')}>
              ▼
            </div>
          </div>
          <div className='feature-card-content'>
            <div className='feature-card-title'>
              {feature.title}
            </div>
            <div>
              {feature.description}
            </div>
          </div>
        </div>
      )
    })

    return (
      <AppLayout>
        <div>
          {list}
        </div>
      </AppLayout>
    )
  }
}
