import React from 'react'
//import logic from '../logic'


export const storeContext = React.createContext()

export const StoreConsumer = storeContext.Consumer

export const WithStoreConsumer = WrappedComponent => {
  return function(props) {
    return (
      <StoreConsumer>
        {ctx => <WrappedComponent {...props} context={ctx} />}
      </StoreConsumer>
    )
  }
}

export class StoreProvider extends React.Component {


  state = {
    /* messages: [],
    setMessages: value => {
      const _messages = [...this.state.messages, value]
      this.setState({ messages: _messages })
    },
    */
    showMenu: false,
    setShowMenu: value => this.setState({ showMenu: value }),

    pageName: '',
    setPageName: value => this.setState({ pageName: value }),

    userInfo: {
      avatarImgUrl: "",
      email: "",
      username: "",
      username_upper: ""
    },
    setUserInfo: value => this.setState({ userInfo: value })
  }


  render() {
    return (
      <storeContext.Provider value={this.state}>
        {this.props.children}
      </storeContext.Provider>
    )
  }
}