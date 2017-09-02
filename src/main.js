import React from 'react'
import Menu from './components/menu';
import Footer from './components/footer';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCart} from '../src/actions/cartActions';

class Main extends React.Component {
    componentDidMount(){
        this.props.getCart();
    }
    render() {
        return(
            <div>
                <Menu cartItemsNumber={this.props.totalQty} />
                    {this.props.children}
                <Footer />
            </div>
        )
    }
}

Main.propTypes = {
  children: PropTypes.element.isRequired
};

const mapStateToProps = state => {
    return {
        totalQty: state.cart.totalQty
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      getCart: getCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);