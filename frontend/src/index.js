import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import I18n from "redux-i18n";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "redux/configureStore";
import App from 'components/App';
import { translations } from "translations"
const BoundaryHOC = ProtectedComponent =>
  class Boundary extends Component {
    state = {
      hasError: false
    };
    componentDidCatch = () => {
      this.setState({
        hasError: true
      });
    };
    render() {
      const { hasError } = this.state;
      if (hasError) {
        return <ErrorFallback />;
      } else {
        return <ProtectedComponent />;
      }
    }
  };
const PErrorMaker = BoundaryHOC(App);

const ErrorFallback = () => "Sorry something went wrong";
// console.log(store.getState());

// store.dispatch({type: "Good!!!"});
// console.log(ConnectedRouter);
ReactDOM.render(
	<Provider store={store}>
		<I18n translations={translations} initialLang="en" fallbackLang="en">
			<ConnectedRouter history={history}>
				<PErrorMaker />
	    	</ConnectedRouter>
    	</I18n>
	</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

