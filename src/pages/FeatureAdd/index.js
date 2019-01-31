import React from 'react'
import AppLayout from '../../fragments/AppLayout'

const FeatureList = (props) => {
  return (
    <AppLayout>
      <div className='feature-add'>
        <div className='input-wrapper'>
          <input placeholder='Feature Title' name='name' />
        </div>
        <div className='input-wrapper'>
          <textarea placeholder='Feature Description' name='description' />
        </div>
        <div>
          <button>
            Submit
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

export default FeatureList
