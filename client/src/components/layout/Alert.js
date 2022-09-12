import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeAlert } from '../../redux/reducers/alertSlice'

const Alert = () => {
    const alerts = useSelector(state => state.alert.alerts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (alerts.length > 0) {
            const lastAlert = alerts[0]
            setTimeout(() => {
                dispatch(removeAlert({ id: lastAlert.id }))
            }, 5000)
        }
    }, [alerts])

    return (
        alerts.length > 0 ? (
            alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    { alert.message }
                </div>
            ))
        ) : (
            <></>
        )
    )
}

export default Alert