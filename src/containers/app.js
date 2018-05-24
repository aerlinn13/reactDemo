import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData, updateTransaction } from 'actions/app';
import _ from 'lodash';
import styles from './app.css';
import Transaction from '../components/transaction';


type Props = {
}

export class AppContainer extends Component {
  constructor() {
    super();
    this.updateTransaction = this.updateTransaction.bind(this);
  }
  componentDidMount() {
  }

  props: Props;

  updateTransaction(data) {
    this.props.updateTransaction(data);
  }


  filterTransactions(query) {
    const filteredByDescription = _.filter(this.props.backup, element => { return element.description.toLowerCase().includes(query.toLowerCase());
    });
    const filteredByEmotion = _.filter(this.props.backup, element => { return element.emotion.toLowerCase().includes(query.toLowerCase());
    });
    const data = _.uniqBy(filteredByDescription.concat(filteredByEmotion), 'id');
    this.props.updateData(data);
  }

  render() {
    const placeholder = _.sample(['Try "love"', 'Try "hate"', 'Try "joy"', 'Try "sadness"', 'Try "surprise"', 'Try "confusion"']);
    const transactions = this.props.transactions.map((item) => <Transaction update={this.props.updateTransaction} transaction={item} key={item.id} />);

    return (
      <div className={styles.container}>
        <div className={styles.search}>
          <input className={styles.searchTextField} placeholder={placeholder} onChange={(e) => this.filterTransactions(e.target.value)} />
        </div>
        <div className={styles.feed}>{transactions.length == 0 ? <div className={styles.emptyFeed}>Ooops.. Unable to find it.</div> : transactions}</div>
      </div>
    );
  }
}

function mapStateToProperties(state) {
  return {
    transactions: state.app.transactions,
    backup: state.app.backup,
    displayPicker: state.app.displayPicker
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateData: (filtered) => dispatch(updateData(filtered)),
    updateTransaction: (transaction) => dispatch(updateTransaction(transaction))
  };
}

export default connect(mapStateToProperties, mapDispatchToProps)(AppContainer);
