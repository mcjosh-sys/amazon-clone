import './home.css'
import Product from '../../components/product/Product'

const Home = () => {
  return (
    <div className='home'>
        <div className="home__container">
            <img
            id='26839' 
            src="https://amazon-clone-with-stripe-payment.netlify.app/images/banner.jpg" 
            className='home__image'
            alt="" 
            />
        <div className="home__row">
            <Product
            id='98585' 
            title='The Lean Startup: How Constant Innovation Creates Radically Successful Business Papperback' 
            price={29.99} 
            image= "https://m.media-amazon.com/images/I/81vvgZqCskL._AC_UF894,1000_QL80_.jpg"
            rating={5}
            />
            <Product
            id='89239' 
            title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5L Glass Bowl' 
            price={29.99} 
            image= "https://m.media-amazon.com/images/I/71+tbc5GkoL.jpg"
            rating={5}
            />
        </div>
        <div className="home__row">
            <Product
            id='837203' 
            title="Samsung LC49RG90SSUXEN 49' Gaming Monitor"
            price={199.99}
            rating={3}
            image='https://m.media-amazon.com/images/I/81rus0UFhsL._AC_UF1000,1000_QL80_.jpg'
            />
            <Product 
            id='837689' 
            title="Amazon Echo (3rd Generation) | Smart Speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image='https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/55/552/5828/100/3/740778400/740778400_3_720x928.webp'
            />
            <Product 
            id='838743' 
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation"
            price={598.99}
            rating={4}
            image='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-ipad-pro-12-wifi-silver-2020?wid=1150&hei=1150&fmt=jpeg&qlt=95&.v=1626721066000'
            />
        </div>
        <div className="home__row">
        <Product
            id='830903' 
            title="Samsung LC49RG90SSUXEN 49' Gaming Monitor"
            price={1099.79}
            rating={3}
            image='https://m.media-amazon.com/images/I/81rus0UFhsL._AC_UF1000,1000_QL80_.jpg'
            />
        </div>
    </div>
</div>
  )
}

export default Home