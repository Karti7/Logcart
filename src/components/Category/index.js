import React from 'react';
import spiritial from '../../assets/spiritial.jpg';
import garden from '../../assets/garden.jpg';
import './styles.scss';

const ProductCateory = props => {
    return (
        <div className="productscategory">
            <div className="wrap">
                <div className="item" style={{
                    backgroundImage: `url(${spiritial})`
                }}>
                        <a>Shop Spiritial Products</a>
                </div>

                <div className="item" style={{

                    backgroundImage: `url(${garden})`
                }}>
                        <a>Shop Garden Products</a>
                </div>
            </div>
        </div>

    )
}

export default ProductCateory;