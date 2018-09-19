import React from 'react'
import _ from 'lodash'
import gql from 'graphql-tag'

import { Button } from '@rmwc/button'
import { TextField } from '@rmwc/textfield'
import { Table } from '../segments/table'
import './App.css'

class App extends React.PureComponent {
    state = {
        result: [],
        query: '',
        favorites: []
    }

    _checkQuery = () => {
        if (this.state.query === ' ') {
            this.setState({
                result: []
            })
        }
    }

    _handleSearch = () => {
        this.props.client.query({  
            query: gql`
            {
                search(query: "${this.state.query}", type: REPOSITORY, first: 10) {
                    edges {
                        node {
                            ... on Repository {
                                nameWithOwner
                                url
                                primaryLanguage {
                                    name
                                }
                                releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
                                    nodes {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            } 
            `
        })
            .then(result => this.setState({ result: result.data.search.edges }))
    }

    _handleQuery = () => {
        this.setState(
            {
                query: this.search.value
            },
            () => {
            
                this._handleSearch()
            }
        )
        this._checkQuery()
    }


    _handleAdd = (value) => {
        console.log(value)
        let prevFav = this.state.favorites
        this.setState({
            favorites: _.concat(prevFav, value)
        })

    }

    _handleRemove = (index) => {
        let removedRepo = _.filter(this.state.favorites, (val, i) => {
            return i !== index
        })

        this.setState({
            favorites: removedRepo
        }) 
    }

    render() {
        let { result, favorites } = this.state
        
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className="App-title">My Github Favorites</h1>
                </div>
                <div className="App-main-activity">
                    <div className="Result-left">
                        <div className="Search">
                            <TextField dense outlined className="Search-textfield" ref={input => (this.search = input)}
                            />
                            <Button unelevated onClick={this._handleQuery} className="Search-button">Search</Button>
                        </div>
                        <Table isAdd={true} content={_.compact(result)} add={this._handleAdd}/>
                    </div>
                    <div className="Result-right">
                        <Table isAdd={false} content={_.compact(favorites)} remove={this._handleRemove}/>
                    </div>
                </div>
            </div>
        )
    }
}

export {
    App,
    App as default
}
