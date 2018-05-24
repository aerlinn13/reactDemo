import React, { Component } from 'react';
import moment from 'moment';
import styles from '../containers/app.css';
import love from '../static/love.png';
import hate from '../static/hate.png';
import confusion from '../static/confusion.png';
import sadness from '../static/sadness.png';
import surprise from '../static/surprise.png';
import joy from '../static/joy.png';
import empty from '../static/empty.png';
import deleted from '../static/delete.png';

type Props = {
  transaction: any
}

export class Transaction extends Component {
  constructor() {
    super();
    this.state = { displayPicker: false, emotion: 'empty' };
  }

  componentWillMount() {
    this.setEmotion(this.props.transaction.emotion, true);
  }

  props: Props;

  handlePicker() {
    this.setState(...this.state, { displayPicker: !this.state.displayPicker });
  }

  setEmotion = (emotion, atInit) => {
    if (!atInit) { this.props.update({ id: this.props.transaction.id, emotion }); }
    let emo;
    switch (emotion) {
      case 'love': emo = love;
      break;
      case 'hate': emo = hate;
      break;
      case 'confusion': emo = confusion;
      break;
      case 'sadness': emo = sadness;
      break;
      case 'surprise': emo = surprise;
      break;
      case 'joy': emo = joy;
      break;
      default: emo = empty;
      break;
    }
    this.setState({ displayPicker: false, emotion: emo });
  }


  render() {
    const date = moment(this.props.transaction.created).format('MMMM Do YYYY, hh:mm');
    const amount = !(this.props.transaction.amount.toString().match(/-/g)) ? `+${this.props.transaction.amount}` : this.props.transaction.amount;
    return (
      <div className={styles.transaction}>
        <img className={styles.transactionEmotion} alt="emotion" src={this.state.emotion} onClick={() => this.handlePicker()}/>
        {this.state.displayPicker ?
          <div className={styles.emotionPicker}>
            <img className={styles.transactionEmotion} alt="empty" src={deleted} onClick={() => this.setEmotion('empty')}/>
            <img className={styles.transactionEmotion} alt="love" src={love} onClick={() => this.setEmotion('love')}/>
            <img className={styles.transactionEmotion} alt="hate" src={hate} onClick={() => this.setEmotion('hate')}/>
            <img className={styles.transactionEmotion} alt="confusion" src={confusion} onClick={() => this.setEmotion('confusion')}/>
            <img className={styles.transactionEmotion} alt="sadness" src={sadness} onClick={() => this.setEmotion('sadness')}/>
            <img className={styles.transactionEmotion} alt="surprise" src={surprise} onClick={() => this.setEmotion('surprise')}/>
            <img className={styles.transactionEmotion} alt="joy" src={joy} onClick={() => this.setEmotion('joy')}/>
          </div>
           : null}
        <div className={styles.transactionTextWrapper}>
          <div className={styles.transactionDescription}>{this.props.transaction.description}</div>
          {(this.props.transaction.note === '') ? null : <div className={styles.transactionNote}>{this.props.transaction.note}</div>}
        </div>
        <div className={styles.transactionCreated}>{date}</div>
        <div className={styles.transactionAmount}>{`${amount}£`}</div>
      </div>
    );
  }
}


export default Transaction;
