import React from 'react'

import './collection-overview.styles.scss'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectShopData} from '../../redux/shop/shop.selector'
import {CollectionPreview} from '../collection-preview/collection-preview.component'

const CollectionOverview = ({collections}) => (
    <div className='collection-overview'>
        {
            collections.map(({id,...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
    
)

const mapStateToProps = createStructuredSelector({
    collections: selectShopData
})

export default connect(mapStateToProps,null)(CollectionOverview)