import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ALERT_TIMEOUT } from '../../constants/constants'
import { removeAlert } from '../../redux/reducers/alertSlice'

const Alert = () => {
    const alerts = useSelector(state => state.alert.alerts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (alerts.length > 0) {
            const lastAlert = alerts[0]
            setTimeout(() => {
                dispatch(removeAlert({ id: lastAlert.id }))
            }, ALERT_TIMEOUT)
        }
    }, [alerts])

    return (
        alerts.length > 0 ? (
            alerts.map(alert => (
                <section key={alert.id} className='alert-container'>
                    <div className={`alert alert-${alert.alertType}`}>
                        { alert.message }
                    </div>
                </section>
            ))
        ) : (
            <></>
        )
    )
}

export default Alert