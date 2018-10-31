import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'
import Arrow from './arrow'
import styles from './styles.module.css'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.initial || this.props.list[0],
    }
  }

  handleClickOutside(e) {
    this.setState({
      listOpen: false,
    })
  }

  selectItem = title => {
    this.setState(
      {
        headerTitle: title,
        listOpen: false,
      },
      () => this.props.onSelect(title)
    )
  }

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }))
  }

  render() {
    const { list } = this.props
    const { listOpen, headerTitle } = this.state
    return (
      <div className={styles.wrapper}>
        <div className={styles.header} onClick={this.toggleList}>
          <div className={styles.title}>{headerTitle}</div>
          <Arrow />
        </div>
        {listOpen && (
          <ul className={styles.list}>
            {list.map(item => (
              <li
                className={styles.item}
                key={item}
                onClick={() => this.selectItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default onClickOutside(Dropdown)
