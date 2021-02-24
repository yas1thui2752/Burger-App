// import React, { Component } from 'react';

// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '../Aux';

// const withErrorHandler = ( WrappedComponent, axios ) => {
//     return class extends Component {
//         state = {
//             error: null
//         }

//         componentWillMount () {
//             axios.interceptors.request.use(req => {
//                 this.setState({error: null});
//                 return req;
//             });
//             axios.interceptors.response.use(res => res, error => {
//                 this.setState({error: error});
//             });
//         }

//         errorConfirmedHandler = () => {
//             this.setState({error: null});
//         }

//         render () {
//             return (
//                 <Aux>
//                     <Modal 
//                         show={this.state.error}
//                         modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Aux>
//             );
//         }
//     }
// }

// export default withErrorHandler;



import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error:null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({ error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(req => req, error => {
                this.setState({ error: error});
            });
        }

        //this life cycle hook is used to delete or unmount the component when its not used anymore.
        componentWillUnmount(){
            //ejecting both intercetors for unnecessary memory leaks when there is no use of component
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler= () => {
            this.setState({ error: null });
        }

        render () {
            return(
                <Aux>
                    <Modal show={this.state.error}
                            modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    
    }
}

export default withErrorHandler;