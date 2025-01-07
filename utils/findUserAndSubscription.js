import usersData from '../lib/users.json';
import subscriptionsData from '../lib/subscriptions.json';

export const findUserAndSubscription = (id) => {
    const user = usersData.find(user => user.id === parseInt(id));
    const subscription = subscriptionsData.find(sub => Number(sub.user_id) === user?.id);
    return { user, subscription };
};