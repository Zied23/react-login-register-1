import axios from 'axios'
import React, { useEffect, useState } from 'react'





function Subscriber(props) {

    const userTo = props.userTo
    const userFrom = props.userFrom
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)


    const onSubscribe = () => {

        let subscribeVariables = { ObserverId: userTo, TargetId: userFrom }

        if (Subscribed) {
            //when we are already subscribed 
            axios.post('UserFollowing/unSubscribe', subscribeVariables)
                .then(response => {
                    if (response.data) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to unsubscribe')
                    }
                })

        } else {
            // when we are not subscribed yet

            axios.post('UserFollowing/subscribe', subscribeVariables)
                .then(response => {
                    if (response.data) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }



    useEffect(() => {

        const subscribeNumberVariables = { ObserverId: userTo, TargetId: userFrom }
        axios.post('UserFollowing/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response) {
                    //setSubscribeNumber(response.data.subscribeNumber)
                    console.log(response.data.length)
                    setSubscribeNumber(response.data.length)

                } else {
                    alert('Failed to get subscriber Number')
                }

            })
        axios.post('UserFollowing/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data) {
                    console.log(response.data)
                    setSubscribed(response.data)
                } else {
                    // alert('Failed to get Subscribed Information')
                }
            })




    }, [])
    return (
        <div>


            <button
                onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#000000' : '#FFB111'}`,
                    borderRadius: '50px', color: 'white',
                    padding: '10px 30px', fontWeight: '500', textTransform: 'uppercase'
                }}>
                {Subscribed ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>}
                {/* {Subscribed ? '' : ' '} */}
            </button>
            <div>
                <br />  <br />
                <h6><i>{SubscribeNumber} abonnés</i></h6>
                <h6><i>{SubscribeNumber + 4}abonnements</i></h6>
            </div>

        </div>
    )
}

export default Subscriber
