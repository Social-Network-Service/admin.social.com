import React from 'react'
import {Carousel} from 'antd'
import './index.scss'

const imgs = [
    '/images/slide1.jpeg',
    '/images/slide2.jpeg',
    '/images/slide3.jpeg',
    '/images/slide4.jpeg',
]

class Home extends React.Component {
    render() {
        return (
            <div style={styles.bg} className='home'>
                <Carousel arrows effect='fade' autoplay adaptiveHeight>
                    {imgs.map(item => {
                        return (
                            <div key={item}>
                                <img src={item} width='100%' height="200px" alt=""/>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        )
    }
}

const styles = {
    bg: {
        width: '100%',
        height: '200px'
    }
}

export default Home