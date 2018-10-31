import React, { Component } from 'react'
import { connect } from 'react-redux'
import compareAsc from 'date-fns/compare_asc'
import Day from './day'
import { FullLoader } from './common'
import { getData } from '../../actions'
import { createLoadingSelector } from '../../selectors'
import styles from './styles.module.css'

class PlanPage extends Component {
  state = {
    data: null,
    isFetching: true,
  }

  componentDidMount() {
    this.props.dispatch(getData())
  }

  render() {
    const { days, slots, isFetching } = this.props
    return (
      <main className={styles['plan-page']}>
        {isFetching === undefined || isFetching === true ? (
          <FullLoader />
        ) : (
          Object.keys(days)
            .sort(compareAsc)
            .map(day => (
              <Day
                key={day}
                day={new Date(day)}
                publications={days[day].publications.sort((a, b) =>
                  compareAsc(a.time, b.time)
                )}
                stats={days[day].stats}
                slots={slots}
              />
            ))
        )}
      </main>
    )
  }
}

const loadingSelector = createLoadingSelector('GET_DATA')

const mapStateToProps = state => {
  return {
    days: state.data.days,
    slots: state.data.slots,
    isFetching: loadingSelector(state),
  }
}

export default connect(mapStateToProps)(PlanPage)
