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
    changed: false,
    setChanged: value => {
      this.setState({ changed: value })
    }, 

    isLoggedIn: false,
    setIsLoggedIn: value => this.setState({ isLoggedIn: value }),
    */
    showMenu: false,
    setShowMenu: value => this.setState({ showMenu: value }),

    pageName: '',
    setPageName: value => this.setState({ pageName: value }),

    userInfo: {},
    setUserInfo: value => this.setState({ userInfo: value })
  }


  /* componentDidMount() {
    try {                  
        logic.getCurrentUser()
        .then(user => { this.setState({ username: user.username, user: user})})
        .catch(err => this.setState({ error: err.message }))
    } catch (err) {
        this.setState({ error: err.message })
    } 
  } */ 


  render() {
    return (
      <storeContext.Provider value={this.state}>
        {this.props.children}
      </storeContext.Provider>
    )
  }
}