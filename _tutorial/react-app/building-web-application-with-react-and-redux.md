---
layout: tutorial
key: tutorial
title: "Building Web Application with React and Redux"
index: 8452
subcategory: react-app
date: 2017-08-20
tags: [React, Redux]
---

> Build web application with React and Redux.

## 1. Game Store Web Application
In the posting [Building Web Application with React]({% link _tutorial/react-app/building-web-application-with-react.md %}), I introduced how to use React to create a web application to manage products. In this tutorial, we will reuse this app and learn how to enhance it with Redux.

## 2. React Project
### 2.1 Source Files
Download the source files from [Game Store(React) on GitHub](https://github.com/jojozhuang/game-store-react), open the project in Visual Studio Code.
```raw
$ git clone https://github.com/jojozhuang/game-store-react.git
$ cd game-store-react
```
### 2.2 Installing Packages
Install new packages `redux`, `redux-thunk` and `react-redux`.
```raw
$ npm install redux -save
$ npm install redux-thunk -save
$ npm install react-redux -save
```
### 2.3 Actions
Create file '`src/acions/actionTypes.js`'. Define the action types.
```javascript
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const FETCH_RESOURCES_FAIL = 'FETCH_RESOURCES_FAIL';
```
Create file '`src/acions/fileActions.js`'.
```javascript
import * as types from './actionTypes';
import fileApi from '../api/FileApi';

export function uploadFileSuccess(response) {
  return {type: types.UPLOAD_FILE_SUCCESS, response};
}

export function fetchResoucesFail(error) {
  return {type: types.FETCH_RESOURCES_FAIL, error};
}

export function uploadFile(file, product) {
  return function (dispatch) {
    return fileApi.uploadFile(file).then(response => {
      dispatch(fetchResoucesFail(null)); // clear error
      dispatch(uploadFileSuccess(Object.assign(response, {product: product})));
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
    });
  };
}
```
The following points need to be noted about the above code.
* Function `uploadFile(file, product)` calls `fileApi` to upload image.
* Use `uploadFileSuccess(response)` to get the response from API service and dispatch to corresponding reducer.
* Use `fetchResoucesFail(error)` to handle error.

Create file '`src/acions/productActions.js`'.
```javascript
import * as types from './actionTypes';
import productApi from '../api/ProductApi';
import history from '../history.js';

export function loadProductsSuccess(products) {
  return {type: types.LOAD_PRODUCTS_SUCCESS, products};
}

export function createProductSuccess(product) {
  return {type: types.CREATE_PRODUCT_SUCCESS, product};
}

export function updateProductSuccess(product) {
  return {type: types.UPDATE_PRODUCT_SUCCESS, product};
}

export function deleteProductSuccess(product) {
  return {type: types.DELETE_PRODUCT_SUCCESS, product};
}

export function fetchResoucesFail(error) {
  return {type: types.FETCH_RESOURCES_FAIL, error};
}

export function loadProducts() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return productApi.getAllProducts().then(products => {
      dispatch(loadProductsSuccess(products));
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {products: []})));
    });
  };
}

export function createProduct(product) {
  return function (dispatch) {
    return productApi.createProduct(product).then(response => {
      dispatch(fetchResoucesFail(null)); // clear error
      dispatch(createProductSuccess(response));
      history.push('/products');
      return response;
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
    });
  };
}

export function updateProduct(product) {
  return function (dispatch) {
    return productApi.updateProduct(product).then(response => {
      dispatch(fetchResoucesFail(null)); // clear error
      dispatch(updateProductSuccess(response));
      history.push('/products');
      return(response);
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
    });
  };
}

export function deleteProduct(product, products) {
  return function(dispatch) {
    return productApi.deleteProduct(product).then(() => {
      dispatch(deleteProductSuccess(product));
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {products: products})));
    });
  };
}
```
The following points need to be noted about the above code.
* Four actions are defined for CRUD operations on products.
* Use `fetchResoucesFail(error)` to handle error.
* Use `history.push('/products');` to navigate to products list page if there is no error when creating or updating product.

### 2.4 Reducers
Create file '`src/reducers/initialState.js`'. Here, we define the data model as initial state.
* `products` is an array, it stores all products.
* `response` is an object, it stores the image info if file is uploaded.
* `error` is an object, it is set to null by default. If error occurs when calling RESTful APIs, we should set error info to it and pass to reducer for further processing.

```javascript
export default {
  products: [],
  response: {},
  error: null
};
```
Create file '`src/reducers/fileReducer.js`'.
```javascript
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fileReducer(state = initialState.response, action) {
  switch(action.type) {
    case types.UPLOAD_FILE_SUCCESS:
      return action.response;
    default:
      return state;
  }
}
```
Create file '`src/reducers/productsReducer.js`'.
```javascript
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function productsReducer(state = initialState.products, action) {
  switch(action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    case types.CREATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ];
    case types.UPDATE_PRODUCT_SUCCESS:
      return [
        ...state.filter(product => product.id !== action.product.id),
        Object.assign({}, action.product)
      ];
    case types.DELETE_PRODUCT_SUCCESS: {
      const newProducts = Object.assign([], state);
      const indexToDelete = state.findIndex(product => {return product.id == action.product.id;});
      newProducts.splice(indexToDelete, 1);
      return newProducts;
    }
    default:
      return state;
  }
}
```
Create file '`src/reducers/errorReducer.js`'.
```javascript
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(state = initialState.error, action) {
  switch(action.type) {
    case types.FETCH_RESOURCES_FAIL: {
      return action.error;
    }
    default:
      return state;
  }
}
```
Create file '`src/reducers/rootReducer.js`'. It defines a combined reducer, including the above three reducers.
```javascript
import {combineReducers} from 'redux';  
import products from './productReducer';
import file from './fileReducer';
import error from './errorReducer';

const rootReducer = combineReducers({  
  products,
  file,
  error
});

export default rootReducer;
```
### 2.5 Store
Create file '`src/store/configureStore.js`'.
```javascript
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}
```
### 2.6 Redux Setup
Update '`src/index.js`'.
```jsx
import React from 'react';  
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history.js';
import App from './components/App';  

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {loadProducts} from './actions/productActions';

const store = configureStore();
store.dispatch(loadProducts());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```
Following changes are made to this component.
* Use `configureStore()` to get store.
* Use `loadProducts()` to get all products once this app is launched.
* Set `store` attribute on `Provider` to setup redux on this app.
* Use `Router` instead of `BrowserRouter` and set `history` attribute.

### 2.7 Components
Update file '`src/components/product/ProductList.js`'.
```jsx
import React from 'react';  
import PropTypes from 'prop-types';
import { Button, ButtonToolbar} from 'react-bootstrap';
import AlertSimple from '../controls/AlertSimple';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';  
import * as productActions from '../../actions/productActions';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      products: this.props.products
    };

    this.deleteRow = this.deleteRow.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({hasError: nextProps.hasError});
    this.setState({error: nextProps.error});
    this.setState({products: nextProps.products});
  }

  deleteRow (event, id) {
    if(window.confirm('Are you sure to delete this product?')){
      let oldProduct = this.state.products.find(product => product.id == id);
      this.props.productActions.deleteProduct(oldProduct, this.state.products);
    }
  }

  handleError(error) {
    this.setState({ hasError: true });
    this.setState({ error: error });
  }

  render() {
    let alert = '';
    if (this.state.hasError) {
      alert = (<AlertSimple error={this.state.error}/>);
    }
    return (
      <div className="container">
        <h2>Products</h2>
        <p>Data from Restful API</p>
        {alert}
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.products
              .sort((a, b) => a.id < b.id)
              .map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td><img src={product.image} className="img-thumbnail" width="80" height="80"/></td>
                  <td>
                    <ButtonToolbar>
                      <Button bsStyle="success" href={'/productpage/' + product.id} >Edit</Button>
                      <Button bsStyle="danger" onClick={(e) => this.deleteRow(e, product.id)}>Delete</Button>
                    </ButtonToolbar>
                  </td>
                </tr>)
              )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

ProductList.propTypes = {
  history: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.object,
  products: PropTypes.array.isRequired,
  productActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let products = state.products;

  // error occurs
  let hasError = state.error !== null;
  if (hasError) {
    products = state.error.products; // empty list, '[]'
  }
  return {
    hasError: hasError,
    error: state.error,
    products: products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
```
Following changes are made to this component.
* Use `connect()` to connect this component to store.
* Use `mapDispatchToProps(dispatch)` to receives the dispatch() method and returns callback props.
* Use `mapStateToProps(state, ownProps)` to get `state` from reducer and create `props` for this component.
* Use `componentWillReceiveProps(nextProps)` to convert `props` to `state`. 'nextProps' comes from 'mapStateToProps'.
* Call `deleteProduct()` from `this.props.productActions` instead of `productApi`.

Update file '`src/components/product/ProductPage.js`'.
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import AlertSimple from '../controls/AlertSimple';
import ProductForm from './ProductForm';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as productActions from '../../actions/productActions';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      product: {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"},
      isnew: false
    };

    this.updateProductState = this.updateProductState.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({hasError: nextProps.hasError});
    this.setState({error: nextProps.error});
    this.setState({product: nextProps.product});
    this.setState({isnew: nextProps.isnew});
  }

  updateProductState(event) {
    const field = event.target.name;
    const product = this.state.product;
    product[field] = event.target.value;
    return this.setState({product: product});
  }

  handleImageChange(image) {
    const product = this.state.product;
    product['image'] = image;
    return this.setState({product: this.state.product});
  }

  handleSave(event) {
    event.preventDefault();
    let product = this.state.product;
    if (this.state.isnew) {
      this.props.productActions.createProduct(product);
    } else {
      this.props.productActions.updateProduct(product);
    }
  }

  handleError(error) {
    this.setState({ hasError: true });
    this.setState({ error: error });
  }

  render() {
    let alert = '';
    if (this.state.hasError) {
      alert = <AlertSimple error={this.state.error}/>;
    }
    let pageTitle = 'Edit Product';
    if (this.state.isnew) {
      pageTitle = 'Create New Product';
    }
    return(
      <div className="container">
        <h2>{pageTitle}</h2>
        {alert}
        <ProductForm
          product={this.state.product}
          isnew={this.state.isnew}
          onChange={this.updateProductState}
          onImageChange={this.handleImageChange}
          onSave={this.handleSave}
          onError={this.handleError}/>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.object,
  product: PropTypes.object.isRequired,
  isnew: PropTypes.bool.isRequired,
  productActions: PropTypes.object.isRequired
};

function getProductById(products, id) {
  let product = products.find(product => product.id == id);
  return Object.assign({}, product);
}

function mapStateToProps(state, ownProps) {
  const pId = ownProps.match.params.id;
  let isnew = pId == null;

  // new product
  let product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};
  if (pId) { //update product
    // find product from list by id
    product = state.products.find(product => product.id == pId);
  }

  // error occurs
  let hasError = state.error !== null;
  let error = state.error;

  if (hasError) {
    product = state.error.product; // preserve the state in case user made change to the product
  } else if (product == null) {
    hasError = true;
    error = new Error("No such product: " + pId);
    product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};
  }

  if (product == null) {
    hasError = false;
    error = null;
    product = {id: '0', productName: '', price: '', image: process.env.API_HOST+"/images/default.png"};
  }

  // refresh if image is uploaded, product info needs to be preserved
  if (state.file.product) {
    product = state.file.product;
  }

  return {
    hasError: hasError,
    error: error,
    product: product,
    isnew: isnew
  };
}

function mapDispatchToProps(dispatch) {
  return {
    productActions: bindActionCreators(productActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);  
```
Following changes are made to this component.
* Use `connect()` to connect this component to store.
* Use `mapDispatchToProps(dispatch)` to receives the dispatch() method and returns callback props.
* Use `mapStateToProps(state, ownProps)` to get `state` from reducer and create `props` for this component.
* Use `componentWillReceiveProps(nextProps)` to convert `props` to `state`. 'nextProps' comes from 'mapStateToProps'.
* Call `createProduct()` and `updateProduct()` from `this.props.productActions` instead of `productApi`.

Update file '`src/components/product/ImageUpload.js`'.
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, ControlLabel, FormControl, Button, Image, Label} from 'react-bootstrap';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as fileActions from '../../actions/fileActions';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      file: null
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.onImageChange(nextProps.image); // can't set parent's props in child component, it's read-only. Instead, have to call the parent's method to update the image.
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    this.setState({filename: file.name});
    this.setState({file: file});
  }

  handleFileUpload(event) {
    this.props.fileActions.uploadFile(this.state.file, this.props.product);
  }

  render() {
    return(
      <div>
        <Image src={this.props.image} thumbnail width="80" height="80" />&nbsp;
        <ControlLabel className="btn btn-success" htmlFor="fileSelector">
          <FormControl id="fileSelector" type="file" style="display: none" onChange={this.handleFileChange}/>Choose Image
        </ControlLabel>&nbsp;
        <Label bsStyle="info">{this.state.filename}</Label>&nbsp;
        <Button bsStyle="primary" type="button" onClick={this.handleFileUpload}>Upload</Button>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  image: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  fileActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let image = ownProps.image;
  if (state.file.message) {
    image = state.file.message;
  }

  return {
    image: image
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fileActions: bindActionCreators(fileActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
```
Following changes are made to this component.
* Use `connect()` to connect this component to store.
* Use `mapDispatchToProps(dispatch)` to receives the dispatch() method and returns callback props.
* Use `mapStateToProps(state, ownProps)` to get `state` from reducer and create `props` for this component.
* Use `componentWillReceiveProps(nextProps)` to convert `props` to `state`. 'nextProps' comes from 'mapStateToProps'.
* Call `uploadFile()` from `this.props.fileActions` instead of `fileApi`.

### 2.8 Navigation in Actions
Though we can define routes in components, we still need to navigate programmatically with javascript for some cases. To achieve this, we need to use history.  
Install the `history` module.
```raw
$ npm install history --save
```
Create file `src/history.js`.
```javascript
import createHistory from 'history/createBrowserHistory';
export default createHistory();
```
In `src/index.js`, add this history to Router component.
```jsx
import history from './history.js';
<Router history={history}>
// Route tags here
</Router>
```
In `src/actions/productActions.js`, import history and use `history.push(path)` method for navigation.
```javascript
import history from '../history.js';

...

export function createProduct(product) {
  return function (dispatch) {
    return productApi.createProduct(product).then(response => {
      dispatch(fetchResoucesFail(null)); // clear error
      dispatch(createProductSuccess(response));
      history.push('/products');
      return response;
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
    });
  };
}

...

```

### 2.9 Handling Error Globally
Define additional function `fetchResoucesFail(error)` in action to handle errors.
```javascript
export function fetchResoucesFail(error) {
  return {type: types.FETCH_RESOURCES_FAIL, error};
}

export function loadProducts() {
  return function(dispatch) {
    return productApi.getAllProducts().then(products => {
      dispatch(loadProductsSuccess(products));
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {products: []})));
    });
  };
}
```
Create additional reducer `errorReducer` to receive error from actions and forward it to components.
```javascript
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(state = initialState.error, action) {
  switch(action.type) {
    case types.FETCH_RESOURCES_FAIL: {
      return action.error;
    }
    default:
      return state;
  }
}
```
In component's `mapStateToProps()` method, check if error exists and set it to props.
```javascript
function mapStateToProps(state, ownProps) {
  let products = state.products;

  // error occurs
  let hasError = state.error !== null;
  if (hasError) {
    products = state.error.products; // empty list, '[]'
  }
  return {
    hasError: hasError,
    error: state.error,
    products: products
  };
}
```
Then, in `componentWillReceiveProps()` method, set error to component's state.
```javascript
componentWillReceiveProps(nextProps) {
  this.setState({hasError: nextProps.hasError});
  this.setState({error: nextProps.error});
  this.setState({products: nextProps.products});
}
```
Finally, display the error in `AlertSimple` component.
```jsx
render() {
    let alert = '';
    if (this.state.hasError) {
      alert = (<AlertSimple error={this.state.error}/>);
    }
    return (
      <div className="container">
        <h2>Products</h2>
        <p>Data from Restful API</p>
        {alert}
        <table className="table">

        ...
        </table>
      </div>
    );
  }
}
```
In some cases, we need to preserve the component state when displaying the error. So, we need to pass the current state to reducer. The below sample code shows we append `product` state to the error object and pass them together to component.
```javascript
dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
```

### 2.10 Final Project Structure
![image](/assets/images/frontend/8452/projectstructure.png){:width="350px"}

## 4. Running and Testing
Start the RESTful service first, and start this React app, serve it in web server.
```raw
$ npm start
```
Open web browser, access 'http://localhost:12090/'.
![image](/assets/images/frontend/8452/homepage.png)
Click the List button. There are three products with images.
![image](/assets/images/frontend/8452/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![image](/assets/images/frontend/8452/productadd.png)
Click 'Save' button, product is saved.
![image](/assets/images/frontend/8452/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/assets/images/frontend/8452/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/assets/images/frontend/8452/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/assets/images/frontend/8452/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/assets/images/frontend/8452/productlistafterdel.png)

## 5. Source Files
* [Source files of Game Store(React+Redux) on Github](https://github.com/jojozhuang/game-store-reactredux)
* [Source files of RESTful API(ASP.NET Core) on Github](https://github.com/jojozhuang/restful-api-aspnet)
* [Source files of RESTful API(Spring Boot) on Github](https://github.com/jojozhuang/restful-api-springboot)

## 6. References
* [Redux-Official Doc](https://redux.js.org/)
* [Redux-Usage with React](https://redux.js.org/docs/basics/UsageWithReact.html)
* [React Router v4 Unofficial Migration Guide](https://codeburst.io/react-router-v4-unofficial-migration-guide-5a370b8905a)
* [React + Redux Tutorial Part III: Async Redux](http://www.thegreatcodeadventure.com/react-redux-tutorial-part-iii-async-redux/)
* [React + Redux - User Registration and Login Tutorial & Example](http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example)
* [Programmatically navigate using react router V4](https://stackoverflow.com/questions/42123261/programmatically-navigate-using-react-router-v4)
