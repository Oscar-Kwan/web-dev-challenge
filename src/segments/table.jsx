import React from 'react'
import _ from 'lodash'

import './table.css'

class Table extends React.PureComponent {
    render() {
        let { isAdd, content } = this.props

        return (
            <div className="table-of-content">
                <table>
                    <thead>
                        <tr>
                            <th className="thead-name">Name</th>
                            <th className="thead-lang">Language</th>
                            <th className="thead-tag">Latest Tag</th>
                            <th className="thead-action"></th>
                        </tr>  
                    </thead>
                    <tbody>
                        {_.compact(_.map(content, (v, i) => {
                            return (
                                <tr key={i}>
                                    <td>{_.get(v.node, 'nameWithOwner')}</td>
                                    <td>{_.get(v.node.primaryLanguage, 'name')}</td>
                                    <td>{_.get(_.head(v.node.releases.nodes), 'name') || '-'}</td>
                                    <td style={{ color:'#6200EE', cursor:'pointer' }} onClick={isAdd ? _.partial(this.props.add, v) : _.partial(this.props.remove, i)}>
                                        <u>
                                            {isAdd ? 'Add' : 'Remove'}
                                        </u>
                                    </td>
                                </tr>
                            )
                        }))
                        } 
                    </tbody>
                </table>
            </div>
        )
    }
}

export {
    Table,
    Table as default
}
