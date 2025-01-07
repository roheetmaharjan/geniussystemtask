"use client";
import { useParams } from "next/navigation";
import { findUserAndSubscription } from '../../../utils/findUserAndSubscription';
import Link from 'next/link';
import { useState,useEffect } from 'react'

const SubscriberDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSubscriber = async () => {
            try {
                const result = findUserAndSubscription(id);
                setUser(result.user);
                setSubscription(result.subscription);
            } catch (error) {
                setError(error);
            }
        };

        loadSubscriber();
    }, [id]);
    if (error) {
        return <div>Error : {error}</div>
    }
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="box__title">
                <h2>Subscriber Detail</h2>
                <div className="box__breadcrumb">
                    <Link href="/subscribers">Subscribers</Link> / <span>{user.first_name} {user.last_name}</span>
                </div>
            </div>
            <div className="box__body">
            <div className="profile__image alpha__image big">
                        {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                    </div>
                <div className="grid two_column">
                    <div className="card">
                        <div className="card__header">
                            <h3 className="card__title">About</h3>
                        </div>
                        <div className="card__body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>ID:</th>
                                        <td>{user.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name:</th>
                                        <td>{user.first_name} {user.middle_name} {user.last_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Username:</th>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Address:</th>
                                        <td>{user.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Country:</th>
                                        <td>{user.country}</td>
                                    </tr>
                                    <tr>
                                        <th>Join Date:</th>
                                        <td>{new Date(parseInt(user.join_date) * 1000).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card__header">
                            <h3 className="card__title">Subscription</h3>
                        </div>
                        <div className="card__body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Package Name:</th>
                                        <td>{subscription ? subscription.package : 'No package'}</td>
                                    </tr>
                                    <tr>
                                        <th>Expiry Date:</th>
                                        <td>{subscription ? subscription.expires_on : 'No expiry date'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriberDetail;